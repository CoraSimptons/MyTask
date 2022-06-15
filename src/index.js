const express = require('express')
const {engine} = require('express-handlebars')
const methodOverride = require('method-override')
const moment = require('moment');
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
      standardDate: (date) => {
        let text = new Date(date)
        let month = parseInt(text.getMonth()) + 1
        month = month > 9 ? month : '0' + month
        let day = parseInt(text.getDate())
        day = day > 9 ? day : '0' + day
        return  text.getFullYear() + '-' + month + '-' + day
      },
      formatDate: (date) => {
        let text = new Date(date)
        let month = parseInt(text.getMonth()) + 1
        month = month > 9 ? month : '0' + month
        let day = parseInt(text.getDate())
        day = day > 9 ? day : '0' + day
        return  day + '-' + month + '-' + text.getFullYear()
      },
      compareDates: (date) => {
        if (moment(date).isAfter(new Date())) {
          return true;
        }
        return false;
      },
      isChecked: (statusCompleted) => {
        return statusCompleted === true ? 'checked' : '';
      },
      isCompleted: (statusCompleted) => {
        return statusCompleted === true ? 'completed' : '';
      },
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