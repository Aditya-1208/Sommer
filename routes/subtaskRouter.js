const express = require('express');
const taskController = require(`${__dirname}/../controllers/taskController.js`);
const fileController = require(`${__dirname}/../controllers/fileController.js`);
const authController = require(`${__dirname}/../controllers/authController.js`);
const router = express.Router({ mergeParams: true });

router.use(authController.protect)
router.route('/file').post(fileController.decodeFile, fileController.uploadFile).get(fileController.downloadFile);

router.route('/').patch(authController.restrictTo('lead', 'coordinator'), taskController.editSubtask).delete(authController.restrictTo('lead', 'coordinator'), taskController.deleteSubtask)
router.route('/assign').all(taskController.assignSubtask)
router.route('/unassign').all(taskController.leaveSubtask)


module.exports = router;