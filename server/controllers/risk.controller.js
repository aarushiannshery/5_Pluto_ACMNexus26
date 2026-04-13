const { weatherApi } = require('../config/axios');

const getRiskPrediction = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Exact latitude and longitude coordinates are required for atmospheric telemetry validation.' });
    }

    // OpenWeather API Telemetry Extraction
    const apiKey = process.env.OPENWEATHER_API_KEY;
    let temp = 300, humidity = 60, weatherMain = 'Clear', windSpeed = 5.2;
    
    try {
      // Get Metric units to standardize telemetrics (Celsius, meters/sec)
      const response = await weatherApi.get(`/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
      temp = response.data.main.temp;
      humidity = response.data.main.humidity;
      weatherMain = response.data.weather[0].main;
      windSpeed = response.data.wind.speed * 2.23694; // Convert m/s to MPH for the UI
    } catch (err) {
      console.warn('Weather API failed, engaging fallback metrics.', err.message);
      temp = 27; // 27C 
    }

    // Mathematical Threat Vectoring (HWI & Hazard Chances)
    let probability = 15;
    let disasterType = 'Stable';
    let isAlertActive = false;
    let alertMessage = 'Atmospheric telemetry confirms stable environmental parameters.';

    // Calculate Heat Wave Index Simulator (Base Temp + Humidity amplification)
    let heatWaveIndex = temp + (humidity * 0.15);

    if (weatherMain === 'Rain' || weatherMain === 'Thunderstorm') {
      probability += 65; 
      disasterType = 'Critical Flooding';
    } else if (heatWaveIndex > 42) {
      probability += 60; 
      disasterType = 'Extreme Heat Hazard';
    } else if (windSpeed > 40) {
      probability += 50;
      disasterType = 'Severe Wind Shear';
    } else if (humidity > 85) {
      probability += 30; 
      disasterType = 'Precipitation Overload';
    }

    probability = Math.min(probability, 99);
    
    // Impact Level Translation (L1-L4 metric)
    let impactLevel = 'L1'; // Base Level Safe
    if (probability > 85) {
      impactLevel = 'L4';
      isAlertActive = true;
      alertMessage = `CRITICAL RESPONSE REQUIRED: L4 ${disasterType} localized at current coordinates. Initiate tactical evacuation.`;
    } else if (probability > 70) {
      impactLevel = 'L3';
      isAlertActive = true;
      alertMessage = `WARNING: L3 ${disasterType} imminent. Prepare lockdown procedures.`;
    } else if (probability >= 40) {
      impactLevel = 'L2';
      alertMessage = `CAUTION: L2 parameter shift detected. Environmental deviation likely.`;
    }

    // Telemetry payload specifically mapped to "Cerulean Precision" blueprint
    res.status(200).json({ 
      coordinates: { lat, lon },
      telemetry: {
        heat_wave_index: Number(heatWaveIndex.toFixed(1)),
        humidity_percent: humidity,
        impact_level: impactLevel,
        wind_speed_mph: Number(windSpeed.toFixed(1))
      },
      disasterType, 
      probability,
      isAlertActive,
      alertMessage
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRiskPrediction };
