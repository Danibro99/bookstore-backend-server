const books = require('../models/bookModel');
const { $where } = require('../models/userMODEL');

//add book
exports.addBookController = async (req,res)=>{
    console.log("inside addBookController");
    //get book details from req.body,upload file from request files, and seller mail from req.payload
    console.log(req.body);
    
    const {title, author, pages, imageURL, price, discountPrice, abstract, language, publisher, isbn, category} = req.body

    const uploadIMG = req.files.map(item=>item.filename)

    const sellerMail = req.payload

    console.log(title, author, pages, imageURL, price, discountPrice, abstract, language, publisher, isbn, category, uploadIMG, sellerMail);
    try{
        //check if book alreday exists
        const existingBook = await books.findOne({title,sellerMail})
        if(existingBook){
            res.status(401).json("Uplpoaded book already exists!!! Request Failed")
        }else{
            const newBook = await books.create({
                title,author,pages,imageURL,price,discountPrice,abstract,language,publisher,isbn,category,uploadIMG,sellerMail
            })
            res.status(200).json(newBook)
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//get home books

exports.getHomePageBooksController = async(req,res)=>{
    console.log("inside getHomePageBooksController");
    try{
        //get newly added 4 books
        const homeBooks = await books.find().sort({_id:-1}).limit(4)
        res.status(200).json(homeBooks)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

//get all books -user

exports.getAllBooksController = async(req,res)=>{
    console.log("inside getAllBooksController");
    //get search query from req 
    const searchKey = req.query.search
    console.log(searchKey);
    
    //get usermail from token
    const loginUserMail = req.payload
    try{
        //get all books except login user books
        const allBooks = await books.find({sellerMail:{$ne:loginUserMail},title:{$regex:searchKey,$options:"i"}})
        res.status(200).json(allBooks)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

//get all user uploaded books

exports.getUserProfilePageBooksController = async(req,res)=>{
    console.log("inside getUserProfilePageBooksController");
    //get usermail from token
    const loginUserMail = req.payload
    try{
        //get all user uploaded books
        const allUserBooks = await books.find({sellerMail:loginUserMail})
        res.status(200).json(allUserBooks)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

//purchase history

exports.getUserPurchaseBooksController = async(req,res)=>{
    console.log("inside getUserPurchaseBooksController");
    //get usermail from token
    const loginUserMail = req.payload
    try{
        //get all user purchased books
        const allUserPurchasedBooks = await books.find({buyerMail:loginUserMail})
        res.status(200).json(allUserPurchasedBooks)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}