const multer = require('multer');
const catchAsync = require(`${__dirname}/../utils/catchAsync.js`);
const taskModel = require(`${__dirname}/../models/taskModel.js`);
const subtaskModel = require(`${__dirname}/../models/subtaskModel.js`);
const fileClass = require(`${__dirname}/../utils/fileHandler.js`);
const appError = require(`${__dirname}/../utils/appError.js`)

exports.pipeFile = multer().single('subtask_file');


exports.uploadFile = catchAsync(async (req, res, next) => {
    if (!req.file)
        return next(new appError('No file found', 404))
    console.log(req.file);
    const subtask = await subtaskModel.findOne({ slug: req.params.subtask });
    if (!subtask)
        return next(new appError('Subtask Not found', 404));
    if (subtask.asignee !== req.user.username)
        return next(new appError('Unauthorized access, only asignee can upload file', 403));
    const fileHandler = new fileClass;
    const parentFolder = (await taskModel.find({ slug: req.params.task })).folder
    const response = await fileHandler.uploadSubtaskFile(req.file, req.file.originalname, parentFolder)
    if (subtask.file) {
        console.log('deleting');
        const deleteResponse = await fileHandler.deleteFile(subtask.file);
        console.log(deleteResponse);
    }
    subtask.file = response.data.id;
    await subtask.save();
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
    const fileDetail = await fileHandler.getFile(fileId);
    console.log("file detail : ", fileDetail);
    const file = await fileHandler.downloadFile(fileId);
    if (!file)
        return next(new appError('File not found', 404));
    res.setHeader('fileName', fileDetail.data.name)
    return file.data.pipe(res);

})

