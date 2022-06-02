const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Task = new Schema({
    name: {type: String, maxlength: 255},
    description: {type: String, maxlength: 600},
    backgroundColor: {type: String},
    completed: {type: Boolean},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Task', Task);