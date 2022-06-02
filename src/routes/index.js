const taskRouter = require('./task')

function route(app) {
    app.use('/task', taskRouter)
}

module.exports = route;
