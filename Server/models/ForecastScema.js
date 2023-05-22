const mongoose = require('mongoose');

// Message Schema or Document Structure
const ForecastScema = new mongoose.Schema({
    date : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    temperature : {
        type : String,
        required : true
    },
    windspeed : {
        type : String,
        required : true
    },
    winddirection : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    }
})

// Create Model
const Forecast = new mongoose.model("Forecast", ForecastScema);

module.exports = Forecast;