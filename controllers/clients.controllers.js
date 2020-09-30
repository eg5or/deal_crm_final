const Client = require('../models/Client')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        await Client.find({}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.getAllNames = async function (req, res) {
    try {
        await Client.find({}, '-_id -type -manager -__v', function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const candidate = await Client.findOne({name: req.body.name}) // проверяем на наличие такого пользователя
    if (candidate != null) {
        res.status(409).json({
            message: 'Клиент с таким названием уже существует'
        })
    } else {
        const client = new Client({
            type: req.body.type,
            name: req.body.name,
            manager: req.body.manager,
        })
        try {
            await client.save()
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json(client)
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    }
}

module.exports.remove = async function (req, res) {
    const candidate = await Client.findOne({_id: req.params.id})
    if (candidate) {
        try {
            await Client.findOneAndDelete({_id: req.params.id})
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json({
                message: `Клиент с id ${req.params.id} удален`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Клиента с id ${req.params.id} не существует!`
        })
    }
}

module.exports.update = async function (req, res) {
    const candidate = await Client.findOne({_id: req.params.id})
    if (candidate) {
        try {
            await Client.updateOne(
                {_id: req.params.id},
                {
                    $set: {
                        "type": req.body.type,
                        "name": req.body.name,
                        "manager": req.body.manager
                    }
                },
                function (err, result) {
                    console.log(result);
                }
            );
            res.status(201).json({
                message: `Клиент с id ${req.params.id} изменен`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Клиента с id ${req.params.id} не существует!`
        })
    }
}