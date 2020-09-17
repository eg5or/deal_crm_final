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