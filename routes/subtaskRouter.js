const express = require('express');
const taskController = require(`${__dirname}/../controllers/taskController.js`);
const fileController = require(`${__dirname}/../controllers/fileController.js`);
const authController = require(`${__dirname}/../controllers/authController.js`);
const router = express.Router({ mergeParams: true });

router.use(authController.protect)
router.route('/:subtask/file').post(fileController.decodeFile, fileController.uploadFile).get(fileController.downloadFile);

router.route('/').post(authController.restrictTo('lead', 'coordinator'), taskController.createNewSubtask);
router.route('/:subtask').patch(authController.restrictTo('lead', 'coordinator'), taskController.editSubtask).delete(authController.restrictTo('lead', 'coordinator'), taskController.deleteSubtask)


module.exports = router;