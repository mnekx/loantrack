const mongoose = require('mongoose');

const Repayments = mongoose.Schema({
  creatorID: {
    type: String,
    // required: true,
  },
  loanID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan',
    required: true,
  },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Repayment', Repayments);
