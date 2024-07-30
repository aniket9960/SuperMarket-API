const controller = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/addCustomer',controller.createCustomer);
router.get('/getAllCustomers',controller.getAllCustomer)
router.patch('/updateCustomer/:id',controller.updateCustomer);
router.delete('/deleteCustomer/:id',controller.deleteCustomer);
module.exports = router;