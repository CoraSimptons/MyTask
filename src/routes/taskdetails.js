const express = require('express')
const router = express.Router()

const taskDetailController = require('../app/controllers/TaskDetailController')

router.post('/store', taskDetailController.store)
router.get('/:id/edit', taskDetailController.edit)
router.put('/:id', taskDetailController.update)
router.delete('/:id', taskDetailController.delete)

module.exports = router;
