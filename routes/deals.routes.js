const express = require('express')
const router = express.Router()
const passport = require('passport')
const controller = require('../controllers/deals.controllers')

// /api/deals
router.get('/', controller.getAll) // router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.post('/add', controller.create)
router.post('/upload', controller.upload)
router.get('/:id', controller.getById)
router.delete('/:id', controller.remove)
router.patch('/:id', controller.update)


module.exports = router