const User=require('../models/user-model')
const bcrypt=require('bcryptjs')
//Home Logic

const home = async(req,res)=>{
    try {
        res.status(200).send("Hello World"); 
    } catch (error) {
        res.status(400).send({msg:"What the hell"});
    } 
}

//Register Logic


const register=async (req,res)=>{
    try {
        const {username,email,phone,password}=req.body;
         
        const UserExist=await User.findOne({email});

        if(UserExist){
            res.status(400).json({message:"Already Exist"});
        }

        const NewUser=await User.create({username,email,phone,password});
        res.status(201).json({msg:"Register Successfully", token: await NewUser.generateToken(),
        userId:NewUser._id.toString(),
    });
    } catch (error) {
        res.status(400).json("Internal Server Error");
    }
}

//logic logic

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const UserExist=await User.findOne({email});
        if(!UserExist){
            return res.status(400).json({message:"Invalid Credential"});
        }

        const user =await bcrypt.compare(password,UserExist.password);
        if(user)
            {
                res.status(201).json({msg:"Login Successfully", token: await UserExist.generateToken(),
                    userId:UserExist._id.toString(),
                });
            }else
            {
                res.status(401).json({message:"Invalid Crednial"});
            }
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}

//user logic

const user=async(req,res)=>{
    try {
        const userData=req.user;
        console.log(userData);
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`Error from user Route ${error}`);
    }
}
module.exports={home,register,login,user};

