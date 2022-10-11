const express = require('express');
const router = express.Router();
const viewController = require(`${__dirname}/../controllers/viewController.js`);

router.get('/', viewController.renderHome);

module.exports = router;