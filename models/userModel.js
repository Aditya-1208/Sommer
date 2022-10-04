const mongoose = require('mongoose');
const clubModel = require('./clubModel');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is missing'],
        unique: [true, 'username already exists']
    },
    email: {
        type: String,
        required: [true, 'email is missing'],
        unique: [true, 'email already exists']
    },
    photo: {
        type: String,
        default: 'default.png'
    },
    club: {
        type: String,
        required: [true, "club name missing"],
        //custom validator
        validate: {
            validator: async function (inputClub) {
                const clubs = await clubModel.find({}).select('name');
                return clubs.find(club => club.name === inputClub) ? true : false;

            },
            message: 'Not a valid club name'
        }
    },
    password: {
        type: String,
        required: [true, 'password is missing']
    }
})

userSchema.pre('save', async function () {
    try {
        this.password = await bcrypt.hash(this.password, 10);
    }
    catch (err) {
        return console.log(err);
    }
})

module.exports = mongoose.model('User', userSchema)