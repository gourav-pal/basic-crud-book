const log=(str)=>{
    console.log(str);
}

const validateBookReq=(req,res)=>{
    const {name,author}=req.body;                   //destructuring req to get variables from it
    if(name==undefined || name.length==0){
        throw new Error("name is empty")                                  //returning so that data is not saved
      }
      if(author==undefined || author.length==0){
        throw new Error("Author is empty")
      }
}

const validateBookId=(req,res,books)=>{
  const id = req.params.id; //getting ID from the request, ID here is index of array books
  if (id == undefined || id < 0) {
    throw new Error("Invalid Book ID")
  }
  const book = books[id]; //getting the book from books array at that index(ID)
  if (book == undefined) {
    throw new Error("Invalid Book ID")
  }
}
module.exports={log, validateBookReq, validateBookId};