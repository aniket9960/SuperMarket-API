const { UserModel, InvoiceModel,ProductModel } = require("./model.js");

const dbController = {};

dbController.signup = async (req, res, next) => {
  const {
    userId,
    password,
    refferBy,
    email,
    mobile,
    address,
    town,
    city,
    state,
    pincode,
    country,
  } = req.body;

  // Create a new user instance
  const newUser = new UserModel({
    userId,
    password,
    refferBy,
    email,
    mobile,
    address,
    town,
    city,
    state,
    pincode,
    country,
  });

  // Save the user to the database
  await newUser.save();

  // const idData = await IdModel.findOne({userId});
  // console.log("ID:::",idData._id);
  // const updateBody = {}
  // updateBody.status = true

  var response = {}

  // IdModel.findByIdAndUpdate(idData._id, updateBody).then(data=>{
  //   console.log("RES DATA",data)
  // }).catch(err =>{
  //   console.log(err)
  // })
  response.message = "Success"
  response.code = 200
  response.data = "Quotation created successfully..!!"
  res.json(response)
};



dbController.icreate = async (req, res, next) => {
  const {
    invoiceNumber,
    buyerName,
    mobile,
    address,
    products,
    total,
    discount_percent,
    discount_amount,
    total_cgst,
    total_sgst,
    total_gst,
    grand_total
  } = req.body;

  // Create a new user instance
  const newInvoice = new InvoiceModel({
    invoiceNumber,
    buyerName,
    mobile,
    address,
    products,
    total,
    discount_percent,
    discount_amount,
    total_cgst,
    total_sgst,
    total_gst,
    grand_total
  });

  // Save the user to the database
  await newInvoice.save();

  // const idData = await IdModel.findOne({userId});
  // console.log("ID:::",idData._id);
  // const updateBody = {}
  // updateBody.status = true

  var response = {}

  // IdModel.findByIdAndUpdate(idData._id, updateBody).then(data=>{
  //   console.log("RES DATA",data)
  // }).catch(err =>{
  //   console.log(err)
  // })
  response.message = "Success"
  response.code = 200
  response.data = "Invoice created successfully..!!"
  res.json(response)
};

dbController.product = async (req, res, next) => {
  console.log("BODY:::::",req.body);
  const {
    productId,
    productName,
    hsn,
    dateOfExp,
    productPrice,
    rate,
    discount,
    gst
  } = req.body;

  // Create a new user instance
  const newProduct = new ProductModel({
    productId,
    productName,
    hsn,
    dateOfExp,
    productPrice,
    rate,
    discount,
    gst
  });

  // Save the user to the database
  await newProduct.save();

  // const idData = await IdModel.findOne({userId});
  // console.log("ID:::",idData._id);
  // const updateBody = {}
  // updateBody.status = true

  var response = {}

  // IdModel.findByIdAndUpdate(idData._id, updateBody).then(data=>{
  //   console.log("RES DATA",data)
  // }).catch(err =>{
  //   console.log(err)
  // })
  response.message = "Success"
  response.code = 200
  response.data = "Product created successfully..!!"
  res.json(response)
};

dbController.getProduct = async (req, res, next) => {
  const {
    productId
  } = req.query;
  var response = {}
  console.log("Product ID", req.query);

  ProductModel.find({productId})
  .then(data => {
    response.message = "Success"
    response.code = 200
    response.data = "Product created successfully..!!"
    res.json(data)
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

  

  // IdModel.findByIdAndUpdate(idData._id, updateBody).then(data=>{
  //   console.log("RES DATA",data)
  // }).catch(err =>{
  //   console.log(err)
  // })

};

dbController.getAllProducts = async (req, res, next) => {

  var response = {}


  ProductModel.find({})
  .then(data => {
    response.message = "Success"
    response.code = 200
    response.data = "Product created successfully..!!"
    res.json(data)
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

  

  // IdModel.findByIdAndUpdate(idData._id, updateBody).then(data=>{
  //   console.log("RES DATA",data)
  // }).catch(err =>{
  //   console.log(err)
  // })

};



dbController.getInvoiceByNumber = async (req, res, next) => {
  const {
    invoiceNumber
  } = req.query;
  var response = {}
  console.log("Invoice Number", req.query);

  InvoiceModel.find({invoiceNumber})
  .then(data => {
    response.message = "Success"
    response.code = 200
    response.data = "Product created successfully..!!"
    res.json(data)
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

  

  // IdModel.findByIdAndUpdate(idData._id, updateBody).then(data=>{
  //   console.log("RES DATA",data)
  // }).catch(err =>{
  //   console.log(err)
  // })

};


module.exports = dbController;
