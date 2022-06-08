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

    // [GET] /tasks/:id/Eedit
    edit(req, res, next) {
        Task.findById(req.params.id)
            .then(task => res.render('tasks/edit', {
                task: mongooseToObject(task)
            }))
            .catch(next);
    }

    // [PUT] /tasks/:id
    update(req, res, next) {
        Task.updateOne({ _id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/tasks'))
            .catch(next);
    }
}

module.exports = new TaskDetailController;
