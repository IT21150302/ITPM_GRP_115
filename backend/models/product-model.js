const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
   productImage: {
        imagePublicId: {
          type: String,
        
        },
        imageSecURL: {
          type: String,
          
        },
      },
    productname:{
        type: String,
    },
    description:{
        type: String,
    },
    datecaught:{
        type: String,
    },
    dateexpire:{
        type: String,
    },
    price:{
      type: String,
  },
 
})

const Product = mongoose.model("product", productSchema);

module.exports = Product;

