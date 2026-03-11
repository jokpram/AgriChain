const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { createProduct, getProducts, updateProduct, deleteProduct, getAllMarketplaceProducts } = require('../controllers/productController');

// Public or User specific
router.get('/marketplace', authenticateToken, getAllMarketplaceProducts);

// Farmer only routes
router.use(authenticateToken, authorizeRoles('petani'));
router.post('/', createProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
