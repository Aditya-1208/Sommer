const { json } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require(`${__dirname}/routes/authRouter`)
const taskRoutes = require(`${__dirname}/routes/taskRouter`)
const app = express();

app.use(json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoutes);
app.use('/dashboard/:club/', taskRoutes);
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        status: "fail",
        message: err.message
    })
})

module.exports = app;