//register api
exports.registerController = (req,res)=>{
    console.log('Inside Register');
    const {username,email,password} = req.body
    console.log(username,email,password);
    res.status(200).json("Request Recieved")
}