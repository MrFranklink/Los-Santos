require('dotenv').config();
const express=require('express');
const app=express();
const PORT=5000;
const authRouter=require("./router/auth-router");
const contactRoute=require("./router/contact-route");
const adminRoute=require("./router/admin-router");
const connectDB=require("./utils/db");
const cors=require('cors');
const errorMiddleware = require('./middleware/error-middleware');
const serviceRoute = require('./middleware/service-middleware');

const corsOptions={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);


app.use("/api/admin",adminRoute);
app.use(errorMiddleware);


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Click Here http://localhost:${PORT}`);
    })
})
