const express = require('express');
const cors = require('cors');
require('dotenv').config();

const riskRoutes = require('./routes/risk.routes');
const reportRoutes = require('./routes/report.routes');
const signalRoutes = require('./routes/signal.routes');
const emergencyRoutes = require('./routes/emergency.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/risk', riskRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/signals', signalRoutes);
app.use('/api/emergency', emergencyRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'RESQ.AI Server is running' });
});

// Centralized error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
