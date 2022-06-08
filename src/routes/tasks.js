const express = require('express')
const router = express.Router()

const taskController = require('../app/controllers/TaskController')

router.get('/create', taskController.create)
router.post('/store', taskController.store)
router.get('/:id/edit', taskController.edit)
router.put('/:id', taskController.update)
router.delete('/:id', taskController.delete)
router.get('/:slug', taskController.show)

module.exports = router;
