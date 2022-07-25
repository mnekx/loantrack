const express = require('express');
const Staff = require('../models/staff');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const staffs = await Staff.find();
    console.log(req)
    res.json(staffs);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get('/:staffId', async (req, res) => {
  try {
    const queriedStaff = await Staff.findById(req.params.staffId);
    res.json(queriedStaff);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  const staff = new Staff({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    username: req.body.username,
    role: req.body.role,
  });

  try {
    const createdStaff = await staff.save();
    res.json(createdStaff);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete('/:staffId', async (req, res) => {
  try {
    const deletedStaff = await Staff.remove({ _id: req.params.staffId });
    res.json(deletedStaff);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch('/:staffId', async (req, res) => {
  try {
    const updatedStaff = await  Staff.updateOne(
      { _id: req.params.staffId },
      { $set: req.body }
    );
    res.json(updatedStaff);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
