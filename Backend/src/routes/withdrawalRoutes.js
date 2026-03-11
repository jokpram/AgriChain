const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { getWithdrawalDashboard, requestWithdrawal, processWithdrawal, getAllWithdrawals } = require('../controllers/withdrawalController');

// Farmer routes
router.get('/my', authenticateToken, authorizeRoles('petani'), getWithdrawalDashboard);
router.post('/request', authenticateToken, authorizeRoles('petani'), requestWithdrawal);

// Admin routes
router.get('/all', authenticateToken, authorizeRoles('admin'), getAllWithdrawals);
router.put('/:id/process', authenticateToken, authorizeRoles('admin'), processWithdrawal);

module.exports = router;
