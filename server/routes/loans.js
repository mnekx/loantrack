const express = require('express');
const Loan = require('../models/loans');
const Repayment = require('../models/repayments')

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('loans');
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get('/:loanId', async (req, res) => {
  try {
    const queriedLoan = await Loan.findById(req.params.loanId);
    res.json(queriedLoan);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  const loan = new Loan({
    amount: req.body.amount,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    creatorID: req.body.creatorID,
    mdhaminiID: req.body.mdhaminiID,
    customerID: req.body.customerID,
  });

  try {
    const createdLoan = await loan.save();
    res.json(createdLoan);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete('/:loanId', async (req, res) => {
  try {
    const deletedLoan = await Loan.remove({ _id: req.params.loanId });
    res.json(deletedLoan);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch('/:loanId', async (req, res) => {
  try {
    const updatedLoan = await Loan.updateOne(
      { _id: req.params.loanId },
      { $set: req.body }
    );
    res.json(updatedLoan);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get('/:loanId/repayments', async (req, res) => {
  try {
    const loanRepayments = await Repayment.find({
      loanID: req.params.loanId,
    });
    res.json(loanRepayments)
  } catch (error) {
    res.json({ message: error, data: null });
  }
});

module.exports = router;
