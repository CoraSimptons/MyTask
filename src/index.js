const express = require('express')
const {engine} = require('express-handlebars')
const methodOverride = require('method-override')
const path = require('path')
const app = express()
const port = 3000

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// import routes to use
const route = require('./routes')

// Connect db
const db = require('./config/db')
db.connect();

// middleware handle form data sended server
app.use(express.urlencoded({
  extended: true
}))
// xmlhttprequest, fetch, axios - send data to server through js library
app.use(express.json())

// Static file
app.use(express.static(path.join(__dirname, 'public')))

// Template engine
app.engine(
  '.hbs', 
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    }
  })
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Route init
route(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})