const express = require("express");
const router = express.Router();

//import protected-routes middlewares
const { protectedUser} = require("../middleware/authenticate");


// import controllers
const {
    postforecast,
    getforecast,
    putforecast,
    deleteforecast
  } = require("../controller/ForeacastController");
  
  // Registration-routes
  router.route("/forecast").post(protectedUser,postforecast);
  router.route("/forecast").get(protectedUser,getforecast);
  router.route("/forecast/:id").put(protectedUser,putforecast);
  router.route("/forecast/:id").delete(protectedUser,deleteforecast);

  module.exports = router;
