const express = require("express");
const router = express.Router();

//import protected-routes middlewares
const { protectedUser} = require("../middlewares/route-authorization");


// import controllers
const {
    getUserDetails,
    deleteUser,
    getProfileData,
    getalllicence,
    createlicence,
    updatelicence,
    deletelicence
} = require("../controllers/profile-controller");

// use routes
router.route("/profile").get(protectedUser, getProfileData);

router.route("/getprofile").get(protectedUser,getUserDetails);
router.route("/deleteprofile/:id").delete(protectedUser,deleteUser);


router.route("/getlicence").get(protectedUser,getalllicence);
router.route("/createlicence").post(protectedUser,createlicence);
router.route("/updatelicence/:id").put(protectedUser,updatelicence);
router.route("/deletelicence/:id").delete(protectedUser,deletelicence);


module.exports = router;
