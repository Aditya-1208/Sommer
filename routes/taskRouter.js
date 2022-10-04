const express = require('express');
const taskController = require(`${__dirname}/../controllers/taskController.js`);
const router = express.Router();

router.route('/').post(taskController.createNewTask);
router.route('/:task').post(taskController.createNewSubtask);

module.exports = router;