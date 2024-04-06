const express = require('express')
const app = express()
const port = 3000
const temp=require('./index.js')
let books=[];

const bookBaseUrl='/api/v1/books';   //doing this to avoid using api url for every CRUD operation

app.use(express.json());             //allowing to use json objects in our app


app.post(bookBaseUrl,(req,res)=>{
  console.log(req.body);
  const {name,author}=req.body;                   //destructuring req to get variables from it
  if(name==undefined || name.length==0){
    res.status(400).send({error:"Name is empty"}) //--->validations
    return;                                      //returning so that data is not saved
  }
  if(author==undefined || author.length==0){
    res.status(400).send({error:"Author is empty"})
    return;
  }
  const book={name, author};                      //creating book 
  books.push(book)                                //to save response, to add the book from req into the books array
  res.status(201).send(book)                      //send response
  
})

//READ

app.get(bookBaseUrl,(req,res)=>{
  res.status(200).send(books);                   //getting the books array 
})

//UPDATE

app.put((bookBaseUrl+'/:id'), (req,res)=>{
  const id=req.params.id;                         //getting ID from the request, ID here is index of array books
  if(id==undefined || id<0){
    res.status(400).send({error:"Invalid Book ID"})
    return
  }
  const book=books[id];                           //getting the book from books array at that index(ID)
  if(book==undefined){
    res.status(400).send({error:"Invalid book ID"})
    return
  }

  const{name, author}=req.body;       //again destructuring request to get values form request
  if(name==undefined || name.length==0){
    res.status(400).send({error:"Name is empty"})
    return
  }
  if(author==undefined || author.length==0){
    res.status(400).send({error:"Author is empty"})
    return;
  }

  const updatedBook={name,author};  // capturing the values of new book
  books[id]=updatedBook;            //replacing the new book in array of books

  res.status(200).send(updatedBook)// sending the new book 
})


//DELETE

app.delete((bookBaseUrl +'/:id'), (req,res)=>{
  const id=req.params.id;
  if(id==undefined || id<0){
    res.status(400).send({error:"Invalid Book ID"})
    return
  }
  const book=books[id];
  if(book==undefined){
    res.status(400).send({error:"Invalid book ID"})
    return
  }

  books.splice(id,1);                                   //using splice to remove the data in req from books array
  res.status(200).send(book)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)     
})