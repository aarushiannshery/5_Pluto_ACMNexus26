const express = require('express');
const router = express.Router();
const { getEmergencyAssets } = require('../controllers/emergency.controller');

// GET /api/emergency/assets?lat=X&lon=Y
router.get('/assets', getEmergencyAssets);

module.exports = router;
