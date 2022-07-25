const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const fileupload = require('express-fileupload');
const cors = require('cors');
const staffRoute = require('./routes/staff');
const customerRoute = require('./routes/customers');
const repaymentsRoute = require('./routes/repayments');
const loansRoutes = require('./routes/loans');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  fileupload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(express.static('public'));
app.use('/images', express.static('pics'))
app.use(bodyParser.json())

app.use('/api/staff', staffRoute);
app.use('/api/customers', customerRoute);
app.use('/api/repayments', repaymentsRoute);
app.use('/api/loans', loansRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

mongoose.connect(process.env.DB_CONN, () => console.log('connected to DB!'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
