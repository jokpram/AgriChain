const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const updateProfile = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userId = req.user.id; // from auth middleware

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if email is being changed and already exists
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email already in use' });
            }
            user.email = email;
        }

        if (name) user.name = name;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        // Generate new token with updated user details if name/email changed
        const tokenPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        const newToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            success: true,
            message: 'Profile updated successfully',
            token: newToken,
            user: tokenPayload
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updateProfile
};
