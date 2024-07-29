const mongoose = require("mongoose");

// Define user schema and model
const productSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  hsn:Number,
  dateOfExp: String,
  productPrice: Number,
  rate: Number,
  discount: Number,
  gst: Number
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  buyerName: String,
  mobile: Number,
  address: String,
  products: Array,
  total: Number,
  discount_percent: Number,
  discount_amount: Number,
  total_cgst: Number,
  total_sgst: Number,
  total_gst:Number,
  grand_total: Number
});

const transactionHistory = new mongoose.Schema({
  userId: Number,
  transactionId: String,
  amount: Number,
});

const ProductModel = mongoose.model("product", productSchema);
const InvoiceModel = mongoose.model("invoice", invoiceSchema);
const TransactionHistoryModel = mongoose.model("TransactionHistory", transactionHistory);

module.exports = {
ProductModel,
InvoiceModel,
TransactionHistoryModel
};

