const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffdispatch = new Schema({
    DispatchId : {
        type: String,
        
    },
    DriverName: {
        type: String,
        
    },
    VehicleId:{
        type: String,
        
    },
    date: {
        type: Date,
        
    },
    Route:{
        type: String,
        
    },
    Cost:{
        type: String,
        
    },
    Status:{
        type: String

    }

})

const userdb = mongoose.model('userdb', staffdispatch);

module.exports = userdb;