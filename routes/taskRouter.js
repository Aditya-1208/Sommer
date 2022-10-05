const express = require('express');
const taskController = require(`${__dirname}/../controllers/taskController.js`);
const subtaskRoutes = require(`${__dirname}/subtaskRouter.js`);
const router = express.Router();

router.route('/').post(taskController.createNewTask)
router.route('/:task').patch(taskController.editTask).delete(taskController.deleteTask);

router.use('/:task/', subtaskRoutes)
module.exports = router;