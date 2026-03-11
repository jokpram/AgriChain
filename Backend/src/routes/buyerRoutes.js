const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { getAvailableBatches, getBatchTrace, createOrder, getOrders, getDashboard, getDistributors } = require('../controllers/buyerController');

router.use(authenticateToken, authorizeRoles('pembeli'));

router.get('/dashboard', getDashboard);
router.get('/batches', getAvailableBatches);
router.get('/batches/:id/trace', getBatchTrace);
router.post('/order', createOrder);
router.get('/orders', getOrders);
router.get('/distributors', getDistributors);

module.exports = router;
