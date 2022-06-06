const tasksRouter = require('./tasks')
const homeRouter = require('./home')

function route(app) {
    app.use('/tasks', tasksRouter)
    app.use('/', homeRouter)
}

module.exports = route;
