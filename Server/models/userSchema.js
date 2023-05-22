const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Schema or Document Structure
const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

//by using "pre save" we run this code segment before mongoose save data on db
UserSchema.pre("save", async function (next) {
    //check whether the password has already been hashed or not by using isModified
    if (!this.isModified("password")) {
      next();
    }
  
    //hash password before passing it to db save query through the model
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); //this.password reffers to password that contains within request object
  
    next();
  });
  
  //to compare hashed passwords in login scenarios
  UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password); //password refers to user providing one and this.password refers to one that get from db
  };
  
  UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  const User = mongoose.model("USER", UserSchema);
  
  module.exports = User;