const express = require('express')
const router = express.Router()

const taskDetailController = require('../app/controllers/TaskDetailController')

router.get('/create', taskDetailController.create)
router.post('/store', taskDetailController.store)
router.get('/:id/edit', taskDetailController.edit)
router.put('/:id', taskDetailController.update)
router.delete('/:id', taskDetailController.delete)
router.get('/:slug', taskDetailController.show)

module.exports = router;
