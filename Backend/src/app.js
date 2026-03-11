const express = require('express');
const cors = require('cors');
require('dotenv').config();

const errorHandler = require('./middlewares/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const distributorRoutes = require('./routes/distributorRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const batchRoutes = require('./routes/batchRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const withdrawalRoutes = require('./routes/withdrawalRoutes'); // we will create this soon

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'AgriChain Traceability System API',
        version: '1.0.0'
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/distributor', distributorRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/batch', batchRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/withdrawals', withdrawalRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

module.exports = app;
