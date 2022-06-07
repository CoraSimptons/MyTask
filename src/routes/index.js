const tasksRouter = require('./tasks')
const meRouter = require('./me')
const homeRouter = require('./home')

function route(app) {
    app.use('/tasks', tasksRouter)
    app.use('/me', meRouter)
    app.use('/', homeRouter)
}

module.exports = route;
