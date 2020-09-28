const multer = require('multer')
const path = require('path')

// Загрузка файлов MULTER

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// определение фильтра
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
        const err = new Error('Extension')
        err.code = 'EXTENSION'
        return cb(err)
    }
    cb(null, true)
}

const upload = multer({
    storage: storageConfig,
    limits: {fileSize: 2 * 1024 * 1024},
    fileFilter: fileFilter
}).single('filedata')

// ---------------------------

module.exports.getAll = function (req, res) {
    res.status(200).json({
        message: 'getAll deals OK'
    })
}

module.exports.create = function (req, res) {
    res.status(200).json({
        message: 'add deals OK'
    })
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

module.exports.upload = function (req, res) {
    upload(req, res, function (err) {
        let error = ''
        let ok = true
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                error = 'Картинка не более 2 Мб'
            }
            if (err.code === 'EXTENSION') {
                error = 'Только jpeg и png'
            }
            ok = false
        }
        res.json({
            ok: ok,
            error
        })
        console.log(err);
        console.log(req.headers);
        console.log(req.file);

    })


}