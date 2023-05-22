const router = require("express").Router();
let Attendance = require("../models/Attendance");


//add 
router.route("/add").post((req,res) =>{
    const EmpId = req.body.EmpId;
    const date = req.body.date;
    const timein = req.body.timein;
    const timeout = req.body.timeout;
    
    
   

    const newAttendance = new Attendance({

        EmpId,
        date,  
        timein,
        timeout,
        
        
  
    })

    newAttendance.save().then(()=>{
        res.json("Attendance Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//getall
router.route("/view").get(function(req,res) {
    Attendance.find().then((Attendances)=>{
        res.json(Attendances)
     }).catch((err)=>{
        console.log(err);
    })

})


//update 
router.route("/update/:id").put(async (req,res) =>{
    let AttendanceID = req.params.id;
    const{
        EmpId,
        date,  
        timein,
        timeout,
        
        } = req.body;

    const updateAttendance = {
        EmpId,
        date,  
        timein,
        timeout,
        
        
    }
    const update = await Attendance.findByIdAndUpdate(AttendanceID, updateAttendance)
    .then(() =>{
    res.status(200).send({status:"Attendance details updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error updating profile"});
    })
})

//delete
router.route("/delete/:id").delete(async (req,res) =>{
    let AttendanceID = req.params.id;

    await Attendance.findByIdAndDelete(AttendanceID)
    .then(() =>{
        res.status(200).send({status:"Attendance deleted "});
        }).catch((err)=>{
            console.log(err.message);
            res.status(500).send({status:"error deleting from DB"});
        })
})

router.route("/get/:id").get(async (req,res) =>{
    let AttendanceID =  req.params.id;
    await Attendance.findById(AttendanceID)
    .then((attendance) =>{
        res.status(200).send({status:"attendance data fetched",attendance});
    })
})


















module.exports = router;