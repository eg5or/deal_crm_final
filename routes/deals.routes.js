const express = require('express')
const router = express.Router()
const passport = require('passport')
const controller = require('../controllers/deals.controllers')

// /api/deals
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll) // готово // router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/done', passport.authenticate('jwt', {session: false}), controller.getAllDealsDone) // готово // router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/nodonecount', passport.authenticate('jwt', {session: false}), controller.getCountManagersDealsNoDone) // готово // router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/nodeliveredcount', passport.authenticate('jwt', {session: false}), controller.getCountManagersDealsNoDelivered) // готово // router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/manager', passport.authenticate('jwt', {session: false}), controller.getAllManagerDeals) // готово // router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/filter', controller.filterDealsByStatusManagers) // готово
router.get('/filterall', controller.filterDealsByStatusAllManagers) // готово
router.post('/add', controller.create) // готово
router.post('/upload', controller.upload) // готово
router.delete('/delete', controller.deleteFile) // готово
router.post('/status', controller.toggleStatus) // готово
router.post('/driver', controller.addDriverToDeal) // готово
router.post('/forwarder', controller.addForwarderToDeal) // готово
router.delete('/driver', controller.deleteDriverFromDeal) // готово
router.delete('/forwarder', controller.deleteForwarderFromDeal) // готово
router.post('/comment', controller.editComment) // готово
router.get('/:id', controller.getById) // готово
router.delete('/:id', controller.remove)
router.patch('/:id', controller.update)

module.exports = router