const router = require("express").Router();
let Employee = require("../models/Employee");


//add employee
http://localhost:8070/employee/add

router.route("/add").post((req,res) =>{
    //formal method
    const EmpId = req.body.EmpId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const NIC = Number(req.body.NIC);
    const dob = req.body.dob;
    const gender = req.body.gender;
    const email = req.body.email; 
    const bankAcc = Number(req.body.bankAcc);
    const dept = req.body.dept;

    const newEmployee = new Employee({

        EmpId,
        firstName,  
        lastName,
        NIC,
        dob,
        gender,
        email,
        bankAcc,
        dept
    })

    //validation
    newEmployee.save().then(()=>{
        res.json("Employee Added to DB")
    }).catch((err)=>{
        console.log(err);
    })
})

//view all employees
http://localhost:8070/employee/view
router.route("/view").get(function(req,res) {
     Employee.find().then((employees)=>{
        res.json(employees)
     }).catch((err)=>{
        console.log(err);
    })

})


//update employee details
http://localhost:8070/employee/update
router.route("/update/:id").put(async (req,res) =>{
    let employeeID = req.params.id;
    //destructure
    const{empID,firstName,lastName,NIC,dob,gender,email,bankAcc,dept} = req.body;

    const updateEmployee = {
        empID,
        firstName,
        lastName,
        NIC,
        dob,
        gender,
        email,
        bankAcc,
        dept
    }
    const update = await Employee.findByIdAndUpdate(employeeID, updateEmployee)
    //validation
    .then(() =>{
    res.status(200).send({status:"Employee details updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error updating profile"});
    })
})

//delete employee from DB
router.route("/delete/:id").delete(async (req,res) =>{
    let EmpId = req.params.id;

    await Employee.findByIdAndDelete(EmpId)
    //validation
    .then(() =>{
        res.status(200).send({status:"Employee deleted from DB"});
        }).catch((err)=>{
            console.log(err.message);
            res.status(500).send({status:"error deleting from DB"});
        })
})

router.route("/get/:id").get(async (req,res) =>{
    let employeeID =  req.params.id;

    await Employee.findById(employeeID)
    //validation
    .then((employee) =>{
        res.status(200).send({status:"Employee fetched",employee});
    })
})


















module.exports = router;