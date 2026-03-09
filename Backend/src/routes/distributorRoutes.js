const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { getAvailableBatches, pickupBatch, updateStatus, getDistributions, getDashboard } = require('../controllers/distributorController');

router.use(authenticateToken, authorizeRoles('distributor'));

router.get('/dashboard', getDashboard);
router.get('/batches', getAvailableBatches);
router.post('/pickup', pickupBatch);
router.patch('/status', updateStatus);
router.get('/distributions', getDistributions);

module.exports = router;
