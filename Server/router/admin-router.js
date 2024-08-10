const express=require('express');
const adminController=require("../controller/admin-controller");
const authMiddleware=require("../middleware/auth-middleware");
const adminMiddleware = require('../middleware/admin-middleware');
const router=express.Router();

const{getAllUsers,getAllContacts,deleteUserById,EditUserById,UpdateUserById,deleteContactById,AddService,getAllService,DeleteUserById,UpdateServiceById,EditServiceById}=adminController;

router.route("/users").get(authMiddleware,adminMiddleware,getAllUsers);
router.route("/users/:id").get(authMiddleware,adminMiddleware,EditUserById);
router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,UpdateUserById);
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,deleteUserById);
router.route("/contacts").get(authMiddleware,adminMiddleware,getAllContacts);
router.route("/services").get(authMiddleware,adminMiddleware,getAllService);
router.route("/services/:id").get(authMiddleware,adminMiddleware,EditServiceById);
router.route("/services/update/:id").patch(authMiddleware,adminMiddleware,UpdateServiceById);
router.route("/service/add").post(authMiddleware,adminMiddleware,AddService);
router.route("/services/delete/:id").delete(authMiddleware,adminMiddleware,DeleteUserById);
router.route("/contacts/delete/:id").delete(authMiddleware,adminMiddleware,deleteContactById);

module.exports=router;