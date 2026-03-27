const { weatherApi } = require('../config/axios');

const getRiskPrediction = async (req, res, next) => {
  try {
    const { location } = req.query;

    if (!location) return res.status(400).json({ error: 'Location required' });

    // OpenWeather API call
    const apiKey = process.env.OPENWEATHER_API_KEY;
    let temp = 300, humidity = 60, weatherMain = 'Clear';
    
    try {
      const response = await weatherApi.get(`/weather?q=${location}&appid=${apiKey}`);
      temp = response.data.main.temp;
      humidity = response.data.main.humidity;
      weatherMain = response.data.weather[0].main;
    } catch (err) {
      console.warn('Weather API failed, using fallback.', err.message);
    }

    // AI Risk Logic
    let probability = 15;
    let disasterType = 'None';

    if (weatherMain === 'Rain' || weatherMain === 'Thunderstorm') {
      probability += 60; disasterType = 'Flood Watch';
    } else if (temp > 308) { 
      probability += 50; disasterType = 'Heatwave Warning';
    } else if (humidity > 80) {
      probability += 20; disasterType = 'Heavy Rainfall Expected';
    }

    probability = Math.min(probability, 99);
    let riskLevel = probability > 70 ? 'High' : (probability >= 30 ? 'Medium' : 'Low');

    res.status(200).json({ location, disasterType, riskLevel, probability });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRiskPrediction };
