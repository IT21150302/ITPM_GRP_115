const SaleModel = require("../models/sales-model");

const { cloudinary } = require("../utils/cloudinary");

const mongoose = require("mongoose");


//get sale for chart
exports.getallsaleChart = async (req, res) => {

  SaleModel.find().then((bus)=>{
  res.json(bus)
}).catch((err)=>{
  console.log(err);
})
}



//Fetch all sales
exports.getallsales = async (req, res) => {
    try {  
      const allsales = await SaleModel.find();  
        res.status(200).send({
            allsales,
        });      
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in getSale controller-" + error,
      });
    }
  }
  
  //Create new sale
  exports.createsale = async (req, res) => {
    const {
        productname,
        totalvolume,
        datecaught,
        dateexpire,
        weekvolumechange,
        dayvolumechange,
        price
    } = req.body;
    try {
      
      const postSale = await SaleModel.create({
        productname,
        totalvolume,
        datecaught,
        dateexpire,
        weekvolumechange,
        dayvolumechange,
        price
      });
  
      res.status(201).json(postSale);
    }
    catch (error) {
      res.status(409).json({
        success: false,
        desc: "Error in adding Sales",
        error: error.message,
      });
    }
  };
  
  //edit Sales
  exports.updateSales =  (req,res) =>{
    let Id = req.params.id;
    const {
        productname,
        totalvolume,
        datecaught,
        dateexpire,
        weekvolumechange,
        dayvolumechange,
        price
      
    } = req.body;
  
    const updatedsales = {  
        productname,
        totalvolume,
        datecaught,
        dateexpire,
        weekvolumechange,
        dayvolumechange,
        price
     
    }
   
    SaleModel.findByIdAndUpdate(Id,updatedsales,
      {
        new: true,
        upsert: false,
      })
    .then(() => {
      res.status(200).send({status: "Succesfully updated " +Id})
    }).catch((error) => {
      res.status(500).send({status: "error in updating Sales",error: error.message})
    })
   }
  
  //delete specific Product
  exports.deletesales = async (req, res) => {
    let Id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(Id))
      return res.status(404).send(`No product with id: ${Id}`);
  
    try {
      await SaleModel.findByIdAndDelete(Id);
      res.status(200).json({ status: "Product deleted" });
    } catch (error) {
      res.status(500).json({ status: "sales-Internal server error", error });
    }
  };
  
  