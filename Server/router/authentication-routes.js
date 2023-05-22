const express = require("express");
const router = express.Router();

//import protected-routes middlewares
const { protectedUser} = require("../middleware/authenticate");



// import controllers
const {
  registerUser,
  login,
  getProfileData,
  getUserDetails,
  deleteUser
} = require("../controller/AuthControler");

// Registration-routes
router.route("/reg").post(registerUser);


// Login-routes
router.route("/login").post(login);


//Get Profile
router.route("/profile").get(protectedUser,getProfileData);
router.route("/profiles").get(getUserDetails);
router.route("/profiles/:id").delete(protectedUser,deleteUser);




module.exports = router;
