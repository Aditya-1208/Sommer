const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require(`${__dirname}/routes/authRouter`)
const taskRoutes = require(`${__dirname}/routes/taskRouter`)
const viewRoutes = require(`${__dirname}/routes/viewRouter`)
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'pug');
app.use('/api/v1/auth', authRoutes);
app.use('/dashboard/:club/', taskRoutes);
app.use('/', viewRoutes);


app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).render('error', {
        title: err.message,
        heading: 'Sorry, there\'s an error',
        message: err.message
    })
})

app.get('*', (req, res, next) => {
    res.status(404).render('error', {
        title: 'page not found',
        heading: 'Error 404',
        message: 'Page Not Found'
    });
})

module.exports = app;