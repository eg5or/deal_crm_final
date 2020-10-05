const express = require('express')
const router = express.Router()
const passport = require('passport')
const controller = require('../controllers/auth.controllers')

// /api/auth
router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/me', passport.authenticate('jwt', {session: false}), controller.me)
router.delete('/logout/:id', controller.logout)
router.get('/authorized/:id', controller.authorized)

module.exports = router