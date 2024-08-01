const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.post('/addProduct/:id',controller.addProduct);
router.get('/getAllProducts/:id',controller.getAllProducts);


module.exports = router;