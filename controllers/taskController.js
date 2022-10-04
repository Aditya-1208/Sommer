const catchAsync = require(`${__dirname}/../utils/catchAsync.js`);
const taskModel = require(`${__dirname}/../models/taskModel.js`);
const subtaskModel = require("../models/subtaskModel");

exports.createNewTask = catchAsync(async (req, res, next) => {
    req.subtasks = [];
    const task = await taskModel.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            task
        }
    })
    next();
})

exports.createNewSubtask = catchAsync(async (req, res, next) => {
    const subtask = await subtaskModel.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            subtask
        }
    })
    next();
})