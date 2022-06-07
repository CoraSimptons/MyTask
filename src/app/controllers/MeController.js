const Task = require('../models/Task')
const { multipleMongooseToObject } = require('../../util/mongoose')

class MeController {

    // [GET] /me/stored/tasks
    storedTasks(req, res, next) {
        Task.find({})
            .then(tasks => {
                res.render('me/stored-tasks', {
                    // object literal
                    tasks: multipleMongooseToObject(tasks)
                })
            })
            .catch(next);
    }
}

module.exports = new MeController;
