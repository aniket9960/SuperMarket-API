const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true},
    mobile: {type:Number, required: true},
    email: {type:String, required: true},
    storeName: {type:String, required: true},
    gstNum: {type:String},
    address: {type:String, required: true},
    pincode: {type:Number, required: true},
});

module.exports = mongoose.model('Customer',customerSchema);
