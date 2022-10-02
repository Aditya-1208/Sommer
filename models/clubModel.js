const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Club name is missing"],
    },
    logo: {
        type: String,
        default: 'default.jpeg'
    }
});

module.exports = mongoose.model('Club', clubSchema);