const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },  
});

//Encrypting the Password Here in Schema using pre method

UserSchema.pre("save",async function(next){
    const user=this;
    if(!user.isModified('password')){
        return next();
    }

   try{ 
    const salt=await bcrypt.genSalt(10);
    const hashpassword=await bcrypt.hash(user.password,salt);
    user.password=hashpassword;
}
catch(error){
    next(error);
}
    
})

//json web token (Used  for Authentication and Authorization)

UserSchema.methods.generateToken= async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
       {
        expiresIn:process.env.JWT_EXPIRY,
       }
    );
    } catch (error) {
        console.log(error);
    }
}

//define model or Collection name
const User=new mongoose.model("User",UserSchema);

module.exports=User;