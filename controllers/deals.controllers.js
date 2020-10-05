const fs = require('fs')
const multer = require('multer')
const path = require('path')
const pdf = require('pdf-poppler');
const Deal = require('../models/Deal')
const Driver = require('../models/Driver')
const Forwarder = require('../models/Forwarder')
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

            try {
                console.log('Обновление сделки');
                switch (req.query.type) {
                    case 'CI':
                        await Deal.updateOne(
                            {_id: req.query.id},
                            {
                                $addToSet: {
                                    "clientInvoices": {
                                        company: req.query.company,
                                        fileUrl: `/${path.dirname(file)}/${path.basename(file, '.pdf')}-1.jpg`,
                                        sum: req.query.sum,
                                        typeFile: req.query.type
                                    }
                                }
                            },
                            {new: true, upsert: true},
                            function (err, result) {
                                console.log('ошибка ----Обновление сделки------- ', err, result);
                            }
                        );
                        break
                    case 'PI':
                        await Deal.updateOne(
                            {_id: req.query.id},
                            {
                                $addToSet: {
                                    "providerInvoices": {
                                        company: req.query.company,
                                        fileUrl: `/${path.dirname(file)}/${path.basename(file, '.pdf')}-1.jpg`,
                                        sum: req.query.sum,
                                        typeFile: req.query.type
                                    }
                                }
                            },
                            {new: true, upsert: true},
                            function (err, result) {
                                console.log('ошибка ----Обновление сделки------- ', err, result);
                            }
                        );
                        break
                    case 'DOC':
                        await Deal.updateOne(
                            {_id: req.query.id},
                            {
                                $addToSet: {
                                    "allDocs": {
                                        company: req.query.company,
                                        fileUrl: `/${path.dirname(file)}/${path.basename(file, '.pdf')}-1.jpg`,
                                        sum: req.query.sum,
                                        typeFile: req.query.type
                                    }
                                }
                            },
                            {new: true, upsert: true},
                            function (err, result) {
                                console.log('ошибка ----Обновление сделки------- ', err, result);
                            }
                        );
                        break
                }
            } catch (e) {
                // Обработать ошибку
                errorHandler(res, e)
                console.log('Ошибка ', e);
            }
        } else {
            try {
                console.log('Обновление сделки');
                switch (req.query.type) {
                    case 'CI':
                        await Deal.updateOne(
                            {_id: req.query.id},
                            {
                                $addToSet: {
                                    "clientInvoices": {
                                        company: req.query.company,
                                        fileUrl: req.file.path,
                                        sum: req.query.sum,
                                        typeFile: req.query.type
                                    }
                                }
                            },
                            {new: true, upsert: true},
                            function (err, result) {
                                console.log('ошибка ----Обновление сделки------- ', err, result);
                            }
                        );
                        break
                    case 'PI':
                        await Deal.updateOne(
                            {_id: req.query.id},
                            {
                                $addToSet: {
                                    "providerInvoices": {
                                        company: req.query.company,
                                        fileUrl: req.file.path,
                                        sum: req.query.sum,
                                        typeFile: req.query.type
                                    }
                                }
                            },
                            {new: true, upsert: true},
                            function (err, result) {
                                console.log('ошибка ----Обновление сделки------- ', err, result);
                            }
                        );
                        break
                    case 'DOC':
                        await Deal.updateOne(
                            {_id: req.query.id},
                            {
                                $addToSet: {
                                    "allDocs": {
                                        company: req.query.company,
                                        fileUrl: req.file.path,
                                        sum: req.query.sum,
                                        typeFile: req.query.type
                                    }
                                }
                            },
                            {new: true, upsert: true},
                            function (err, result) {
                                console.log('ошибка ----Обновление сделки------- ', err, result);
                            }
                        );
                        break
                }
            } catch (e) {
                // Обработать ошибку
                errorHandler(res, e)
                console.log('Ошибка ', e);
            }
        }
    })
} // готово

