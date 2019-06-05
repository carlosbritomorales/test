const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  usertype: {type: String, default: "services-off"},
  tempsearch: String,
  birthdate: Date,
  email: String,
  rating: Number,
  password: String,
  services: [{
    name: String,
    price: Number,
  }],
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.isClient = function(){
  return (this.usertype === "services-off");
};

userSchema.methods.isServiceProvider = function(){
  return (this.usertype === "services-on");
};


module.exports = mongoose.model('users', userSchema);
