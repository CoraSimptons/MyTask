const Task = require('../models/Task')
const { multipleMongooseToObject } = require('../../util/mongoose')

class HomeController {

    // [GET] /
    index(req, res, next) {

        // Use promises
        Task.find({})
            .then(tasks => {
                res.render('home', {
                    // object literal
                    tasks: multipleMongooseToObject(tasks),
                    info: req.query.valid
                })
            })
            .catch(next);

    }

}

module.exports = new HomeController;
