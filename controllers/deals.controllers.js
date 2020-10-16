const fs = require('fs')
const multer = require('multer')
const path = require('path')
const Deal = require('../models/Deal')
const Counter = require('../models/Counter')
const Driver = require('../models/Driver')
const Forwarder = require('../models/Forwarder')
const errorHandler = require('../utils/errorHandler')

// Загрузка файлов MULTER
// настройка:
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'client/public/uploads'); // путь для загружаемых файлов
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
        /*if (path.extname(file) === '.pdf') {
            const options = {

            };
            const specimen1 = "./files/specimen1.pdf";

            const outputDirectory = "./output/from-file-to-image";

            rimraf.sync(outputDirectory);

            mkdirsSync(outputDirectory);

            const baseOptions = {
                density: 100,
                saveFilename: `${path.basename(file, path.extname(file))}`,
                format: "png",
                width: 600,
                height: 600,
                savePath: outputDirectory
            };

            const convert = fromPath(specimen1, baseOptions);

            return convert(1);

            /!*!// ОПЦИИ конвертирования
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
*!/
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
                                        fileUrl: `${path.basename(file, '.pdf')}-1.jpg`,
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
                                        fileUrl: `${path.basename(file, '.pdf')}-1.jpg`,
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
                                        fileUrl: `${path.basename(file, '.pdf')}-1.jpg`,
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
        } else {*/
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
                                        fileUrl: `${path.basename(file)}`,
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
                                        fileUrl: `${path.basename(file)}`,
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
                                        fileUrl: `${path.basename(file)}`,
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

    await Counter.findOneAndUpdate(
        {dealNumber: 'dealnumber'},
        {$inc: {seq: 1}},
        {new: true})
    await Counter.findOne({dealNumber: 'dealnumber'},
        async function (error, ret) {
            const deal = new Deal({
                date: req.body.date,
                client: req.body.client,
                responsibility: req.body.id,
                dealNumber: ret.seq
            })
            try {
                await deal.save()
                // Передаем статус 201 Created - что-то создано в БД
                res.status(201).json(deal)
            } catch (e) {
                // Обработать ошибку
                errorHandler(res, e)
            }
        })
} // готово


