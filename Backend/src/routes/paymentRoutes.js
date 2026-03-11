const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { createPaymentToken, midtransWebhook } = require('../controllers/paymentController');

// Buy a product (Buyer)
router.post('/buy', authenticateToken, authorizeRoles('pembeli'), createPaymentToken);

// Webhook without auth
router.post('/webhook', midtransWebhook);

module.exports = router;
