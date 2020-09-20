const Employee = require('../models/Employee')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        await Employee.find({}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.getAllManagersNames = async function (req, res) {
    try {
        await Employee.find({position: 'manager'}, '-_id -position -head -location -tel -intel -birthday -__v', function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const candidate = await Employee.findOne({name: req.body.name}) // проверяем на наличие такого пользователя
    if (candidate != null) {
        res.status(409).json({
            message: 'Сотрудник с таким именем уже существует'
        })
    } else {
        const employee = new Employee({
            position: req.body.position,
            name: req.body.name,
            head: req.body.head,
            location: req.body.location,
            tel: req.body.tel,
            intel: req.body.intel,
            birthday: req.body.birthday
        })
        try {
            await employee.save()
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json(employee)
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
    const candidate = await Employee.findOne({_id: req.params.id})
    if (candidate) {
        try {
            await Employee.findOneAndDelete({_id: req.params.id})
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json({
                message: `Сотрудник с id ${req.params.id} удален`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Сотрудника с id ${req.params.id} не существует!`
        })
    }
}

module.exports.update = async function (req, res) {
    const candidate = await Employee.findOne({_id: req.params.id})
    if (candidate) {
        try {
            Employee.updateOne(
                {_id: req.params.id},
                {
                    $set: {
                        "position": req.body.position,
                        "name": req.body.name,
                        "head": req.body.head,
                        "location": req.body.location,
                        "tel": req.body.tel,
                        "intel": req.body.intel,
                        "birthday": req.body.birthday
                    }
                },
                function (err, result) {
                    console.log(result);
                }
            );
            res.status(201).json({
                message: `Сотрудник с id ${req.params.id} изменен`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Сотрудника с id ${req.params.id} не существует!`
        })
    }
}