module.exports.getAll = async function (req, res) {
    try {
        const perPage = 5
        const page = Math.max(0, req.query.page)
        await Deal.find({})
            .sort({date: -1})
            .limit(perPage)
            .skip(perPage * page - perPage)
            .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
            .exec(function (err, result) {
                Deal.find({}).count().exec(function (err, count) {
                    res.status(200).json({
                        result: result,
                        page: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.getAllDealsDone = async function (req, res) {
    try {
        const perPage = 5
        const page = Math.max(0, req.query.page)
        await Deal.find({"dealStatus.dealDone": true})
            .sort({date: -1})
            .limit(perPage)
            .skip(perPage * page - perPage)
            .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
            .exec(function (err, result) {
                Deal.find({"dealStatus.dealDone": true}).count().exec(function (err, count) {
                    res.status(200).json({
                        result: result,
                        page: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.getAllManagerDeals = async function (req, res) {
    try {
        const perPage = 5
        const page = Math.max(0, req.query.page)
        await Deal.find({"responsibility": req.query.id})
            .sort({date: -1})
            .limit(perPage)
            .skip(perPage * page - perPage)
            .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
            .exec(function (err, result) {
                Deal.find({"responsibility": req.query.id}).count().exec(function (err, count) {
                    res.status(200).json({
                        result: result,
                        page: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
} // готово

module.exports.filterDealsByStatusManagers = async function (req, res) {
    const {id, status, bool} = req.query
    try {
        const perPage = 5
        const page = Math.max(0, req.query.page)
        switch (status) {
            case 'approved':
                await Deal.find({
                    "responsibility": id,
                    "dealStatus.approved": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "responsibility": id,
                            "dealStatus.approved": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
                break
            case 'providerPaid':
                await Deal.find({
                    "responsibility": id,
                    "dealStatus.providerPaid": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "responsibility": id,
                            "dealStatus.providerPaid": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
                break
            case 'delivered':
                await Deal.find({
                    "responsibility": id,
                    "dealStatus.delivered": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "responsibility": id,
                            "dealStatus.delivered": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
                break
            case 'clientPaid':
                await Deal.find({
                    "responsibility": id,
                    "dealStatus.clientPaid": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "responsibility": id,
                            "dealStatus.clientPaid": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
                break
            case 'docSigned':
                await Deal.find({
                    "responsibility": id,
                    "dealStatus.docSigned": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "responsibility": id,
                            "dealStatus.docSigned": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
                break
            case 'docCollected':
                await Deal.find({
                    "responsibility": id,
                    "dealStatus.docCollected": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "responsibility": id,
                            "dealStatus.docCollected": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
                break
            case 'dealDone':
                await Deal.find({
                    "responsibility": id,
                    "dealStatus.dealDone": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "responsibility": id,
                            "dealStatus.dealDone": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
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
        const perPage = 5
        const page = Math.max(0, req.query.page)
        switch (status) {
            case 'approved':
                await Deal.find({
                    "dealStatus.approved": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "dealStatus.approved": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
                break
            case 'providerPaid':
                await Deal.find({
                    "dealStatus.providerPaid": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "dealStatus.providerPaid": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
                break
            case 'delivered':
                await Deal.find({
                    "dealStatus.delivered": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "dealStatus.delivered": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
                break
            case 'clientPaid':
                await Deal.find({
                    "dealStatus.clientPaid": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "dealStatus.clientPaid": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
                break
            case 'docSigned':
                await Deal.find({
                    "dealStatus.docSigned": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "dealStatus.docSigned": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
                break
            case 'docCollected':
                await Deal.find({
                    "dealStatus.docCollected": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "dealStatus.docCollected": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
                break
            case 'dealDone':
                await Deal.find({
                    "dealStatus.dealDone": bool
                })
                    .sort({date: -1})
                    .limit(perPage)
                    .skip(perPage * page - perPage)
                    .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
                    .exec(function (err, result) {
                        Deal.find({
                            "dealStatus.dealDone": bool
                        }).count().exec(function (err, count) {
                            res.status(200).json({
                                result: result,
                                page: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
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
            "responsibility": req.query.id,
            "dealStatus.dealDone": false
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
            "responsibility": req.query.id,
            "dealStatus.delivered": false
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
        await Deal.find({_id: req.params.id})
            .populate('responsibility', ('-password -__v -birthday -head -intel -position -tel -email'))
            .exec(function (err, result) {
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

        switch (req.query.status) {
            case 'approved':
                const candidate1 = await Deal.findOne({_id: req.query.id},
                    function (error, result) {
                        res.status(200).json(result)
                    })
                if (candidate1.dealStatus.approved === true) {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.approved": false
                            }
                        })
                } else {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.approved": true
                            }
                        })
                }
                break
            case 'providerPaid':
                const candidate2 = await Deal.findOne({_id: req.query.id},
                    function (error, result) {
                        res.status(200).json(result)
                    })
                if (candidate2.dealStatus.providerPaid === true) {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.providerPaid": false
                            }
                        })
                } else {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.providerPaid": true
                            }
                        })
                }
                break
            case 'delivered':
                const candidate3 = await Deal.findOne({_id: req.query.id},
                    function (error, result) {
                        res.status(200).json(result)
                    })
                if (candidate3.dealStatus.delivered === true) {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.delivered": false
                            }
                        })
                } else {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.delivered": true
                            }
                        })
                }
                break
            case 'clientPaid':
                const candidate4 = await Deal.findOne({_id: req.query.id},
                    function (error, result) {
                        res.status(200).json(result)
                    })
                if (candidate4.dealStatus.clientPaid === true) {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.clientPaid": false
                            }
                        })
                } else {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.clientPaid": true
                            }
                        })
                }
                break
            case 'docSigned':
                const candidate5 = await Deal.findOne({_id: req.query.id},
                    function (error, result) {
                        res.status(200).json(result)
                    })
                if (candidate5.dealStatus.docSigned === true) {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.docSigned": false
                            }
                        })
                } else {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.docSigned": true
                            }
                        })
                }
                break
            case 'docCollected':
                const candidate6 = await Deal.findOne({_id: req.query.id},
                    function (error, result) {
                        res.status(200).json(result)
                    })
                if (candidate6.dealStatus.docCollected === true) {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.docCollected": false
                            }
                        })
                } else {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.docCollected": true
                            }
                        })
                }
                break
            case 'dealDone':
                const candidate7 = await Deal.findOne({_id: req.query.id},
                    function (error, result) {
                        res.status(200).json(result)
                    })
                if (candidate7.dealStatus.dealDone === true) {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.dealDone": false
                            }
                        })
                } else {
                    await Deal.update(
                        {_id: req.query.id},
                        {
                            $set: {
                                "dealStatus.dealDone": true
                            }
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

