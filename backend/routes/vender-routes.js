const express = require("express");
const router = express.Router();

const {
    getallproduct,
    createproduct,
    updateProduct,
    deleteproduct,
   
  
} = require("../controllers/product-controller");

const {
getallsales,
getallsaleChart,
createsale,
updateSales,
deletesales
} = require("../controllers/sales-controller");

router.route("/getproduct").get(getallproduct);
router.route("/createproduct").post(createproduct);
router.route("/updateproduct/:id").put(updateProduct);
router.route("/deleteproduct/:id").delete(deleteproduct);

router.route("/getchart").get(getallsaleChart);
router.route("/getsale").get(getallsales);
router.route("/createsale").post(createsale);
router.route("/updatesale/:id").put(updateSales);
router.route("/deletesale/:id").delete(deletesales);

module.exports = router;
