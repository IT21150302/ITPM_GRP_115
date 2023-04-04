const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const saleSchema = new Schema({

    productname:{
        type: String,
    },
    totalvolume:{
        type: String,
    },
    datecaught:{
        type: String,
    },
    dateexpire:{
        type: String,
    },
    weekvolumechange:{
        type: String,
    },
    dayvolumechange:{
        type: String,
    },
    price:{
      type: String,
  },
 
})

const Sale = mongoose.model("sales", saleSchema);

module.exports = Sale;

