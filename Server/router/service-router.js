const express=require('express');
const Service = require('../models/service-model');
const services = require('../middleware/service-middleware');
const router=express.Router();


router.route("/service").get(services);

module.exports=router;