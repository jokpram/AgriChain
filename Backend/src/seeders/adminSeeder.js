const { User } = require('../models');

const seedAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ where: { role: 'admin' } });

        if (existingAdmin) {
            console.log('✅ Admin already exists, skipping seed.');
            return;
        }

        await User.create({
            name: 'Administrator',
            email: 'admin@agribatch.com',
            password: 'admin123',
            role: 'admin',
            status: 'active'
        });

        console.log('✅ Admin seeded successfully: admin@agribatch.com / admin123');
    } catch (error) {
        console.error('❌ Error seeding admin:', error.message);
    }
};

module.exports = seedAdmin;
