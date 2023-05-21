const Usermodel = require("../models/user-model");
const Licencemodel = require("../models/licence-model");

const { cloudinary } = require("../utils/cloudinary");

const mongoose = require("mongoose");





/*------------------------------------------------------------------License and permit CRUD operations -----------------------------------------------*/
//Fetch all licence
exports.getalllicence = async (req, res) => {
  try {
    emails= req.user.email;
    email= req.body.email;

    const alllicence = await Licencemodel.find();
    
      res.status(200).send({
        alllicence,
      });
    
    
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getalllicence controller-" + error,
    });
  }
}

//Create new Licence
exports.createlicence = async (req, res) => {
  const {
    email,
    expire,
    agency,
    type,
    licenceno,
    fileEnc,
    username,
  } = req.body;
  try {
    const pimage = await cloudinary.uploader.upload(fileEnc, {
      upload_preset: "ssd_assignment",
    });
    const postLicence = await Licencemodel.create({
      email,
      expire,
      agency,
      type,
      licenceno,
      username,
      posttImage: {
        imagePublicId: pimage.public_id,
        imageSecURL: pimage.secure_url,
      },
    });

    res.status(201).json(postLicence);
  }
  catch (error) {
    res.status(409).json({
      success: false,
      desc: "Error in adding Licence",
      error: error.message,
    });
  }
};

//edit Licence
exports.updatelicence =  (req,res) =>{
  let Id = req.params.id;
  const {
    expire,
    agency,
    type,
    licenceno,
    
  } = req.body;

  const updatedLicencet = {  
    expire,
      agency,
      type,
      licenceno,
   
  }
 
  Licencemodel.findByIdAndUpdate(Id,updatedLicencet,
    {
      new: true,
      upsert: false,
    })
  .then(() => {
    res.status(200).send({status: "Succesfully updated " +Id})
  }).catch((error) => {
    res.status(500).send({status: "error in updating Licence",error: error.message})
  })
 }

//delete specific Licence
exports.deletelicence = async (req, res) => {
  let Id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(Id))
    return res.status(404).send(`No product with id: ${Id}`);

  try {
    await Licencemodel.findByIdAndDelete(Id);
    res.status(200).json({ status: "Licence deleted" });
  } catch (error) {
    res.status(500).json({ status: "Internal server error", error });
  }
};




/*-----------------------------------------------------------other Dashboard functions-------------------------------------------------------------*/
//fetch customer profile data
exports.getProfileData = async (req, res) => {
  try {
    if (!req.user) {
      res.status(422).json({
        success: false,
        desc: "Can not find the user - Please check again",
      });
    } else {
      res.status(200).send({
        profile: req.user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getProfileData controller-" + error,
    });
  }
};


//Fetch User profile details
exports.getUserDetails = async (req, res) => {
  try {
    const userdetails = await Usermodel.find();
    res.status(200).send({
      userdetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getUser Details controller-" + error,
    });
  }
};



//delete user
exports.deleteUser = async (req, res) => {
  let Id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(Id))
    return res.status(404).send(`No User with id: ${Id}`);

  try {
    await Usermodel.findByIdAndDelete(Id);
    res.status(200).json({ status: "User profile deleted" });
  } catch (error) {
    res.status(500).json({ status: "Internal server error", error });
  }
};


