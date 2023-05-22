const Usermodel =require("../models/userSchema");

// login controller
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    //check user
    let user;
   
      user = await Usermodel.findOne({ email: email }).select("+password");
    
    //check password match
    try {
      const isMatch = await user.matchPasswords(password);
  
      if (!isMatch) {
        res.status(401).send({
          success: false,
          desc: "Invalid credentials - Please check again",
        });
      } else {
        sendToken(user, 200, res);
      }
    } catch (error) {
      next(error);
    }
  };
  
  
  // register new user
  exports.registerUser = async (req, res) => {
    const {  email, password , username, } = req.body;
  //check for users with same email address within customer collection
  let existingEmail = await findUserByEmail(email);
  if (existingEmail) {
    existingEmail = null;
    res.status(401).json({
      success: false,
      desc: "Email already exist - Please check again",
    });
  } else {
      try {   
     
        
        const admin = await Usermodel.create({
          email,
          password,
          username,
         
        });
        const token = await admin.getSignedToken();
        res.status(201).json({ success: true, token });
      } catch (error) {
        res.status(500).json({
          success: false,
          desc: "Error in admin  controller-" + error,
        });
      }
    }
    
  };
  
  //send response object to client if login success
  const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ sucess: true, token, user });
  };
  
  
  //find duplicated user emails when creating new users
  const findUserByEmail = async (email) => {
    let existingAccount;
    try {
      existingAccount = await Usermodel.findOne({ email: email });
      return existingAccount;
    } catch (err) {
      res.status(422).json({
        success: false,
        desc: "Error occured in findUserByEmail segment",
        error: err.message,
      });
    }
  };

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