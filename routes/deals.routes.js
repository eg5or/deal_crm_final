const express = require('express')
const router = express.Router()
const passport = require('passport')
const controller = require('../controllers/deals.controllers')

// /api/deals
router.get('/', controller.getAll) // готово // router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.post('/add', controller.create) // готово
router.post('/upload', controller.upload) // готово
router.patch('/delete', controller.deleteFile) // готово
router.post('/add/driver', controller.addDriverToDeal) // готово
router.post('/add/forwarder', controller.addForwarderToDeal) // готово
router.get('/:id', controller.getById) // готово
router.delete('/:id', controller.remove)
router.patch('/:id', controller.update)

module.exports = router