module.exports.deleteFile = async function (req, res) {
    try {
        console.log('Удаление записи из таблицы сделок');
        switch (req.query.type) {
            case 'CI':
                await Deal.updateOne(
                    {_id: req.query.id},
                    {
                        $pull: {
                            "clientInvoices": {
                                fileUrl: req.query.file
                            }
                        }
                    },
                    {multi: true},
                    function (err, result) {
                        res.status(200).json(result)
                        console.log(result)
                    }
                );
                /*fs.unlink(req.query.file, err => {
                    if (err) throw err
                    console.log(`Old file: ${req.query.file} Deleted`)
                })*/
                break
            case 'PI':
                await Deal.updateOne(
                    {_id: req.query.id},
                    {
                        $pull: {
                            "providerInvoices": {
                                fileUrl: req.query.file
                            }
                        }
                    },
                    {multi: true},
                    function (err, result) {
                        res.status(200).json(result)
                        console.log(result)
                    }
                );
                break
            case 'DOC':
                await Deal.updateOne(
                    {_id: req.query.id},
                    {
                        $pull: {
                            "allDocs": {
                                fileUrl: req.query.file
                            }
                        }
                    },
                    {multi: true},
                    function (err, result) {
                        res.status(200).json(result)
                        console.log(result)
                    }
                );
                break
        }
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
        console.log('Ошибка ', e);
    }
} // готово

