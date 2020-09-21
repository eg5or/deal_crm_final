const express = require('express')
const router = express.Router()
const controller = require('../controllers/clientinvoices.controllers')

// /api/clientinvoices
router.get('/', controller.getAll)
router.get('/deal/:id', controller.getAllForDeal)
router.post('/', controller.create)
router.delete('/:id', controller.remove)

module.exports = router