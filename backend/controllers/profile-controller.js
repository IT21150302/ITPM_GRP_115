const Usermodel = require("../models/user-model");
const Postmodal = require("../models/post-model");
const { cloudinary } = require("../utils/cloudinary");
const mongoose = require("mongoose");

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

//update User Profile
exports.updateUserDetails = async (req, res) => {
  const {  email,
    fullname,
    phone,
    city,
    address} = req.body;

  if (email) {
    try {
      await Usermodel.findOneAndUpdate(
        { email: req.user.email },
        { email: email },
        { omitUndefined: true }
      );
    } catch (error) {
      res.status(500).json({
        success: false,
        desc:
          "Error in updateUser Details controller-" + error,
      });
    }
  }

  try {
    const updateuser = await Usermodel.findByIdAndUpdate(
      req.user.id,
      {
        fullname,
        phone,
        city,
        address
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).send({
      success: true,
      desc: " updated successfully",
      updateuser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in update User controller-" + error,
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

//Fetch post for customer
exports.getCuspost = async (req, res) => {
  try {
    const allpost = await Postmodal.find();
    res.status(200).send({
      allpost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getUser Details controller-" + error,
    });
  }
};

//Fetch all Post
exports.getallpost = async (req, res) => {
  try {
    emails = req.user.email;
    email = req.body.email;

    const allpost = await Postmodal.find();

    res.status(200).send({
      allpost,
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in all post controller-" + error,
    });
  }
}

//Create new Post
exports.createpost = async (req, res) => {
  const {
    name,
    uploads,
    description,
    email,
    username,
    fileEnc,
  } = req.body;
  try {
    const pimage = await cloudinary.uploader.upload(fileEnc, {
      upload_preset: "ssd_assignment",
    });
    const createpost = await Postmodal.create({
      name,
      uploads,
      description,
      email,
      username,
      posttImage: {
        imagePublicId: pimage.public_id,
        imageSecURL: pimage.secure_url,
      },
    });

    res.status(201).json(createpost);
  }
  catch (error) {
    res.status(409).json({
      success: false,
      desc: "Error in adding Post",
      error: error.message,
    });
  }
};

//edit Post
exports.updatePost = (req, res) => {
  let Id = req.params.id;
  const {
    name,
    uploads,
    description,


  } = req.body;

  const updatedPost = {
    name,
    uploads,
    description,

  }

  Postmodal.findByIdAndUpdate(Id, updatedPost,
    {
      new: true,
      upsert: false,
    })
    .then(() => {
      res.status(200).send({ status: "Succesfully updated " + Id })
    }).catch((error) => {
      res.status(500).send({ status: "error in updating Post", error: error.message })
    })
}

//delete specific Post
exports.deletePost = async (req, res) => {
  let Id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(Id))
    return res.status(404).send(`No product with id: ${Id}`);
  try {
    await Postmodal.findByIdAndDelete(Id);
    res.status(200).json({ status: "Post deleted" });
  } catch (error) {
    res.status(500).json({ status: "Internal server error", error });
  }
};

