const express = require('express');
const taskController = require(`${__dirname}/../controllers/taskController.js`);
const fileController = require(`${__dirname}/../controllers/fileController.js`);
const authController = require(`${__dirname}/../controllers/authController.js`);
const router = express.Router({ mergeParams: true });

router.use(authController.protect)
router.route('/:subtask/file').post(fileController.decodeFile, fileController.uploadFile).get(fileController.downloadFile);

router.use(authController.restrictTo('lead', 'coordinator'));
router.route('/').post(taskController.createNewSubtask);
router.route('/:subtask').patch(taskController.editSubtask).delete(taskController.deleteSubtask)


module.exports = router;