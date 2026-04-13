const express = require('express');
const router = express.Router();
const { getReport } = require('../controllers/report.controller');

// GET /api/report?location=CityName
router.get('/', getReport);

module.exports = router;
