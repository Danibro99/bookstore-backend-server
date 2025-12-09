const mongoose = require('mongoose')

//get connection string from .env
const connectionstring = process.env.ATLASDBCONNECTION

mongoose.connect(connectionstring).then(res=>{
    console.log("MONGODB Connection Established");
}).catch(err=>{
    console.log("MONGODB Connectin Failed");
    console.log(err);
})