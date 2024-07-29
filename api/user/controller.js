const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./Model');

exports.createUser = (req, res, next) => {
    const body = req.body;
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
                            id: new mongoose.Types.ObjectId(),
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
                    Message: 'Auth Failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        Message: 'Auth Failed'
                    });
                }
                if(result){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        });
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token : token
                    });
                }
                res.status(401).json({
                    Message: 'Auth Failed'
                });
            });
        })
        .catch(err=> {
            res.status(500).json({
                error: err
            });
    });
};