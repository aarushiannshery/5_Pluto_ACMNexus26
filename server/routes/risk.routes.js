const express = require('express');
const router = express.Router();
const { getRiskPrediction } = require('../controllers/risk.controller');

// GET /api/risk?location=CityName
router.get('/', getRiskPrediction);

module.exports = router;
