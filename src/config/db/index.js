const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/manage_tasks_dev',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected")
    } catch (error) {
        console.log("Connect failed")
    }
}

module.exports = { connect };