const express = require('express')
const router = express.Router()
const controller = require('../controllers/forwarders.controllers')

// /api/forwarders
router.get('/', controller.getAll)
router.post('/add', controller.create)
router.get('/:id', controller.getById)
router.delete('/:id', controller.remove)
router.patch('/:id', controller.update)

module.exports = router