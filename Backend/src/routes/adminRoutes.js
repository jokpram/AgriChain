const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { getDashboardStats, getUsers, updateUserStatus, getAllBatches, getAllDistributions, getActivityLogs } = require('../controllers/adminController');

router.use(authenticateToken, authorizeRoles('admin'));

router.get('/stats', getDashboardStats);
router.get('/users', getUsers);
router.patch('/users/:id/status', updateUserStatus);
router.get('/batches', getAllBatches);
router.get('/distributions', getAllDistributions);
router.get('/activity-logs', getActivityLogs);

module.exports = router;
