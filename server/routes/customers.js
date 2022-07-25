const express = require('express');
const helpers = require('../helpers/saveUploadedfiles');
const Customer = require('../models/customers');
const Loan = require('../models/loans');
const path = require('path');
const imageDir = path.join(__dirname, '../public/pics');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get('/:customerId', async (req, res) => {
  try {
    const queriedCustomer = await Customer.findById(req.params.customerId);
    res.json(queriedCustomer);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  const uploadedImage = req.files.pic;
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    residence: req.body.residence,
    birthDate: req.body.birthDate,
    // creatorID: req.body.creatorID
  });

  try {
    const arrIdxOfExt = uploadedImage.name.split('').indexOf('.') + 1;
    const imageExt = uploadedImage.name.split('').splice(arrIdxOfExt).join('');
    customer.set('image', customer._id + '.' + imageExt, String);
    const createdCustomer = await customer.save((error, customer) => {
      if (error) res.json({ message: error });
      else {
        const imagePath = imageDir + '/' + customer['_id'] + '.' + imageExt;
        helpers.saveUploadedFiles(
          imagePath,
          uploadedImage,
          (err, savedFilePath) => {
            if (!err && savedFilePath) {
              res.json({
                data: customer,
                message: 'success',
              });
            } else {
              res.json({ message: err, data: null });
            }
          }
        );
      }
    });
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete('/:customerId', async (req, res) => {
  try {
    const deletedCustomer = await Customer.remove({
      _id: req.params.customerId,
    });
    res.json(deletedCustomer);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch('/:customerId', async (req, res) => {
  try {
    const updatedCustomer = await Customer.updateOne(
      { _id: req.params.customerId },
      { $set: req.body }
    );
    res.json(updatedCustomer);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get('/:customerId/loans', async (req, res) => {
  try {
    const customerLoans = await Loan.find({
      customerID: req.params.customerId,
    });
    res.json(customerLoans);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
