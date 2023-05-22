const router = require("express").Router();
let EbillModel = require("../models/EbillModel");


//add product
router.route("/").post((req,res) =>{
    //formal method
    const tariff = (req.body.tariff);
    const billingcycle = req.body.billingcycle;
    const unitconsumed = (req.body.unitconsumed);
    const offpeack = req.body.offpeack;
    const dayunit = req.body.dayunit;
    const peack = req.body.peack;
    const maximumdemand = (req.body.maximumdemand);
    const total = req.body.total;
    

    const newProduct = new EbillModel({

        tariff,
        billingcycle,
        unitconsumed,
        offpeack,
        dayunit,
        peack,
        maximumdemand,total
    })

    //validation
    newProduct.save().then(()=>{
        res.json("Ebill-Model Added to DB")
    }).catch((err)=>{
        console.log(err);
    })
})

//view all products
router.route("/").get(function(req,res) {
    EbillModel.find().then((ebil)=>{
        res.json(ebil)
     }).catch((err)=>{
        console.log(err);
    })

})


//delete product from DB
router.route("/:id").delete(async (req,res) =>{
    let productID = req.params.id;

    await EbillModel.findByIdAndDelete(productID)
    //validation
    .then(() =>{
        res.status(200).send({status:"EbillModel deleted from DB"});
        }).catch((err)=>{
            console.log(err.messprice);
            res.status(500).send({status:"error deleting EbillModel from DB"});
        })
})

router.route("/:id/").get(async (req,res) =>{
    let productID = req.params.id;

    await EbillModel.findById(productID)
    //validation
    .then(() =>{
        res.status(200).send({status:"Ebill fetched"});
    })
})


















module.exports = router;