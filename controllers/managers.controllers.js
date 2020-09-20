const Manager = require('../models/Manager')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        await Manager.find({}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const candidate = await Manager.findOne({name: req.body.name}) // проверяем на наличие такого пользователя
    if (candidate != null) {
        res.status(409).json({
            message: 'Менеджер с таким именем уже существует'
        })
    } else {
        const manager = new Manager({
            name: req.body.name,
            head: req.body.head,
            tel: req.body.tel
        })
        try {
            await manager.save()
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json(manager)
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
    const candidate = await Manager.findOne({_id: req.params.id})
    if (candidate) {
        try {
            await Manager.findOneAndDelete({_id: req.params.id})
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json({
                message: `Менеджер с id ${req.params.id} удален`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Менеджера с id ${req.params.id} не существует!`
        })
    }
}

module.exports.update = async function (req, res) {
    const candidate = await Manager.findOne({_id: req.params.id})
    if (candidate) {
        try {
            Manager.updateOne(
                {_id: req.params.id},
                {
                    $set: {
                        "name": req.body.name,
                        "head": req.body.head,
                        "tel": req.body.tel
                    }
                },
                function (err, result) {
                    console.log(result);
                }
            );
            res.status(201).json({
                message: `Менеджер с id ${req.params.id} изменен`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Менеджера с id ${req.params.id} не существует!`
        })
    }
}