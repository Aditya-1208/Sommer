const express = require('express');
const router = express.Router();
const viewController = require(`${__dirname}/../controllers/viewController.js`);
const authController = require(`${__dirname}/../controllers/authController.js`);

//add user to res.locals if user logged in
router.use(authController.isLoggedIn);

router.get('/', viewController.renderHome);
router.get('/login', viewController.renderLogin);
router.get('/signup', viewController.renderSignup);
router.use(authController.protect);
router.get('/dashboard', viewController.renderDashboard);

module.exports = router;