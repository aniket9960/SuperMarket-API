const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {type:String, required: true},
    name: {type:String, required: true},
    mobile: {type:Number, required: true},
    email: {type:String, unique: true, required: true},
    password: {type:String, required: true},
    storeName: {type:String, required: true},
    GSTnum: {type:String},
    address: {type:String, required: true},
    pincode: {type:Number, required: true},
});

module.exports = mongoose.model('User',userSchema);
