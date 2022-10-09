const mongoose = require('mongoose');
const fileClass = require(`${__dirname}/../utils/fileHandler.js`);

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Club name must be unique"],
        required: [true, "Club name missing"]
    },
    logo: {
        type: String,
        default: 'default.jpeg'
    },
    folder: String
});

clubSchema.pre('save', async function (next) {
    if (this.folder)
        return next();
    const fileHandler = new fileClass;
    this.folder = await fileHandler.createNewFolder(this.name, process.env.SOMMER_FOLDER);
    next();
})

clubSchema.pre('remove', async function (next) {
    if (!this.folder)
        return next()
    const fileHandler = new fileClass;
    const response = await fileHandler.deleteFile(this.folder);
    console.log(response);
    next();
})

module.exports = mongoose.model('Club', clubSchema);