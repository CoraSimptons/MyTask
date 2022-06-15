const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// add plugin
mongoose.plugin(slug);

const Task = new Schema({
    name: {type: String, maxlength: 255},
    description: {type: String, maxlength: 600},
    backgroundColor: {type: String},
    completed: {type: Boolean, default: false},
    date: {type: Date, default: Date.now},
    slug: {type: String, slug: 'name', unique: true},
    taskdetails: [{ type: ObjectId, ref: 'Taskdetail'}],
    missionQuantity: { type: Number, default: 0},
    completedMissionQuantity: { type: Number, default: 0}
}, {
    // record create or update times
    timestamps: true,
});

module.exports = mongoose.model('Task', Task);