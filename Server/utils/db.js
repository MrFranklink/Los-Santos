const mongoose=require('mongoose');

const URI=process.env.Mongoose_URI;

const connectDB= async() =>{
    try {
        await mongoose.connect(URI);
        console.log("Connect To Database")
    }
    catch(error){
        console.log("Database not Connect");
        process.exit(0);
    }
}

module.exports=connectDB;