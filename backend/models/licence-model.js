const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const licenceSchema = new Schema({
   posttImage: {
        imagePublicId: {
          type: String,
        
        },
        imageSecURL: {
          type: String,
          
        },
      },
    licenceno:{
        type: String,
    },
    type:{
        type: String,
    },
    agency:{
        type: String,
    },
    expire:{
        type: String,
    },
    email:{
      type: String,
    },
   username:{
    type: String,
},
})

const Licence = mongoose.model("licence", licenceSchema);

module.exports = Licence;

