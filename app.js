const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require(`${__dirname}/routes/authRouter`)
const taskRoutes = require(`${__dirname}/routes/taskRouter`)
const viewRoutes = require(`${__dirname}/routes/viewRouter`)
const appError = require(`${__dirname}/utils/appError.js`)
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use(morgan('dev'));

app.set('view engine', 'pug');
app.use('/api/v1/auth', authRoutes);
app.use('/dashboard/:club/', taskRoutes);
app.use('/', viewRoutes);

app.use('*', (req, res, next) => {
    return next(new appError(`Can't find ${req.originalUrl}`, 404))
})

app.use((err, req, res, next) => {
    if (req.headers.axiosreq) {
        return res.status(err.statusCode || 500).json({
            status: "failure",
            message: err.message
        })
    }
    return res.status(err.statusCode || 500).render('error', {
        title: err.message,
        heading: 'Sorry, there\'s an error',
        message: err.message
    })

})

module.exports = app;