const express = require('express');
const router = express.Router({ mergeParams: true });
const viewController = require(`${__dirname}/../controllers/viewController.js`);
const authController = require(`${__dirname}/../controllers/authController.js`);

//add user to res.locals if user logged in
router.use((req, res, next) => {
    //automatically error 404 in the case
    if (req.params.club !== req.user.club)
        return next();
    next()
});


router.get('/', authController.protect, viewController.renderClubDashboard);
router.get('/new', authController.protect, viewController.renderNewTaskForm);
router.get('/:task/new', authController.protect, viewController.renderNewSubtaskForm);
router.get('/:task/edit', authController.protect, viewController.renderEditTaskForm);
router.get('/:task/:subtask/edit', authController.protect, viewController.renderEditSubtaskForm);

module.exports = router;