const express = require('express');
const taskController = require(`${__dirname}/../controllers/taskController.js`);
const authController = require(`${__dirname}/../controllers/authController.js`);
const subtaskRoutes = require(`${__dirname}/subtaskRouter.js`);
const router = express.Router({ mergeParams: true });

router.use(authController.protect, express.urlencoded({ extended: true }));

router.route('/').post(authController.restrictTo('lead', 'coordinator'), taskController.createNewTask)
router.route('/:task').patch(authController.restrictTo('lead', 'coordinator'), taskController.editTask).delete(authController.restrictTo('lead', 'coordinator'), taskController.deleteTask);

router.use('/:task', subtaskRoutes)
module.exports = router;