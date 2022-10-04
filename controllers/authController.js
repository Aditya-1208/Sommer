const catchAsync = require(`${__dirname}/../utils/catchAsync.js`);
const userModel = require(`${__dirname}/../models/userModel.js`);

exports.signup = catchAsync(async (req, res, next) => {
    //run validators using suitable package or yourself!
    const newUser = await userModel.create(req.body);
    newUser.password = undefined;
    const jwt = newUser.signJWT();
    //set cookie to httpOnly and secure in prod
    const cookieOptions = {
        maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
    }
    res.cookie('jwt', jwt, cookieOptions).status(201).json({
        res: "success",
        data: {
            newUser
        }
    })
    next();
})
