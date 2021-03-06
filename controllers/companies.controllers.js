const Company = require('../models/Company')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        await Company.find({}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.getAllNames = async function (req, res) {
    try {
        await Company.find({}, '-_id -bill -tax -__v', function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const candidate = await Company.findOne({name: req.body.name})
    if (candidate != null) {
        res.status(409).json({
            message: 'Компания с таким названием уже существует'
        })
    } else {
        const company = new Company({
            name: req.body.name,
            bill: req.body.bill,
            tax: req.body.tax,
        })
        try {
            await company.save()
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json(company)
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    }
}

module.exports.remove = async function (req, res) {
    const candidate = await Company.findOne({_id: req.params.id})
    if (candidate) {
        try {
            await Company.findOneAndDelete({_id: req.params.id})
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json({
                message: `Компания ${req.params.name} с id ${req.params.id} удалена`
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

module.exports.update = async function (req, res) {
    const candidate = await Company.findOne({_id: req.params.id})
    if (candidate) {
        try {
            await Company.updateOne(
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