const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: {type : String , required : true},
    user_id : {type:String, ref:"User", required:true},
    productName: {type:String, required: true},
    hsn:{type:Number},
    rate: {type:Number, required: true},
    discount: {type:Number},
    gst : {type:Number}
  });
  
module.exports = mongoose.model('Product', productSchema);
/* 
quantity = ???? (product Stock)

 */