const fs = require('fs')
const multer = require('multer')
const path = require('path')
const pdf = require('pdf-poppler');
const Deal = require('../models/Deal')
const ClientInvoice = require('../models/ClientInvoice')
const errorHandler = require('../utils/errorHandler')

// Загрузка файлов MULTER
// настройка:
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // путь для загружаемых файлов
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // устанавливаем новое имя файлу
    }
});

// определяем фильтр
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg'
        && ext !== '.jpeg'
        && ext !== '.png'
        && ext !== '.pdf') {
        const err = new Error('Extension') // создаем новую ошибку
        err.code = 'EXTENSION' // ставим код ошибки для неправильного расширения файла
        return cb(err)
    }
    cb(null, true)
}

const upload = multer({
    storage: storageConfig,
    limits: {fileSize: 2 * 1024 * 1024}, // ограничение размера загружаемого файла
    fileFilter: fileFilter
}).single('filedata')

// ---------------------------

module.exports.upload = function (req, res) {
    upload(req, res, async function (err) {
        let error = ''
        let ok = true
        // проверка на ошибки
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                error = 'Картинка не более 2 Мб'
            }
            if (err.code === 'EXTENSION') {
                error = 'Только jpeg, png или pdf'
            }
            ok = false
        }
        // отправляем результат проверки на фронт
        res.json({
            ok: ok,
            error
        })

        // записываем путь загруженного файла
        let file = req.file.path

        // ЛОГИ на серваке
        /*console.log(err);
        console.log(req.headers);
        console.log(req.file.path);*/

        // проверяем тип загруженного файла
        // если PDF то отправляем в конвертер
        if (path.extname(file) === '.pdf') {
            // ОПЦИИ конвертирования
            let opts = {
                format: 'jpeg',
                out_dir: path.dirname(file),
                out_prefix: path.basename(file, path.extname(file)),
                page: 1
            }
            // процесс конвертации
            pdf.convert(file, opts)
                .then(res => {
                    console.log(`Конвертация завершилась успешно.`);
                    // удаляем входной файл
                    fs.unlink(file, err => {
                        if (err) throw err
                        console.log(`Old file: ${file} Deleted`)
                    })
                })
                .catch(error => {
                    console.error(error);
                })
            const clientInvoice = new ClientInvoice({
                deal: req.query.id,
                company: req.query.company,
                fileUrl: `/${path.dirname(file)}/${path.basename(file, '.pdf')}-1.jpg`,
                sum: req.query.sum,
                typeFile: req.query.type
            })
            try {
                await clientInvoice.save()
                // Передаем статус 201 Created - что-то создано в БД
                res.status(201).json(clientInvoice)
            } catch (e) {
                // Обработать ошибку
                errorHandler(res, e)
            }

        } else {
            const clientInvoice = new ClientInvoice({
                deal: req.query.id,
                company: req.query.company,
                fileUrl: req.file.path,
                sum: req.query.sum,
                typeFile: req.query.type
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

    })
}

module.exports.getAll = async function (req, res) {
    try {
        await Deal.find({}, function (error, result) {
            res.status(200).json(result)
            console.log(typeof result[0].date)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const deal = new Deal({
        date: req.body.date,
        client: req.body.client,
        responsibility: {
            name: req.body.responsibility.name
        }
    })
    try {
        await deal.save()
        // Передаем статус 201 Created - что-то создано в БД
        res.status(201).json(deal)
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.getById = function (req, res) {
    res.status(200).json({
        message: 'getById deals OK'
    })
}

module.exports.remove = function (req, res) {
    res.status(200).json({
        message: 'remove deals OK'
    })
}

module.exports.update = function (req, res) {
    res.status(200).json({
        message: 'update deals OK'
    })
}

