const catchAsync = require(`${__dirname}/../utils/catchAsync.js`);
const clubModel = require(`${__dirname}/../models/clubModel.js`)
const subtaskModel = require(`${__dirname}/../models/subtaskModel.js`)
const taskModel = require(`${__dirname}/../models/taskModel.js`)
exports.renderHome = catchAsync(async (req, res, next) => {
    if (res.locals.user)
        return res.redirect('/dashboard')
    res.status(200).render('home', {
        title: 'Sommer'
    });
})
exports.renderLogin = catchAsync(async (req, res, next) => {
    if (res.locals.user)
        return res.redirect('/dashboard');
    res.status(200).render('login', {
        title: 'Login to Sommer'
    });
})
exports.renderSignup = catchAsync(async (req, res, next) => {
    if (res.locals.user)
        return res.redirect('/dashboard');
    const clubs = await clubModel.find({});
    res.status(200).render('signup', {
        title: 'Register to Sommer', clubs
    });
})
exports.renderDashboard = catchAsync(async (req, res, next) => {
    const subtasks = await subtaskModel.find({ asignee: req.user.username }).populate('task');
    res.status(200).render('dashboard', {
        title: 'Your Subtasks', subtasks
    });
})
exports.renderClubDashboard = catchAsync(async (req, res, next) => {
    const tasks = await taskModel.find({ club: req.params.club }).populate('subtasks');
    res.status(200).render('club_dashboard', {
        title: `${req.user.club} Club Dashboard`, tasks
    });
})


exports.renderNewTaskForm = catchAsync(async (req, res, next) => {
    res.status(200).render('task_form', {
        title: `New task : ${req.user.club} Club`,
        heading: `Create New Task For ${req.user.club} club`,
        type: "task",
        mode: "new"
    });
})
exports.renderNewSubtaskForm = catchAsync(async (req, res, next) => {
    res.status(200).render('task_form', {
        title: `New subtask : ${req.params.task}`,
        heading: `Create New Subtask`,
        type: "subtask",
        parentTaskSlug: req.params.task,
        mode: "new"
    });
})
exports.renderEditTaskForm = catchAsync(async (req, res, next) => {
    const task = await taskModel.findOne({ slug: req.params.task });
    if (task.club !== req.params.club)
        return next();
    res.status(200).render('task_form', {
        title: `Edit task : ${task.title}`,
        heading: `Editing task : ${task.title}`,
        task,
        type: "task",
        mode: "edit"
    });
})
exports.renderEditSubtaskForm = catchAsync(async (req, res, next) => {
    const subtask = await subtaskModel.findOne({ slug: req.params.subtask });
    if (subtask.task !== req.params.task)
        return next();
    res.status(200).render('task_form', {
        title: `Edit subtask : ${subtask.title}`,
        heading: `Editing subtask : ${subtask.title}`,
        subtask,
        type: "subtask",
        mode: "edit"
    });
})