// importing dotenv
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router = require('./routes/routing')
require('./config/db')

const bookStoreServer=express()

bookStoreServer.use(cors())

bookStoreServer.use(express.json())

//use router in server
bookStoreServer.use(router)

const port=3000

bookStoreServer.listen(port,()=>{
  console.log("Bookstore server started and waiting for client request");
    
})

bookStoreServer.post('/',(req,res)=>{
  res.status(200).send(`<h1>Bookstore server started and waiting for client request</h1>`)
})