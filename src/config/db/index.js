const mongoose = require('mongoose')

async function connect(url) {
    try {
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected")
    } catch (error) {
        console.log("Connect failed")
    }
}

module.exports = { connect };