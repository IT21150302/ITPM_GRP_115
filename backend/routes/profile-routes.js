const express = require("express");
const router = express.Router();

//import protected-routes middlewares
const { protectedUser} = require("../middlewares/route-authorization");


// import controllers
const {
    getUserDetails,
    updateUserDetails,
    deleteUser,
    getProfileData,
    getallpost,
    createpost,
    updatePost,
    deletePost,
    getCuspost
} = require("../controllers/profile-controller");

// use routes
router.route("/profile").get(protectedUser, getProfileData);
router.route("/getprofile").get(protectedUser,getUserDetails);
router.route("/deleteprofile/:id").delete(protectedUser,deleteUser);
router.route("/updateprofile/:id").put(protectedUser,updateUserDetails);

router.route("/getpost").get(protectedUser,getallpost);
router.route("/getcuspost").get(getCuspost);

router.route("/createpost").post(protectedUser,createpost);
router.route("/updatepost/:id").put(protectedUser,updatePost);
router.route("/deletepost/:id").delete(protectedUser,deletePost);


module.exports = router;
