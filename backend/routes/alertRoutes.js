const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, alertController.uploadMiddleware, alertController.createAlert);
router.get('/', authMiddleware, alertController.getAlerts);

module.exports = router;
