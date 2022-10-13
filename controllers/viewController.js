const catchAsync = require(`${__dirname}/../utils/catchAsync.js`);
const clubModel = require(`${__dirname}/../models/clubModel.js`)
const subtaskModel = require(`${__dirname}/../models/subtaskModel.js`)
exports.renderHome = catchAsync(async (req, res, next) => {
    if (res.locals.user)
        res.redirect('/dashboard')
    res.status(200).render('home', {
        title: 'Sommer'
    });
})
exports.renderLogin = catchAsync(async (req, res, next) => {
    if (res.locals.user)
        res.redirect('/dashboard');
    res.status(200).render('login', {
        title: 'Login to Sommer'
    });
})
exports.renderSignup = catchAsync(async (req, res, next) => {
    if (res.locals.user)
        res.redirect('/dashboard');
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