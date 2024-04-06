require("dotenv").config(); //used to access env variables
const express = require("express");
const app = express();
const temp = require("./index.js");
let books = [];
const {log, validateBookReq, validateBookId } = require("./utilities/validations.js");
const bookBaseUrl = "/api/v1/books"; //doing this to avoid using api url for every CRUD operation

app.use(express.json()); //allowing to use json objects in our app

app.post(bookBaseUrl, (req, res) => {
  try{
  log(bookBaseUrl +'-post');
  const { name, author } = req.body; //destructuring req to get variables from it
  validateBookReq(req, res);
  const book = { name, author }; //creating book
  books.push(book); //to save response, to add the book from req into the books array
  res.status(201).send(book); //send response
  }catch (error) {
    res.status(400).send({error:error.message});
    log("Error-"+ bookBaseUrl +"-"+ "post");
  }
  
});

//READ

app.get(bookBaseUrl, (req, res) => {
  res.status(200).send(books); //getting the books array
});

//UPDATE

app.put(bookBaseUrl + "/:id", (req, res) => {
  log(bookBaseUrl+'-put');
  const { name, author } = req.body; //again destructuring request to get values form request
  validateBookId(req,res,books);
  const updatedBook = { name, author }; // capturing the values of new book
  validateBookReq(req,res);
  books[id] = updatedBook; //replacing the new book in array of books
  res.status(200).send(updatedBook); // sending the new book
});

//DELETE

app.delete(bookBaseUrl + "/:id", (req, res) => {
  log(bookBaseUrl +'-Delete')
  const id = req.params.id;
  validateBookId(req,res,books);
  books.splice(id, 1); //using splice to remove the data in req from books array
  res.status(200).send(book);
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Example app listening on port ${process.env.SERVER_PORT}`);
});
