const ProductModel = require("../models/product-model");

const { cloudinary } = require("../utils/cloudinary");

const mongoose = require("mongoose");

//Fetch all product
exports.getallproduct = async (req, res) => {
    try {  
      const allproduct = await ProductModel.find();
      
        res.status(200).send({
          allproduct,
        });
      
      
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in getaProduct controller-" + error,
      });
    }
  }
  
  //Create new Product
  exports.createproduct = async (req, res) => {
    const {
      productname,
      description,
      datecaught,
      dateexpire,
      price,
      fileEnc,
    } = req.body;
    try {
      const pimage = await cloudinary.uploader.upload(fileEnc, {
        upload_preset: "ssd_assignment",
      });
      const postProduct = await ProductModel.create({
        productname,
      description,
      datecaught,
      dateexpire,
      price,
        productImage: {
          imagePublicId: pimage.public_id,
          imageSecURL: pimage.secure_url,
        },
      });
  
      res.status(201).json(postProduct);
    }
    catch (error) {
      res.status(409).json({
        success: false,
        desc: "Error in adding Product",
        error: error.message,
      });
    }
  };
  
  //edit product
  exports.updateProduct =  (req,res) =>{
    let Id = req.params.id;
    const {
      productname,
      description,
      datecaught,
      dateexpire,
      price,
      
    } = req.body;
  
    const updatedproduct = {  
      productname,
      description,
      datecaught,
      dateexpire,
      price,
     
    }
   
    ProductModel.findByIdAndUpdate(Id,updatedproduct,
      {
        new: true,
        upsert: false,
      })
    .then(() => {
      res.status(200).send({status: "Succesfully updated " +Id})
    }).catch((error) => {
      res.status(500).send({status: "error in updating Product",error: error.message})
    })
   }
  
  //delete specific Product
  exports.deleteproduct = async (req, res) => {
    let Id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(Id))
      return res.status(404).send(`No product with id: ${Id}`);
  
    try {
      await ProductModel.findByIdAndDelete(Id);
      res.status(200).json({ status: "Product deleted" });
    } catch (error) {
      res.status(500).json({ status: "Product-Internal server error", error });
    }
  };
  
  