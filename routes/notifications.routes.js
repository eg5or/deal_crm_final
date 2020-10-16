const express = require('express')
const router = express.Router()
const controller = require('../controllers/notifications.controllers')

// /api/notifications
router.post('/', controller.createNotification)
router.get('/all', controller.getAllNotifications)
router.get('/popup', controller.getNotificationsForPopup)
router.get('/new', controller.getNewNotifications)
router.patch('/allread', controller.readAllNotifications)
router.get('/countnoread', controller.getCountNoReadNotifications)

module.exports = router