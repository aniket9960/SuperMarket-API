const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    user_id : {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    productName: {type:String, required: true},
    hsn:Number,
    productPrice: {type:Number, required: true},
    rate: {type:Number, required: true},
    discount: {type:mongoose.Schema.Types.Decimal128},
    gst: Number

  });
  
module.exports = mongoose.model('Product', productSchema);