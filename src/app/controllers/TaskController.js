const Task = require('../models/Task')

class TaskController {

    // [GET] /task
    index(req, res) {
        Task.find({}, function (err, tasks) {
            res.json(tasks)
        });
    }

}

module.exports = new TaskController;
