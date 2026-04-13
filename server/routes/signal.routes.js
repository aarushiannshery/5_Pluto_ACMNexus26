const express = require('express');
const router = express.Router();
const { postSignal, getSignals } = require('../controllers/signal.controller');

// POST /api/signals
router.post('/', postSignal);

// GET /api/signals?lat=X&lon=Y
router.get('/', getSignals);

module.exports = router;
