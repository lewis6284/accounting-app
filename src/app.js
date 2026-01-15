require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/candidates', require('./routes/candidateRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/revenues', require('./routes/revenueRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/journals', require('./routes/journalRoutes'));
app.use('/api/receipts', require('./routes/receiptRoutes'));
app.use('/api/accounts', require('./routes/accountRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));
app.use('/api/data', require('./routes/dataListRoutes'));

// Database Sync & Server Start
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});

module.exports = app;
