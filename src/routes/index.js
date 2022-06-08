const tasksRouter = require('./tasks')
const taskDetailsRouter = require('./taskdetails')
const meRouter = require('./me')
const homeRouter = require('./home')

function route(app) {
    app.use('/tasks', tasksRouter)
    app.use('/taskdetails', taskDetailsRouter)
    app.use('/me', meRouter)
    app.use('/', homeRouter)
}

module.exports = route;
