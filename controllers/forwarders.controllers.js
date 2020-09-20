const Forwarder = require('../models/Forwarder')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        await Forwarder.find({}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const candidate = await Forwarder.findOne({name: req.body.name}) // проверяем на наличие такого пользователя
    if (candidate != null) {
        res.status(409).json({
            message: 'Экспедитор с таким именем уже существует'
        })
    } else {
        const forwarder = new Forwarder({
            name: req.body.name,
            tel: req.body.tel
        })
        try {
            await forwarder.save()
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json(forwarder)
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
    const candidate = await Forwarder.findOne({_id: req.params.id})
    if (candidate) {
        try {
            await Forwarder.findOneAndDelete({_id: req.params.id})
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json({
                message: `Экспедитор с id ${req.params.id} удален`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Экспедитора с id ${req.params.id} не существует!`
        })
    }
}

module.exports.update = async function (req, res) {
    const candidate = await Forwarder.findOne({_id: req.params.id})
    if (candidate) {
        try {
            Forwarder.updateOne(
                {_id: req.params.id},
                {
                    $set: {
                        "name": req.body.name,
                        "tel": req.body.tel
                    }
                },
                function (err, result) {
                    console.log(result);
                }
            );
            res.status(201).json({
                message: `Экспедитор с id ${req.params.id} изменен`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Экспедитора с id ${req.params.id} не существует!`
        })
    }
}