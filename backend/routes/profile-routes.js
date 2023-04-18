const express = require("express");
const router = express.Router();

// Import protected-routes middlewares
const { protectedUser } = require("../middlewares/route-authorization");

// Import controllers
const {
  getUserDetails,
  updateUserDetails,
  deleteUser,
  getProfileData,
  getallpost,
  createpost,
  updatePost,
  deletePost,
  getCuspost,
} = require("../controllers/profile-controller");

// Profile routes
router.route("/profile").get(protectedUser, getProfileData); // Get profile data
router.route("/getprofile").get(protectedUser, getUserDetails); // Get user details
router.route("/deleteprofile/:id").delete(protectedUser, deleteUser); // Delete user
router.route("/updateprofile/:id").put(protectedUser, updateUserDetails); // Update user details

// Post routes
router.route("/getpost").get(protectedUser, getallpost); // Get all posts
router.route("/getcuspost").get(getCuspost); // Get custom posts

router.route("/createpost").post(protectedUser, createpost); // Create a post
router.route("/updatepost/:id").put(protectedUser, updatePost); // Update a post
router.route("/deletepost/:id").delete(protectedUser, deletePost); // Delete a post

module.exports = router;
