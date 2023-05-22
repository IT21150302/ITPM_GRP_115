const mongoose = require('mongoose');

// Message Schema or Document Structure
const msgSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }
})

// Create Model
const Message = new mongoose.model("MESSAGE", msgSchema);

module.exports = Message;