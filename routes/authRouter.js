const express = require('express');
const authController = require(`${__dirname}/../controllers/authController.js`);
const router = express.Router();

router.post('/signup', authController.signup);

module.exports = router;