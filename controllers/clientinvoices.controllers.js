const ClientInvoice = require('../models/ClientInvoice')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        await ClientInvoice.find({}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.getAllForDeal = async function (req, res) {
    try {
        await ClientInvoice.find({deal: req.params.id}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const clientInvoice = new ClientInvoice({
        deal: req.body.deal,
        company: req.body.company,
        fileUrl: req.body.fileUrl,
        sum: req.body.sum,
    })
    try {
        await clientInvoice.save()
        // Передаем статус 201 Created - что-то создано в БД
        res.status(201).json(clientInvoice)
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    const candidate = await ClientInvoice.findOne({_id: req.params.id})
    if (candidate) {
        try {
            await ClientInvoice.findOneAndDelete({_id: req.params.id})
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json({
                message: `Файл с id ${req.params.id} удален`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Файла с id ${req.params.id} не существует!`
        })
    }
}

