const express = require('express');
const Repayment = require('../models/repayments');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const repayments = await Repayment.find();
    res.json(repayments);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get('/:repaymentId', async (req, res) => {
  try {
    const queriedRepayment = await Repayment.findById(req.params.repaymentId);
    res.json(queriedRepayment);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  const repayment = new Repayment({
    amount: req.body.amount,
    date: req.body.startdate,
    creatorID: req.body.creatorID,
    loanID: req.body.loanID,
    customerID: req.body.customerID
  });

  try {
    const createdRepayment = await repayment.save();
    res.json(createdRepayment);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete('/:repaymentId', async (req, res) => {
  try {
    const deletedRepayment = await Repayment.remove({ _id: req.params.repaymentId });
    res.json(deletedRepayment);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch('/:repaymentId', async (req, res) => {
  try {
    const updatedRepayment = await  Repayment.updateOne(
      { _id: req.params.repaymentId },
      { $set: req.body }
    );
    res.json(updatedRepayment);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
