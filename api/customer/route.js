const controller = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/addCustomer/:user_id',controller.createCustomer);
router.get('/getAllCustomers/:user_id',controller.getAllCustomer)
router.patch('/updateCustomer/:id',controller.updateCustomer);
router.delete('/deleteCustomer/:id',controller.deleteCustomer);
module.exports = router;