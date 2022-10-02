const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const app = require(`${__dirname}/app.js`);
const { connectDb, runServer } = require(`${__dirname}/controllers/connectionController`);

connectDb();
runServer();
