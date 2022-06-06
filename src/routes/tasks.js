const express = require('express')
const router = express.Router()

const taskController = require('../app/controllers/TaskController')

router.get('/create', taskController.create)
router.post('/store', taskController.store)
router.get('/:slug', taskController.show)

module.exports = router;
