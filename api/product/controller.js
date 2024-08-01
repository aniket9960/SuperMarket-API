const Product = require('./model');
const crypto = require('crypto');

function createCustomId(Data) {
    const currentTimeMillis = Date.now();
    return crypto.createHash('sha256').update(Data.name + Data.rate + Data.user_id + currentTimeMillis).digest('hex');
}

exports.addProduct = (req, res, next) => {
    const body = req.body;
    const customId = createCustomId({ name: body.productName, rate: body.rate, user_id: req.params.id });
    const product = new Product({
        productId: customId,
        user_id: req.params.id,
        productName: body.productName,
        hsn: body.hsn,
        rate: body.rate,
        discount: body.discount,
        gst: body.gst
    });
    console.log(product);
    product.save()
        .then((result) => {
            res.status(201).json({
                message : "Product Added"
            });
        }).catch((err) => {
            res.status(500).json({
                error : err
            });
        });
};

exports.getAllProducts = (req,res,next) =>{
    Product.find({user_id : req.params.id})
        .exec()
        .then((docs) => {
            const response = {
                count : docs.length,
                products : docs.map(doc => {
                  return {
                    productId : doc.productId,
                    productName : doc.productName,
                    hsn : doc.hsn,
                    rate : doc.rate,
                    discount : doc.discount,
                    gst : doc.gst
                  }
                })
            }
            res.status(200).json({response});
        }).catch((err) => {
            res.status(500).json({
                error : err
            });
        });
}