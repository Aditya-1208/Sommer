const express = require('express');
const router = express.Router();
const viewController = require(`${__dirname}/../controllers/viewController.js`);
const authController = require(`${__dirname}/../controllers/authController.js`);
const clubViewRoutes = require(`${__dirname}/clubViewRouter.js`)
//add user to res.locals if user logged in
router.use(authController.isLoggedIn, (req, res, next) => {
    res.locals.baseUrl = `${req.protocol}://${req.header('host')}/`;
    next();
});

router.get('/', viewController.renderHome);
router.get('/login', viewController.renderLogin);
router.get('/signup', viewController.renderSignup);
router.get('/dashboard', authController.protect, viewController.renderDashboard);
router.use('/dashboard/:club', clubViewRoutes);

module.exports = router;