const express=require('express');
const router=express.Router();
const authcontrollers=require("../controller/auth-contoller")
const authSchema=require('../validator/auth-validator');
const validate=require('../middleware/validate-middleware');
const authMiddleware=require('../middleware/auth-middleware')
router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(authSchema.signupSchema),authcontrollers.register);
router.route("/login").post(validate(authSchema.loginSchema),authcontrollers.login);

router.route("/user").get(authMiddleware,authcontrollers.user);



module.exports=router;