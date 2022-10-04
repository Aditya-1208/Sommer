const mongoose = require('mongoose');

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
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['Pending', 'Missed', 'Finished'],
        default: 'Pending'
    },
    file: {
        type: String
    },
    task: {
        type: mongoose.Types.ObjectId,
        ref: 'Task',
        required: [true, 'subtask cannot exist without task']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Subtask', subtaskSchema);