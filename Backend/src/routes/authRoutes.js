const router = require('express').Router();
const { register, login, getProfile } = require('../controllers/authController');
const { updateProfile } = require('../controllers/profileController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;
