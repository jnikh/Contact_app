const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const { use } = require("../routes/contactRoute");
//@desc Register a user 
//@route POST /api/users/register
//@access public


const registerUser = asyncHandler(async (request, response) =>{
    const {username ,email , password} = request.body;
    if(!username || !email || !password){
        response.status(400)
        throw new Error("ALl field are mandtory");
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        response.status(400);
        throw new Error("User already registered");
    }
    //Hash Password
    const hashedPassword  = await bcrypt.hash(password, 10)
    console.log("Your hasshed password is ",hashedPassword)
    const data ={username , email , password:hashedPassword}
    const user = await User.create(data)
    console.log(`user created ${user}`)
    if(user){
        response.status(201).json({_id: user.id, email:user.email})
    }else{
        response.status(400);
        throw new Error("user data us not valid")
    }
    response.json({message:"Resgister The user"});
})
//@desc login a user 
//@route POST /api/users/login
//@access public

const loginuser = asyncHandler(async (request,response) =>{
    const {email , password} = request.body;
    if(!email || !password) {
        response.status(401);
        throw new Error("All field are mandatory")
    }
    const user = await User.findOne({email});
    //compare password
     if(user &&(await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
          user:{  username: user.username,
            email: user.email,
            id:user.id
          }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
        response.status(200).json({accessToken})
        
     }else{
        response.status(401)
        throw new Error("Email or password is not valid");
     }
    response.json({message:"Login the user"})
})

//@desc current a user 
//@route get /api/users/current
//@access private

const currentUser = asyncHandler(async (request,response) =>{

    response.json(request.user)
})

module.exports ={
    registerUser,
    loginuser,
    currentUser,
}