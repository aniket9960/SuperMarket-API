const mongoose = require('mongoose');
const Customer = require('./Model');

const crypto = require('crypto');

function createCustomId(Data) {
    const currentTimeMillis = Date.now();
    return crypto.createHash('sha256').update(Data.name + Data.email + Data.storeName + currentTimeMillis).digest('hex');
}


exports.createCustomer = (req, res, next) => {
    const body = req.body;
    const customId = createCustomId({name:body.name, email: body.email, storeName: body.storeName});
    const customer = new Customer({
        id: customId,
        user_id : req.params.user_id,
        name: body.name,
        mobile: body.mobile,
        email: body.email,
        storeName: body.storeName,
        gstNum: body.gstNum,
        address: body.address,
        pincode: body.pincode
    });
    customer.save()
        .then((result) => {
            res.status(201).json({
                message: "Customer Added"
            });
        }).catch((err) => {
            res.status(500).json({
                err
            });
        });
};

exports.getAllCustomer = (req, res, next) => {
    Customer.find({user_id: req.params.user_id})
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                customers: docs.map(doc => {
                    return {
                        id: doc.id,
                        user_id: doc.user_id,
                        name: doc.name,
                        mobile: doc.mobile,
                        email: doc.email,
                        storeName: doc.storeName,
                        gstNum: doc.gstNum,
                        address: doc.address,
                        pincode: doc.pincode
                    }
                })
            };
            res.status(200).json({ response });
        }).catch((err) => {
            res.status(500).json({ err });
        });
};

exports.updateCustomer = (req, res, next) => {
    id = req.params.id;
    body = req.body;
    console.log(body);
    Customer.updateOne(
        { id: id },
        { $set: body }
    )
        .exec()
        .then((result) => {
            res.status(200).json(
                {
                    message: "Customer Updated",
                }
            );
        }).catch((err) => {
            res.status(500).json({ err });
        });
};

exports.deleteCustomer = (req,res,next)=>{
    id = req.params.id;
    Customer.deleteOne({id:id})
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "Customer Deleted"
            });
        }).catch((err) => {
            res.status(500).json({err});
        });
};