module.exports.addDriverToDeal = async function (req, res) {
    try {
        const driver = await Driver.findOne({_id: req.body.driverId})
        await Deal.updateOne(
            {_id: req.body.id},
            {
                $addToSet: {
                    "drivers": {
                        driverName: driver.name,
                        tel: driver.tel,
                        auto: driver.auto,
                        sum: req.body.sum
                    }
                }
            },
            {new: true, upsert: true},
            function (error, result) {
                res.status(200).json(result)
            })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.deleteDriverFromDeal = async function (req, res) {
    try {
        await Deal.updateOne(
            {_id: req.query.id},
            {
                $pull: {
                    "drivers": {
                        driverName: req.query.name,
                        sum: +req.query.sum
                    }
                }
            },
            {multi: true},
            function (error, result) {
                res.status(200).json(result)
                console.log(result)
            })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.addForwarderToDeal = async function (req, res) {
    try {
        const forwarder = await Forwarder.findOne({_id: req.body.forwarderId})
        await Deal.updateOne(
            {_id: req.body.id},
            {
                $addToSet: {
                    "forwarders": {
                        forwarderName: forwarder.name,
                        tel: forwarder.tel,
                        sum: req.body.sum
                    }
                }
            },
            {new: true, upsert: true},
            function (error, result) {
                res.status(200).json(result)
            })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.deleteForwarderFromDeal = async function (req, res) {
    try {
        await Deal.updateOne(
            {_id: req.query.id},
            {
                $pull: {
                    "forwarders": {
                        forwarderName: req.query.name,
                        sum: +req.query.sum
                    }
                }
            },
            {multi: true},
            function (error, result) {
                res.status(200).json(result)
            })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.editCommentManager = async function (req, res) {
    try {
        await Deal.updateOne(
            {_id: req.body.id},
            {
                $set: {
                    "commentManager": req.body.text
                }
            },
            {new: true, upsert: true},
            function (error, result) {
                res.status(200).json(result)
            })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.editComment = async function (req, res) {
    if (req.body.text.length <= 165) {
        try {
            switch (req.body.type) {
                case 'CM':
                    await Deal.updateOne(
                        {_id: req.body.id},
                        {
                            $set: {
                                "commentManager": req.body.text
                            }
                        },
                        {new: true, upsert: true},
                        function (error, result) {
                            res.status(200).json(result)
                        })
                    break
                case 'CH':
                    await Deal.updateOne(
                        {_id: req.body.id},
                        {
                            $set: {
                                "commentHead": req.body.text
                            }
                        },
                        {new: true, upsert: true},
                        function (error, result) {
                            res.status(200).json(result)
                        })
                    break
            }
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    }

} // готово

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
} // готово

module.exports.getAll = async function (req, res) {
    try {
        await Deal.find({}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.getAllDealsDone = async function (req, res) {
    try {
        await Deal.find({"dealStatus.dealDone": true}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.getAllManagerDeals = async function (req, res) {
    try {
        await Deal.find({"responsibility.name": req.query.name}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.filterDealsByStatusManagers = async function (req, res) {
    const {name, status, bool} = req.query
    try {
        switch (status) {
            case 'approved':
                await Deal.find({
                    "responsibility.name": name,
                    "dealStatus.approved" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            case 'providerPaid':
                await Deal.find({
                    "responsibility.name": name,
                    "dealStatus.providerPaid" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            case 'delivered':
                await Deal.find({
                    "responsibility.name": name,
                    "dealStatus.delivered" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            case 'clientPaid':
                await Deal.find({
                    "responsibility.name": name,
                    "dealStatus.clientPaid" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            case 'docSigned':
                await Deal.find({
                    "responsibility.name": name,
                    "dealStatus.docSigned" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            case 'docCollected':
                await Deal.find({
                    "responsibility.name": name,
                    "dealStatus.docCollected" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            case 'dealDone':
                await Deal.find({
                    "responsibility.name": name,
                    "dealStatus.dealDone" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            default:
                break
        }
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.filterDealsByStatusAllManagers = async function (req, res) {
    const {status, bool} = req.query
    try {
        switch (status) {
            case 'approved':
                await Deal.find({
                    "dealStatus.approved" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            case 'providerPaid':
                await Deal.find({
                    "dealStatus.providerPaid" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            case 'delivered':
                await Deal.find({
                    "dealStatus.delivered" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            case 'clientPaid':
                await Deal.find({
                    "dealStatus.clientPaid" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            case 'docSigned':
                await Deal.find({
                    "dealStatus.docSigned" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            case 'docCollected':
                await Deal.find({
                    "dealStatus.docCollected" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            case 'dealDone':
                await Deal.find({
                    "dealStatus.dealDone" : bool
                }, function (error, result) {
                    res.status(200).json(result)
                })
                break
            default:
                break
        }
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.getCountManagersDealsNoDone = async function (req, res) {
    try {
        await Deal.countDocuments({
            "responsibility.name": req.query.name,
            "dealStatus.dealDone" : false
        }, function (error, result) {
            res.status(200).json({
                count: result
            })
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.getCountManagersDealsNoDelivered = async function (req, res) {
    try {
        await Deal.countDocuments({
            "responsibility.name": req.query.name,
            "dealStatus.delivered" : false
        }, function (error, result) {
            res.status(200).json({
                count: result
            })
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.getById = async function (req, res) {
    try {
        await Deal.find({_id: req.params.id}, function (error, result) {
            res.status(200).json(result)
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово но не нужно пока

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

module.exports.toggleStatus = async function (req, res) {
    try {
        const candidate = await Deal.findOne({_id: req.query.id})
        switch (req.query.status) {
            case 'approved':
                if (candidate.dealStatus.approved === true) {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.approved": false
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                } else {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.approved": true
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                }
                break
            case 'providerPaid':
                if (candidate.dealStatus.providerPaid === true) {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.providerPaid": false
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                } else {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.providerPaid": true
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                }
                break
            case 'delivered':
                if (candidate.dealStatus.delivered === true) {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.delivered": false
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                } else {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.delivered": true
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                }
                break
            case 'clientPaid':
                if (candidate.dealStatus.clientPaid === true) {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.clientPaid": false
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                } else {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.clientPaid": true
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                }
                break
            case 'docSigned':
                if (candidate.dealStatus.docSigned === true) {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.docSigned": false
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                } else {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.docSigned": true
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                }
                break
            case 'docCollected':
                if (candidate.dealStatus.docCollected === true) {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.docCollected": false
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                } else {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.docCollected": true
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                }
                break
            case 'dealDone':
                if (candidate.dealStatus.dealDone === true) {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.dealDone": false
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                } else {
                    await Deal.updateOne(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.dealDone": true
                            }
                        },
                        function (error, result) {
                            res.status(200).json(result)
                        })
                }
                break
            default:
                break
        }
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

