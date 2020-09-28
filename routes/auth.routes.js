const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth.controllers')

// /api/auth
router.post('/login', controller.login)
router.post('/register', controller.register)
router.delete('/logout/:id', controller.logout)
router.get('/authorized/:id', controller.authorized)

module.exports = router