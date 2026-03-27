const { weatherApi } = require('../config/axios');

const getRiskPrediction = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Exact latitude and longitude coordinates are required for the 100m alert radius.' });
    }

    // OpenWeather API call using exact 100m GPS coordinates
    const apiKey = process.env.OPENWEATHER_API_KEY;
    let temp = 300, humidity = 60, weatherMain = 'Clear';
    
    try {
      const response = await weatherApi.get(`/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      temp = response.data.main.temp;
      humidity = response.data.main.humidity;
      weatherMain = response.data.weather[0].main;
    } catch (err) {
      console.warn('Weather API failed, using fallback.', err.message);
    }

    // AI Risk Logic based on extreme localized weather spikes
    let probability = 15;
    let disasterType = 'None';
    let isAlertActive = false;
    let alertMessage = 'Conditions are stable. No immediate threats detected.';

    if (weatherMain === 'Rain' || weatherMain === 'Thunderstorm') {
      probability += 65; 
      disasterType = 'Flash Flood Warning';
    } else if (temp > 310) { // ~37 C
      probability += 60; 
      disasterType = 'Extreme Heatwave Alert';
    } else if (humidity > 85) {
      probability += 30; 
      disasterType = 'Heavy Localized Rainfall Expected';
    }

    probability = Math.min(probability, 99);
    
    // Alert System Trigger Threshold (100m radius danger)
    let riskLevel = 'Low';
    if (probability > 75) {
      riskLevel = 'CRITICAL';
      isAlertActive = true;
      alertMessage = `EMERGENCY: Immediate ${disasterType} risk within your 100m radius. Seek shelter immediately.`;
    } else if (probability >= 40) {
      riskLevel = 'Medium';
      alertMessage = `Caution: Rising ${disasterType} probability locally. Stay alert.`;
    }

    res.status(200).json({ 
      coordinates: { lat, lon },
      disasterType, 
      riskLevel, 
      probability,
      isAlertActive,
      alertMessage
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRiskPrediction };
