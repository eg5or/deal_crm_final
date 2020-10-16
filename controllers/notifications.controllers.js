const Notification = require('../models/Notification')
const errorHandler = require('../utils/errorHandler')
const mongoose = require('mongoose')

module.exports.createNotification = async function(req, res) {
    const {creator, recipients, deal, message, read} = req.body
    const notification = new Notification({
        creator: creator,
        recipients: recipients,
        deal: deal,
        message: message,
        read: read
    })
    try {
        await notification.save()
        // Передаем статус 201 Created - что-то создано в БД
        res.status(201).json(notification)

    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.getAllNotifications = async function(req, res) {
    try {
        const perPage = 10
        const page = Math.max(0, req.query.page)
        await Notification.find({"recipients": req.query.id})
            .sort({ dt: -1})
            .limit(perPage)
            .skip(perPage * page - perPage)
            .populate('recipients')
            .populate('creator')
            .populate('deal')
            .exec(function (err, result) {
                Notification.find({"recipients": req.query.id}).count().exec(function(err, count) {
                    res.status(200).json({
                        result: result,
                        page: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.getNotificationsForPopup = async function(req, res) {
    try {
        await Notification.find({"recipients": req.query.id})
            .sort({ dt: -1})
            .limit(6)
            .populate('recipients')
            .populate('creator')
            .populate('deal')
            .exec(function (err, result) {
                res.status(200).json(result)
            })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.readAllNotifications = async function(req, res) {
    try {
        await Notification.updateMany({
            "read": false,
            "recipients": req.query.id
        }, { $set: { "read" : true } })
            .exec(function (err, result) {
                res.status(200).json(result)
            })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.getCountNoReadNotifications = async function(req, res) {
    try {
        await Notification.countDocuments({
            "read": false,
            "recipients": req.query.id
        })
            .exec(function (err, result) {
                res.status(200).json({
                    count: result
                })
            })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.getNewNotifications = async function(req, res) {
    try {
        await Notification.find({
            "recipients": req.query.id,
            "read": false,
        }, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}