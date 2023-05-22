const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({

    EmpId:{
        type: String,
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    NIC:{
        type: Number,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    bankAcc:{
        type: Number,
        required: true
    },
    dept:{
        type: String,
        required: true
    },
})

const Employee = mongoose.model("Employees", employeeSchema);

module.exports = Employee;


