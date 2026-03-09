const jwt = require('jsonwebtoken');
const { User, ActivityLog } = require('../models');

// Register (except admin)
const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (role === 'admin') {
            return res.status(403).json({ success: false, message: 'Admin registration is not allowed' });
        }

        if (!['petani', 'distributor', 'pembeli'].includes(role)) {
            return res.status(400).json({ success: false, message: 'Invalid role' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        const user = await User.create({ name, email, password, role });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        await ActivityLog.create({
            user_id: user.id,
            action: 'REGISTER',
            description: `User ${name} registered as ${role}`
        });

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: {
                user: { id: user.id, name: user.name, email: user.email, role: user.role },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

// Login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        if (user.status === 'suspended') {
            return res.status(403).json({ success: false, message: 'Account is suspended' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        await ActivityLog.create({
            user_id: user.id,
            action: 'LOGIN',
            description: `User ${user.name} logged in`
        });

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: { id: user.id, name: user.name, email: user.email, role: user.role },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get current user profile
const getProfile = async (req, res, next) => {
    try {
        res.json({
            success: true,
            data: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                status: req.user.status
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, getProfile };
