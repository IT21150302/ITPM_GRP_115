const ForecastModal = require("../models/ForecastScema");
const mongoose = require("mongoose");


exports.postforecast = async (req, res) => {
    const {
        date ,
        time ,
        temperature ,
        windspeed ,
        winddirection ,
        location ,
    } = req.body;
    try {
      
      const postforecast = await ForecastModal.create({
        date ,
        time ,
        temperature ,
        windspeed ,
        winddirection ,
        location ,
      });
  
      res.status(201).json(postforecast);
    }
    catch (error) {
      res.status(409).json({
        success: false,
        desc: "Error in post forecast Controler",
        error: error.message,
      });
    }
}

exports.getforecast = async (req, res) => {
    try {  
        const allforecast = await ForecastModal.find();
        
          res.status(200).send({
            allforecast,
          });
        
      } catch (error) {
        res.status(500).json({
          success: false,
          desc: "Error in Getforecast controller-" + error,
        });
      }
}

exports.putforecast = async (req, res) => {
    
    let Id = req.params.id;
    const {
        date ,
        time ,
        temperature ,
        windspeed ,
        winddirection ,
        location ,
      
    } = req.body;
  
    const updatedforecast = {  
        date ,
        time ,
        temperature ,
        windspeed ,
        winddirection ,
        location ,
     
    }
   
    ForecastModal.findByIdAndUpdate(Id,updatedforecast,
      {
        new: true,
        upsert: false,
      })
    .then(() => {
      res.status(200).send({status: "Succesfully updated Forecast " +Id})
    }).catch((error) => {
      res.status(500).send({status: "error in updating Forecast Controler",error: error.message})
    })
}

exports.deleteforecast = async (req, res) => {
    let Id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(Id))
      return res.status(404).send(`No forecast with id: ${Id}`);
  
    try {
      await ForecastModal.findByIdAndDelete(Id);
      res.status(200).json({ status: "forecast deleted" });
    } catch (error) {
      res.status(500).json({ status: "forecast-Internal server error in controller", error });
    }  
}