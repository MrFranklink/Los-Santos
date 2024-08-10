const {z} =require('zod');


const signupSchema=z.object
({
    username:z.string({required_error:"Name is Required"}).trim().min(3,{message:"Name must be at least of 3 chars"}).max(255,{message:"Name must be not more than 255 chars"}),
    email:z.string({required_error:"Email is Required"}).trim().min(3,{message:"email must be at least of 3 chars"}).max(255,{message:"Name must be not more than 255 chars"}),
    phone:z.string({required_error:"phone is Required"}).trim().min(3,{message:"phone must be at least of 3 chars"}).max(20,{message:"phone must be not more than 20 chars"}),
    password:z.string({required_error:"password is Required"}).trim().min(3,{message:"password must be at least of 3 chars"}).max(1024,{message:"password must be not more than 1024 chars"}),
});

const loginSchema=z.object({
    email:z.string({required_error:"Email is Required"}).trim().min(3,{message:"email must be at least of 3 char"}).max(255,{message:"email not be more then 255 char"}),
    password:z.string({required_error:"password is Required"}).trim().min(3,{message:"password must be at least of 3 chars"}).max(1024,{message:"password must be not more than 1024 chars"}),
})

module.exports={signupSchema,loginSchema};