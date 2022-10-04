const { json } = require('express');
const express = require('express');
const authRoutes = require(`${__dirname}/routes/authRouter`)
const app = express();

app.use(json())

app.use('/api/v1/auth', authRoutes);
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode).json({
        status: "fail",
        message: err.message
    })
})

module.exports = app;