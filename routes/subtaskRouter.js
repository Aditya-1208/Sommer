const express = require('express');
const taskController = require(`${__dirname}/../controllers/taskController.js`);
const authController = require(`${__dirname}/../controllers/authController.js`);
const router = express.Router();

router.use(authController.protect, authController.restrictTo('lead', 'coordinator'));
router.route('/').post(taskController.createNewSubtask);
router.route('/:subtask').patch(taskController.editSubtask).delete(taskController.deleteSubtask);

module.exports = router;