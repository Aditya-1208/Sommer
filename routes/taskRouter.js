const express = require('express');
const taskController = require(`${__dirname}/../controllers/taskController.js`);
const authController = require(`${__dirname}/../controllers/authController.js`);
const subtaskRoutes = require(`${__dirname}/subtaskRouter.js`);
const router = express.Router({ mergeParams: true });

router.use(authController.protect, authController.restrictTo('lead', 'coordinator'));

router.route('/').post(taskController.createNewTask)
router.route('/:task').patch(taskController.editTask).delete(taskController.deleteTask);

router.use('/:task', subtaskRoutes)
module.exports = router;