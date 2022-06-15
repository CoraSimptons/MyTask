const Task = require('../models/Task')
const Taskdetail = require('../models/Taskdetail')
const { multipleMongooseToObject,mongooseToObject } = require('../../util/mongoose')
var arrays = new Array()
var completedMissionQuantity


class TaskDetailController {

    // [GET] /tasks/:slug
    show(req, res, next) {
        // Use promises
        Task.findOne({ slug: req.params.slug })
            .then(task => {
                res.render('tasks/show', {
                    task: mongooseToObject(task)
                })
            })
            .catch(next);
    }

    // [GET] /tasks/create
    create(req, res, next) {
        res.render('tasks/create')
    }

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
                                        // .then(task => res.json(task))
                                        .then(task => res.render('taskdetails/show', {
                                            task: mongooseToObject(task),
                                            completedMissionsQuantity: task.taskdetails.filter(function(array,index) {
                                                return array.completed===true
                                            }).length
                                        }))
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
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new TaskDetailController;
