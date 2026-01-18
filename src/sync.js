const { sequelize } = require("./models/index.js")

sequelize.sync()
    .then(() => {
        console.log("Database synced successfully.");
    })
    .catch((err) => {
        console.error("Failed to sync database: ", err);
    });
