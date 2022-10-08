const appError = require("../utils/appError");
const bcrypt = require('bcrypt');
const { promisify } = require('util')
const jwt = require('jsonwebtoken');


const catchAsync = require(`${__dirname}/../utils/catchAsync.js`);
const userModel = require(`${__dirname}/../models/userModel.js`);

const validatePassword = (candidatePassword, userPassword) => {
    return bcrypt.compare(candidatePassword, userPassword);
}


const signJWT = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: Math.floor(Date.now() / 1000 + 30 * 24 * 60 * 60) //30 days
    });
}

const createSendToken = (userInstance, statusCode, res) => {
    const token = signJWT(userInstance.id);
    //set cookie to httpOnly and secure in prod
    const cookieOptions = {
        maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
    }
    userInstance.password = undefined;
    res.cookie('jwt', token, cookieOptions).status(statusCode).json({
        status: "success",
        token,
        data: {
            user: userInstance
        }
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    //run validators using suitable package or yourself!
    const newUser = await userModel.create(req.body);
    createSendToken(newUser, 201, res);
    next();
})


exports.login = catchAsync(async (req, res, next) => {
    if (!req.body.userId)
        return next(new appError("No username or email provided", 400));
    let user = await userModel.findOne({ $or: [{ username: req.body.userId }, { email: req.body.userId }] });
    if (!user)
        return next(new appError("No user exists with given email or username", 400));
    const passwordValid = validatePassword(req.body.password, user.password);
    if (!passwordValid)
        return next(new appError("Invalid Credentials, please try again", 401))
    createSendToken(user, 200, res);
    next();
})

exports.restrictTo = (...roles) => {
    return catchAsync(async (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new appError('You are not Previlaged to perform this action', 403));
        next();
    })
}

exports.protect = catchAsync(async (req, res, next) => {
    if (!req.cookies.jwt)
        return next(new appError('Unauthorized acess, please login again', 401));
    let token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user)
        return next(new appError('Unauthorized acess, please login again', 401));
    req.user = user;
    next();
});