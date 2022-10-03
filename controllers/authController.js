const catchAsync = require(`${__dirname}/../utils/catchAsync.js`);
const userModel = require(`${__dirname}/../models/userModel.js`);

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await userModel.create(req.body);
    newUser.password = undefined;
    const jwt = newUser.signJWT();
    res.status(201).json({
        res: "success",
        data: {
            jwt, newUser
        }
    })
    next();
})
