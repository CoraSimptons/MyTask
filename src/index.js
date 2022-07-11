const express = require('express')
const {engine} = require('express-handlebars')
const methodOverride = require('method-override')
const moment = require('moment');
const path = require('path');
// const { db } = require('./app/models/Task');
const app = express()
require('dotenv').config()

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// import routes to use
const route = require('./routes')

// Connect db
const db = require('./config/db')
// db.connect();

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
      currentDate: () => {
        let date = new Date()
        let month = parseInt(date.getMonth()) + 1
        month = month > 9 ? month : '0' + month
        let day = parseInt(date.getDate())
        day = day > 9 ? day : '0' + day
        return  date.getFullYear() + '-' + month + '-' + day
      },
      compareDates: (date) => {
        let tomorrow = new Date();
        tomorrow.setDate(date.getDate() + 1);
        if (moment(tomorrow).isAfter(new Date())) {
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
      isTaskCompleted: (totalMissions, completedMissions) => {
        if (totalMissions === completedMissions) {
          if (totalMissions == 0) {
            return 'bg-transparent not-checked';
          } else {
            return 'bg-secondary text-white';
          }
        } else {
          return 'bg-transparent';
        }
      },
      notify: (info) => {
        return info === 'success' ? 'toastmessage' : '';
      },
      hasMission: (num) => {
        return num > 0 ? '' : 'nomission';
      },
      hasTask: (arr) => {
        let temp = new Array();
        temp = arr;
        return  temp.length > 0 ? '' : 'notask';
      },
    }
  })
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Route init
route(app)

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`)
// })

const start = async () => {
  try {
      await db.connect(process.env.MONGO_URI)
      app.listen(process.env.PORT || 3000,console.log(`Server is listening on 3000`))
  } catch (error) {
      console.log(error)
  }
}

start()