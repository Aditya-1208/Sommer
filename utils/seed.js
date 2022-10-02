const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../config.env` });
const fs = require('fs');


const { seedModel } = require(`${__dirname}/../controllers/connectionController.js`);
const clubModel = require(`${__dirname}/../models/clubModel.js`);
const userModel = require(`${__dirname}/../models/userModel.js`);

const clubs = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/db-data/clubs.json`, { encoding: "utf-8" }));
const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/db-data/users.json`, { encoding: "utf-8" }));


// seedModel(clubModel, clubs);
seedModel(userModel, users);