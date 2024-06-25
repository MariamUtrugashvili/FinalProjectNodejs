const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});

const port = process.env.PORT;


const bookAdminController = require('./models/books/controllers/book-admin-controller');
const bookUserConroller = require('./models/books/controllers/book-user-controller');
const userController = require('./models/users/controllers/user-controller');
const bodyParser = require('body-parser'); 


const run = async() => {
    const app = express();

    app.use(bodyParser.json());

    app.use('/v1',bookAdminController);
    app.use('/v1/user', bookUserConroller);
    app.use('/v1/user', userController);

    app.listen(port, () => [
        console.log(`Server is running at http://localhost:${port}`)
    ])
}

module.exports = {
    run
}