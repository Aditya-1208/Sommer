const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Club name must be unique"],
        required: [true, "Club name missing"]
    },
    logo: {
        type: String,
        default: 'default.jpeg'
    }
});

module.exports = mongoose.model('Club', clubSchema);