const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { createFarm, getFarms, createCultivationLog, getCultivationLogs, createBatch, getBatches, getDashboard } = require('../controllers/farmerController');

router.use(authenticateToken, authorizeRoles('petani'));

router.get('/dashboard', getDashboard);
router.post('/farms', createFarm);
router.get('/farms', getFarms);
router.post('/cultivation-logs', createCultivationLog);
router.get('/cultivation-logs', getCultivationLogs);
router.post('/batches', createBatch);
router.get('/batches', getBatches);

module.exports = router;
