const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
   posttImage: {
        imagePublicId: {
          type: String,
        
        },
        imageSecURL: {
          type: String,
          
        },
      },
    name:{
        type: String,
    },
    uploads:{
        type: String,
    },
    description:{
        type: String,
    },
    email:{
      type: String,
    },
   username:{
    type: String,
},
})

const Post = mongoose.model("post", postSchema);

module.exports = Post;

