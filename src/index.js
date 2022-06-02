const express = require('express')
const {engine} = require('express-handlebars')
const path = require('path')
const app = express()
const port = 3000

const route = require('./routes')

// Connect db
const db = require('./config/db')
db.connect();

// Static file
app.use(express.static(path.join(__dirname, 'public')))

// Template engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Route init
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})