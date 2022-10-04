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

subtaskSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
})

subtaskSchema.post('save', async function () {
    const parentTask = await taskModel.findById(this.task);
    parentTask.subtasks.push(this._id);
    await parentTask.save();
})

module.exports = mongoose.model('Subtask', subtaskSchema);