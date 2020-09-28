const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')
const Employee = require('../models/Employee')
const UserLogin = require('../models/UserLogin')

module.exports.login = async function (req, res) {
    // получаем из req email и password
    const candidate = await Employee.findOne({email: req.body.email}) // проверяем на наличие такого пользователя

    if (candidate) {
        // Проверка пароля, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Генерация токена, пароли совпали
            const token = jwt.sign({  // первый параметр объект со свойствами которые будут нужны
                email: candidate.email,
                userId: candidate._id
            }, config.get('jwt'), {expiresIn: 60 * 60}) // 2ой параметр секретный ключ 3ий параметр время жизни токена

            res.status(200).json({
                token: `Bearer ${token}`,
                email: candidate.email,
                userId: candidate._id,
                name: candidate.name
            })

            // записываем пользователя в таблицу UserLogin, где находятся все залогиненые пользователи
            const userLogin = new UserLogin({
                id: candidate._id,
                email: candidate.email,
                token: `Bearer ${token}`
            })
            try {
                await userLogin.save()
                // Передаем статус 201 Created - что-то создано в БД
                res.status(201).json(userLogin)
            } catch (e) {
                // Обработать ошибку
                errorHandler(res, e)
            }

        } else {
            // Пароль не совпал, ошибка
            res.status(401).json({
                message: 'Неверный пароль'
            })
        }
    } else {
        // ПОльзователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден'
        })
    }
}

module.exports.authorized = async function (req, res) {
    // в req к нам приходит id ользователя, которого надо проверить на залогиненость
    // ищем совпадения в БД
    const candidate = await UserLogin.findOne({id: req.params.id})
    if (candidate) {
        // если пользователь найден
        try {
            // Передаем статус 200
            res.status(200).json({
                id: candidate.id,
                email: candidate.email,
                token: candidate.token,
                name: candidate.name
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Пользователя с id ${req.params.id} нет в списке!`
        })
    }
}

module.exports.logout = async function (req, res) {
    // в req к нам приходит id ользователя, которого надо удалить из таблицы
    // ищем совпадения в БД
    const candidate = await UserLogin.findOne({id: req.params.id})

    if (candidate) {
        // если пользователь найден то удаляем его из таблицы
        try {
            await UserLogin.findOneAndDelete({id: req.params.id})
            // Передаем статус 201 Created - что-то создано в БД
            res.status(201).json({
                message: `Пользователь с id ${req.params.id} удален из списка`
            })
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: `Пользователя с id ${req.params.id} нет в списке!`
        })
    }
}

module.exports.register = async function (req, res) {
    // в req к нам приходит email и password
    // ищем совпадения в БД
    const candidate = await Employee.findOne({email: req.body.email})

    if (candidate) {
        // Пользователь существует, нужно отдать ошибку
        // передаем статус 409 Conflict
        res.status(409).json({
            message: 'Такой e-mail уже занят. Попробуйте другой.'
        })
    } else {
        // Нужно создать пользователя
        // зашифровываем пароль
        const salt = bcrypt.genSaltSync(10) // доп безопасность
        const password = req.body.password
        const employee = new Employee({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt) // добавляем зашифрованный пароль
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