const Driver = require('../models/Driver')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        await Driver.find({}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const candidate = await Driver.findOne({name: req.body.name}) // проверяем на наличие такого пользователя
    if (candidate != null) {
        res.status(409).json({
            message: 'Водитель с таким именем уже существует'
        })
    } else {
        const driver = new Driver({
            name: req.body.name,
            tel: req.body.tel,
            auto: req.body.auto,
        })
        try {
            await driver.save()
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json(driver)
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    }
}

module.exports.getById = function (req, res) {
    res.status(200).json({
        message: 'getById drivers OK'
    })
}

module.exports.remove = async function (req, res) {
    const candidate = await Driver.findOne({_id: req.params.id})
    if (candidate) {
        try {
            await Driver.findOneAndDelete({_id: req.params.id})
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json({
                message: `Водитель с id ${req.params.id} удален`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Водителя с id ${req.params.id} не существует!`
        })
    }
}

module.exports.update = async function (req, res) {
    const candidate = await Driver.findOne({_id: req.params.id})
    if (candidate) {
        try {
            Driver.updateOne(
                {_id: req.params.id},
                {
                    $set: {
                        "name": req.body.name,
                        "tel": req.body.tel,
                        "auto": req.body.auto
                    }
                },
                function (err, result) {
                    console.log(result);
                }
            );
            res.status(201).json({
                message: `Водитель с id ${req.params.id} изменен`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Водителя с id ${req.params.id} не существует!`
        })
    }
}