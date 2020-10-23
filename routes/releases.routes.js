const express = require('express')
const router = express.Router()
const controller = require('../controllers/releases.controllers')

// /api/releases
router.get('/', controller.getAll)
router.post('/add', controller.create)
router.get('/last', controller.getOne)
router.delete('/:id', controller.remove)
router.patch('/:id', controller.update)

module.exports = router