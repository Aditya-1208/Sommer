const catchAsync = require(`${__dirname}/../utils/catchAsync.js`);

exports.renderHome = catchAsync(async (req, res, next) => {
    res.status(200).render('home', {
        title: 'Sommer'
    });
})