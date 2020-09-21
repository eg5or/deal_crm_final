const express = require('express')
const router = express.Router()
const controller = require('../controllers/companies.controllers')

// /api/companies
router.get('/', controller.getAll)
router.get('/names', controller.getAllNames)
router.post('/add', controller.create)
router.delete('/:id', controller.remove)
router.patch('/:id', controller.update)

module.exports = router