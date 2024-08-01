const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('./Model');

function createCustomId(storeData) {
    const currentTimeMillis = Date.now();
    return crypto.createHash('sha256').update(storeData.name + storeData.email + storeData.storeName + currentTimeMillis).digest('hex');
}

exports.createUser = (req, res, next) => {
    const body = req.body;
    const customId = createCustomId({name:body.name, email: body.email, storeName: body.storeName});
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail Exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            id: customId,
                            name: body.name ,
                            mobile: body.mobile,
                            email: body.email,
                            password: hash,
                            storeName: body.storeName,
                            gstNum: body.gstNum,
                            address: body.address,
                            pincode: body.pincode,
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User Created'
                                });
                            })
                            .catch(error => {
                                console.log(err);
                                res.status(500).json({
                                    error
                                });
                            });
                    }
                });
            }
        });
}


exports.user_login = (req,res,next)=>{
    User.find({email: req.body.email})
        .exec()
        .then(user =>{
            if(user.length<1)
            {
                return res.status(401).json({
                    message: 'No User Found'
                });
            }
            bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message: 'Pass Failed'
                    });
                }
                if(result){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0].id
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "15h"
                        });
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token : token
                    });
                }
                res.status(401).json({
                    message: 'Auth Failed'
                });
            });
        })
        .catch(err=> {
            res.status(500).json({
                error: err
            });
    });
};