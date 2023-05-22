const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({

    EmpId:{
        type: String,
    },
    date:{
        type: String,
        required: true
    },
    timein:{
        type: String,
        required: true
    },
    timeout:{
        type: Number,
        required: true
    },
    
    
  
})

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;


