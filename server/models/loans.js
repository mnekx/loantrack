const mongoose = require('mongoose');

const Loan = mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    enddate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    startdate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    creatorID: {
        type: String,
        // required: true
    },
    mdhaminiID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    }
});

module.exports = mongoose.model('Loan', Loan)