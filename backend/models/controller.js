const { response } = require('express');
var userdb =require ('../model/model');
//create and save new dd
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"})
        return;
    }
    // new
    const user = new userdb({
        DispatchId:req.body.DispatchId,
        DriverName:req.body.DriverName,
        VehicleId:req.body.VehicleId,
        date:Date(req.body.date),
        Route: req.body.Route,
        Cost:Number(req.body.Cost),
        Status:req.body.Status

    })
    user
    .save(user)
    .then(data=>{
        //res.send(data)
        res.redirect('/add-staff-dispatch-details');
        
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occured while creating a create operation"
        });
    });
}

//retrive and return
exports.find = (req, res)=>{

    if(req.query.DispatchId){
        const DispatchId = req.query.DispatchId;

        userdb.findById(DispatchId)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found Dispatch Details with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving Dispatch Details with id " + id})
            })

    }else{
        userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving Dispatch Details information" })
            })
    }

    
}

//Update a new identified user by dispatch id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const DispatchId = req.params.DispatchId;
    userdb.findByIdAndUpdate(DispatchId, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update Dispatch Details with ${DispatchId}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update Dispatch Details information"})
        })
}
//Delete user 
exports.delete = (req,res)=>{
    const DispatchId = req.params.DispatchId;

    userdb.findByIdAndDelete(DispatchId)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${DispatchId}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Dispatch Details was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Dispatch with id=" + DispatchId
            });
        });
}