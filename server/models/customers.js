const mongoose = require('mongoose');

const Customer = mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    residence: {
      type: String,
      required: true,
    },
    creatorID: {
      type: String,
      // required: true
    },
  },
  { strict: false }
);

module.exports = mongoose.model('Customer', Customer);
