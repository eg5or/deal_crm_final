const express = require('express')
const router = express.Router()
const controller = require('../controllers/test.controllers')

// /api/test
router.post('/addtest', controller.test)

module.exports = router