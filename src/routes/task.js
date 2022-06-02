const express = require('express')
const router = express.Router()

const taskController = require('../app/controllers/TaskController')

router.use('/', taskController.index)

module.exports = router;