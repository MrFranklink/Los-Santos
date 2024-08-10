const User=require("../models/user-model");
const Service=require("../models/service-model");
const Contact=require("../models/contact-model");
const { param } = require("../router/admin-router");
const getAllUsers=async(req,res,next)=>{
    try {
        const user=await User.find({},{password : 0});

        if(!user || user.length===0) return res.status(404).json({message:"No User Found"});

        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }


}

const getAllService=async(req,res,next)=>{
  try {
    const service=await Service.find({});
    if(!service || service.length===0) return res.status(404).json({message:"No Service Found"});
    return res.status(200).json(service);
  } catch (error) {
    next(error);
  }
}

const getAllContacts=async(req,res,next)=>{
    try {
        const contact=await Contact.find();

        if(!contact || contact.length===0) return res.status(404).json({message:"No Contact Found"});

        return res.status(200).json(contact);
    } catch (error) {

        next(error);
        
    }
}

const EditUserById=async(req,res,next)=>{
  try {
    const id=req.params.id;
    const user=await User.findById({_id:id},{password:0});
    return res.status(200).json(user);
  } catch (error) { 
    next(error);
  }
}


const UpdateUserById=async(req,res,next)=>{
  try {
    const id=req.params.id;
    const data=req.body;
    const updated=await User.updateOne({
      _id:id
    },{
      $set:data,
    });

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

const deleteUserById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      await User.deleteOne({ _id: id });
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  


  const deleteContactById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const contact = await Contact.findById(id);
  
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
  
      await Contact.deleteOne({ _id: id });
      return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  const DeleteUserById=async(req,res,next)=>{
    try {
      const id=req.params.id;
      const service=await Service.findById(id);
      if(!service) return res.status(404).json({message:"Service Not Found"});
      await Service.deleteOne({_id:id});
      return res.status(200).json({message:"Service Deleted Successfully"});
    } catch (error) {
      next(error);
    }
  }

  const AddService=async(req,res,next)=>{
    try {
      const {service,description,price,provider,image}=req.body;
      const ServiceExist=await Service.findOne({service});
      if(ServiceExist) res.status(400).json({message:"Service Already Exist"});

      const NewService= await Service.create({service,description,price,provider,image});
     if(NewService)  res.status(201).json({msg:"Service Added SuccessFully"});
     else res.status(400).json({msg:"Error in Services"});
    } catch (error) {
      next(error);
    }
  }

  const UpdateServiceById=async(req,res,next)=>{
    try {
      const id=req.params.id;
      const data=req.body;
      const  updatedServices=await Service.updateOne({
        _id:id
      },{
        $set:data,
      })

      if(updatedServices) return res.status(200).json(updatedServices);
      else return res.status(400).json({message:"Error in Updated Services"});
    } catch (error) {
      next(error);
    }
  }

  const EditServiceById=async(req,res,next)=>{
    try {
      const id=req.params.id;
      const service=await Service.findById({_id:id});
      return res.status(200).json(service);
    } catch (error) { 
      next(error);
    }
  }

module.exports={getAllUsers,getAllContacts,deleteUserById,EditUserById,UpdateUserById,deleteContactById,AddService,getAllService,DeleteUserById,UpdateServiceById,EditServiceById};