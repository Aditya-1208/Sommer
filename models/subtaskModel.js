const mongoose = require('mongoose');
const slugify = require('slugify')
const taskModel = require(`${__dirname}/taskModel.js`)
const subtaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Subtask title missing']
    },
    description: {
        type: String
    },
    deadline: {
        type: Date,
        required: [true, 'deadline missing']
    },
    slug: {
        type: String,
    },
    asignee: {
        type: String,
    },
    // status: {
    //     type: String,
    //     enum: ['Pending', 'Missed', 'Finished'],
    //     default: 'Pending'
    // },
    file: {
        type: String
    },
    task: {
        type: String,
        required: [true, 'subtask cannot exist without task']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

subtaskSchema.virtual('status').get(function () {
    return (this.file ? 'Completed' : (Date.now() > this.deadline ? 'Missed' : 'Pending'))
})

subtaskSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    next();
})

module.exports = mongoose.model('Subtask', subtaskSchema);