const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false,
    }
   
)


const run = async() => {
    try {
        await sequelize.sync();
        console.log("Successfully Connected To Database");
    } catch (error) {
        console.log(`An Error has occurred ${error}`);     
    }
}

module.exports = {
    run,
    sequelize
}