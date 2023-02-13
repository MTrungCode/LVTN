const app = require("./app");
const config = require("./app/config");
const MysqlDB = require("./database");

async function startServer() {
    try {
        await MysqlDB.connectDB();
        console.log("Connected to database!");

        const port = config.app.port;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}.`);
        });
    } catch (error) {
        console.log("Cannot connect to database!", error);
        process.exit();
    }
}

startServer();