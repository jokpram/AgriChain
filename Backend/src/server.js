const app = require('./app');
const { sequelize } = require('./models');
const seedAdmin = require('./seeders/adminSeeder');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log(' Database connected successfully');

        // Sync models
        await sequelize.sync({ alter: true });
        console.log(' Database models synced');

        // Run seeders
        await seedAdmin();

        // Start server
        app.listen(PORT, () => {
            console.log(` AgriChain server running on port ${PORT}`);
            console.log(` API: http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error(' Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();
