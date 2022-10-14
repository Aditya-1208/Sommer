const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../config.env` });
const fs = require('fs');
const fileClass = require('./fileHandler.js');


const { seedModel } = require(`${__dirname}/../controllers/connectionController.js`);

const clubModel = require(`${__dirname}/../models/clubModel.js`);
const userModel = require(`${__dirname}/../models/userModel.js`);
const taskModel = require(`${__dirname}/../models/taskModel.js`);
const subtaskModel = require(`${__dirname}/../models/subtaskModel.js`);

const clubs = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/db-data/clubs.json`, { encoding: "utf-8" }));
const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/db-data/users.json`, { encoding: "utf-8" }));
const tasks = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/db-data/tasks.json`, { encoding: "utf-8" }));
const subtasks = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/db-data/subtasks.json`, { encoding: "utf-8" }));

const seedAll = async () => {
    const fileHandler = new fileClass;
    await fileHandler.deleteAllFiles();
    await seedModel(clubModel, clubs);
    await seedModel(userModel, users);
    await seedModel(taskModel, tasks);
    await seedModel(subtaskModel, subtasks);
}

if (process.argv[2] == 'club')
    seedModel(clubModel, clubs);
else if (process.argv[2] == 'user')
    seedModel(userModel, users);
else if (process.argv[2] == 'task')
    seedModel(taskModel, tasks);
else if (process.argv[2] == 'subtask')
    seedModel(subtaskModel, subtasks);
else if (process.argv[2] == 'all')
    seedAll();