const { User, Agency, sequelize } = require('./src/models');
const bcrypt = require('bcrypt');

async function createLewisUser() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Get the first agency to assign the user
        const agency = await Agency.findOne();
        if (!agency) {
            console.error('No agency found. Please run seed_data.js first.');
            process.exit(1);
        }

        const email = 'lewis@gmail.com';
        const password = '12345678';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log(`User ${email} already exists. Updating password...`);
            existingUser.password = hashedPassword;
            existingUser.agency_id = agency.id;
            await existingUser.save();
            console.log('User updated successfully.');
        } else {
            const user = await User.create({
                name: 'Lewis',
                email: email,
                password: hashedPassword,
                role: 'ADMIN',
                agency_id: agency.id
            });
            console.log('User created successfully:', user.id);
        }

        process.exit(0);
    } catch (error) {
        console.error('Unable to create user:', error);
        process.exit(1);
    }
}

createLewisUser();
