const catchAsync = require(`${__dirname}/../utils/catchAsync.js`);
const taskModel = require(`${__dirname}/../models/taskModel.js`);
const subtaskModel = require("../models/subtaskModel");
const appError = require(`${__dirname}/../utils/appError.js`)
const fileClass = require(`${__dirname}/../utils/fileHandler.js`)

exports.createNewTask = catchAsync(async (req, res, next) => {
    console.log(req.body);
    req.body.subtasks = [];
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
    req.body.task = req.params.task
    const subtask = await subtaskModel.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            subtask
        }
    })
    next();
})

exports.editTask = catchAsync(async (req, res, next) => {
    const edittedTask = await taskModel.findOneAndUpdate({ slug: req.params.task }, req.body, { runValidators: true, returnDocument: 'after' });
    if (!edittedTask)
        return next(new appError('Task not found', 404));
    res.status(204).json({
        status: "success",
        data: {
            task: edittedTask
        }
    })
    next();
})
exports.editSubtask = catchAsync(async (req, res, next) => {
    const edittedSubtask = await subtaskModel.findOneAndUpdate({ slug: req.params.subtask }, req.body, { runValidators: true, returnDocument: 'after' });
    if (!edittedSubtask)
        return next(new appError('subtask not found', 404));
    res.status(204).json({
        status: "success",
        data: {
            task: edittedSubtask
        }
    })
    next();
})

exports.deleteTask = catchAsync(async (req, res, next) => {
    const deletedTask = await taskModel.findOneAndDelete({ slug: req.params.task });
    if (!deletedTask)
        return next(new appError('Task not found', 404));
    const deletedSubtasks = await subtaskModel.deleteMany({ task: deletedTask.slug });
    const fileHandler = new fileClass;
    if (deletedTask.folder)
        await fileHandler.deleteFile(deletedTask.folder);
    res.status(200).json({
        status: "success",
        data: {
            task: ''
        }
    })
    next();
})

exports.deleteSubtask = catchAsync(async (req, res, next) => {
    const deletedSubtask = await subtaskModel.findOneAndDelete({ slug: req.params.subtask });
    if (!deletedSubtask)
        return next(new appError('subtask not found', 404));
    const fileHandler = new fileClass;
    if (deletedSubtask.file)
        await fileHandler.deleteFile(deletedSubtask.file);
    res.status(200).json({
        status: "success",
        data: {
            subtask: ''
        }
    })
    next();
})

exports.assignSubtask = catchAsync(async (req, res, next) => {
    const subtask = await subtaskModel.findOne({ slug: req.params.subtask });
    if (!subtask)
        return next(new appError('Subtask not found', 404));
    if (subtask.asignee)
        return next(new appError(`Subtask already assigned to ${subtask.asignee}`, 400));
    const parentTask = await taskModel.findOne({ slug: subtask.task });
    if (!parentTask)
        return next(new appError('Parent task Not found', 404));
    if (parentTask.club !== req.user.club)
        return next(new appError('Unauthorized acess', 403));
    subtask.asignee = req.user.username;
    subtask.save();
    res.status(204).json({
        status: "success",
        data: {
            subtask
        }
    })
})
exports.leaveSubtask = catchAsync(async (req, res, next) => {
    const subtask = await subtaskModel.findOne({ slug: req.params.subtask });
    if (!subtask)
        return next(new appError('Subtask not found', 404));
    if (!subtask.asignee)
        return next(new appError(`Subtask not yet assigned`, 400));
    const parentTask = await taskModel.findOne({ slug: subtask.task });
    if (!parentTask)
        return next(new appError('Parent task Not found', 404));
    if (parentTask.club !== req.user.club)
        return next(new appError('Unauthorized acess', 403));
    subtask.asignee = undefined;
    subtask.save();
    res.status(204).json({
        status: "success",
        data: {
            subtask
        }
    })
})