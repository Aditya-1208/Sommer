const mongoose = require('mongoose');
const slugify = require('slugify');
const clubModel = require(`${__dirname}/clubModel.js`)

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title missing'],
        unique: [true, 'Task title already exists']
    },
    description: {
        type: String
    },
    socialMedia: {
        type: String,
        required: [true, 'Social-media missing'],
        enum: ['Facebook', 'Youtube', 'Instagram', 'Linkedin', 'Twitter']
    },
    deadline: {
        type: Date,
        required: [true, 'deadline missing']
    },
    slug: {
        type: String,
        unique: [true, 'task slug must be unqiue']
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
    subtasks: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'Subtask',
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

taskSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
})

module.exports = mongoose.model('Task', taskSchema);