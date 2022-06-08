const Task = require('../models/Task')
const Taskdetail = require('../models/Taskdetail')
const { multipleMongooseToObject,mongooseToObject } = require('../../util/mongoose')

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

    // [POST] /tasks/store
    store(req, res, next) {
        const taskdetail = new Taskdetail(req.body);
        taskdetail.save()
            .then(taskdetailTemp => {
                Task.findById(req.body.idtask)
                    .then(taskData => {
                        const taskTemp = mongooseToObject(taskData)
                        taskData.taskdetails.push(taskdetailTemp);
                        taskData.save()
                            // .then(task => res.json(task))
                            .then(() => {
                                Task.findById('62a04585e5ce3d48453642ec').
                                    populate('taskdetails'). // only works if we pushed refs to children
                                    exec()
                                        .then(task => res.render('taskdetails/show', {
                                            task: mongooseToObject(task)
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
        Taskdetail.updateOne({ _id: req.params.id }, { name: req.body.name })
            .then(() => res.redirect(`/tasks/${req.body.slug}`))
            .catch(next);
    }
}

module.exports = new TaskDetailController;
