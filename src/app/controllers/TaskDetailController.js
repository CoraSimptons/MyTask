const Task = require('../models/Task')
const Taskdetail = require('../models/Taskdetail')
const { multipleMongooseToObject,mongooseToObject } = require('../../util/mongoose')
var arrays = new Array()
var completedMissionQuantity


class TaskDetailController {

    // [POST] /taskdetails/store
    store(req, res, next) {
        const taskdetail = new Taskdetail(req.body);
        taskdetail.save()
            .then(taskdetailTemp => {
                Task.findById(req.body.idtask)
                    .then(taskData => {
                        taskData.taskdetails.push(taskdetailTemp);
                        arrays = taskData.taskdetails;
                        taskData.missionQuantity = arrays.length;
                        taskData.save()
                            // .then(task => res.json(task))
                            .then(() => {
                                Task.findById(req.body.idtask).
                                    populate('taskdetails'). // only works if we pushed refs to children
                                    exec()
                                        .then(task => res.redirect('back'))
                                        .catch(next);
                            })
                            .catch(next);
                    })
                    .catch(next);
            })
            .catch(next);
    }

    // [GET] /taskdetails/:id/edit
    edit(req, res, next) {
        Taskdetail.findById(req.params.id).populate('idtask').exec()
            .then(taskdetail => res.render('taskdetails/edit', {
                taskdetail: mongooseToObject(taskdetail)
            }))
            .catch(next);
    }

    // [PUT] /taskdetails/:id
    update(req, res, next) {
        var completed = req.body.completed
        if (completed === undefined) {
            Taskdetail.updateOne({ _id: req.params.id }, { name: req.body.name })
                .then(() => res.redirect(`/tasks/${req.body.slug}`))
                .catch(next);
        } else {
            Task.updateOne({ _id: req.body.idtask}, { completedMissionQuantity: req.body.completedMissionQuantity })
                .then(() => {
                    Taskdetail.updateOne({ _id: req.params.id }, { completed: completed })
                        .then(() => res.redirect(`/tasks/${req.body.slug}`))
                        .catch(next);
                })
                .catch(next);
        }
    }

    // [DELETE] /taskdetails/:id
    delete(req, res, next) {
        Taskdetail.deleteOne({ _id: req.params.id })
            .then(() => {
                Task.updateOne({ _id: req.body.idtask }, {
                    // remove an item in array
                    $pull: {
                        taskdetails: req.params.id
                    },
                    $inc: {
                        missionQuantity: -1
                    }
                })
                    .then(() => res.redirect('back'))
                    .catch(next);
            })
            .catch(next);
    }
}

module.exports = new TaskDetailController;
