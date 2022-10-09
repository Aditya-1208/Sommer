const multer = require('multer');
const catchAsync = require(`${__dirname}/../utils/catchAsync.js`);
const taskModel = require(`${__dirname}/../models/taskModel.js`);
const subtaskModel = require(`${__dirname}/../models/subtaskModel.js`);
const fileClass = require(`${__dirname}/../utils/fileHandler.js`);
const appError = require(`${__dirname}/../utils/appError.js`)
const storage = multer.memoryStorage()
exports.decodeFile = multer({ storage }).single('subtask-file');


exports.uploadFile = catchAsync(async (req, res, next) => {
    const fileHandler = new fileClass;
    const parentFolder = (await taskModel.find({ slug: req.params.task })).folder;
    const response = await fileHandler.uploadSubtaskFile(req.file, req.params.subtask, parentFolder)
    await subtaskModel.findOneAndUpdate({ slug: req.params.subtask }, { file: response.data.id })

    res.status(response.status).json({
        status: 'success',
        data: {
            fileId: response.data.id
        }
    });

})
exports.downloadFile = catchAsync(async (req, res, next) => {
    const fileHandler = new fileClass;
    const subtask = await subtaskModel.findOne({ slug: req.params.subtask });
    const fileId = subtask.file;
    if (!fileId)
        return next(new appError('File not uploaded yet', 400));
    const file = await fileHandler.downloadFile(fileId);
    if (!file)
        return next(new appError('File not found', 404));

    res.status(200).json({
        status: 'success',
        data: {
            file
        }
    });

})

