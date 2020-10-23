const Release = require('../models/Release')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        await Release.find({}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.getOne = async function (req, res) {
    try {
        await Release.findOne({version: req.query.version}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const release = new Release({
        title: req.body.title,
        text: req.body.text,
        items: req.body.items,
        version: req.body.version,
        date: req.body.date,
    })
    try {
        await release.save()
        // Передаем статус 201 Created - что-то создано в БД
        res.status(201).json(release)
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    const candidate = await Release.findOne({_id: req.params.id})
    if (candidate) {
        try {
            await Release.findOneAndDelete({_id: req.params.id})
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json({
                message: `Релиз с id ${req.params.id} удален`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Релиза с id ${req.params.id} не существует!`
        })
    }
}

module.exports.update = async function (req, res) {
    const candidate = await Release.findOne({_id: req.params.id})
    if (candidate) {
        try {
            await Release.updateOne(
                {_id: req.params.id},
                {
                    $set: {
                        "name": req.body.name,
                        "bill": req.body.bill,
                        "tax": req.body.tax
                    }
                },
                function (err, result) {
                    console.log(result);
                }
            );
            res.status(201).json({
                message: `Компания ${req.params.name} с id ${req.params.id} изменена`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Компании ${req.params.name} с id ${req.params.id} не существует!`
        })
    }
}