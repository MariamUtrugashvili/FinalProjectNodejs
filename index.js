const server = require('./src/server');
const database = require('./src/services/database/db');

const run = async() => {
    try {
        await server.run();
        await database.run();
    } catch (error) {
        console.log(error);
        console.log(`Could not start the service ${error.message}`);
    }
}

run();