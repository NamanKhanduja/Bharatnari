const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, plannerController.addEvent);
router.get('/', authMiddleware, plannerController.getEvents);
router.patch('/:id', authMiddleware, plannerController.updateEvent);

module.exports = router;
