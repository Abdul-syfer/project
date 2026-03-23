require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('./middleware/rateLimit');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimit);

// Import routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const issueRoutes = require('./routes/issues');
app.use('/api/issues', issueRoutes);

const confirmationRoutes = require('./routes/confirmations');
app.use('/api/confirmations', confirmationRoutes);

const predictionRoutes = require('./routes/predictions');
app.use('/api/predictions', predictionRoutes);

const myReportsRoutes = require('./routes/myReports');
app.use('/api/my-reports', myReportsRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.use(errorHandler);