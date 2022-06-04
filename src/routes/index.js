const taskRouter = require('./task')
const homeRouter = require('./home')

function route(app) {
    app.use('/task', taskRouter)
    app.use('/', homeRouter)
}

module.exports = route;
