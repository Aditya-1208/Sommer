const express = require('express');
const taskController = require(`${__dirname}/../controllers/taskController.js`);
const router = express.Router();

router.route('/').post(taskController.createNewSubtask);
router.route('/:subtask').patch(taskController.editSubtask);

module.exports = router;