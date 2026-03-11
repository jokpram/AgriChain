const { Product, Batch } = require('../models');

// Add a new product
const createProduct = async (req, res, next) => {
    try {
        const { batch_id, name, description, price, stock, images } = req.body;

        let batch = null;
        if (batch_id) {
            batch = await Batch.findOne({ where: { id: batch_id, farmer_id: req.user.id } });
            if (!batch) {
                return res.status(404).json({ success: false, message: 'Batch not found or not yours' });
            }
        }

        const product = await Product.create({
            farmer_id: req.user.id,
            batch_id: batch ? batch.id : null,
            name,
            description,
            price,
            stock,
            images: images || [] // Expecting an array of strings
        });

        res.status(201).json({ success: true, message: 'Product created successfully', data: product });
    } catch (error) {
        next(error);
    }
};

// Get all products by the farmer
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            where: { farmer_id: req.user.id },
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

// Update product
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, images } = req.body;

        const product = await Product.findOne({ where: { id, farmer_id: req.user.id } });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        await product.update({
            name,
            description,
            price,
            stock,
            images: images || product.images
        });

        res.json({ success: true, message: 'Product updated successfully', data: product });
    } catch (error) {
        next(error);
    }
};

// Delete product
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ where: { id, farmer_id: req.user.id } });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        await product.destroy();
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Public endpoint to get all marketplace products
const getAllMarketplaceProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            where: {
                stock: {
                    [require('sequelize').Op.gt]: 0
                }
            },
            include: [
                { model: require('../models').User, as: 'farmer', attributes: ['id', 'name', 'email'] },
                { model: Batch, as: 'batch' }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getAllMarketplaceProducts
};
