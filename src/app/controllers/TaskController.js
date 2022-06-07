const Task = require('../models/Task')
const { mongooseToObject } = require('../../util/mongoose')

class TaskController {

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
        req.body.slug = req.body.name;
        const task = new Task(req.body);
        task.save()
            .then(() => res.redirect('/'))
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

module.exports = new TaskController;
