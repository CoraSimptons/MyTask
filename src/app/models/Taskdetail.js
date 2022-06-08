const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Taskdetail = new Schema({
    name: {type: String, maxlength: 255},
    completed: {type: Boolean, default: false},
    idtask: { type: ObjectId, ref: 'Task' }
}, {
    // record create or update times
    timestamps: true,
});

module.exports = mongoose.model('Taskdetail', Taskdetail);