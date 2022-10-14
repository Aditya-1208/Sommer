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
    const subtasks = await subtaskModel.find().populate('task');
    res.status(200).render('dashboard', {
        title: 'Your Subtasks', subtasks
    });
})
exports.renderClubDashboard = catchAsync(async (req, res, next) => {
    //automatically error 404 in the case
    if (req.params.club !== req.user.club)
        next();
    const tasks = await taskModel.find({ club: req.params.club }).populate('subtasks');
    res.status(200).render('club_dashboard', {
        title: `${req.user.club} Club Dashboard`, tasks
    });
})


exports.renderNewTaskForm = catchAsync(async (req, res, next) => {
    //automatically error 404 in the case
    if (req.params.club !== req.user.club)
        next();
    res.status(200).render('task_form', {
        title: `New task : ${req.user.club} Club`
    });
})