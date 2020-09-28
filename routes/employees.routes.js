const express = require('express')
const router = express.Router()
const controller = require('../controllers/employees.controllers')

// /api/employees
router.get('/', controller.getAll)
router.get('/managers', controller.getAllManagersNames)
router.get('/:id', controller.getOne)
router.delete('/:id', controller.remove)
router.patch('/:id', controller.update)

module.exports = router