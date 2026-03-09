const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { getBatchByCode, getCommodities, createCommodity } = require('../controllers/batchController');

router.get('/commodities', authenticateToken, getCommodities);
router.post('/commodities', authenticateToken, createCommodity);
router.get('/trace/:code', authenticateToken, getBatchByCode);

module.exports = router;
