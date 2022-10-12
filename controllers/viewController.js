const catchAsync = require(`${__dirname}/../utils/catchAsync.js`);
const clubModel = require(`${__dirname}/../models/clubModel.js`)
exports.renderHome = catchAsync(async (req, res, next) => {
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
    res.status(200).render('dashboard', {
        title: 'Your Subtasks'
    });
})