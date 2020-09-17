module.exports.getAll = function (req, res) {
    res.status(200).json({
        message: 'getAll drivers OK'
    })
}

module.exports.create = function (req, res) {
    res.status(200).json({
        message: 'add drivers OK'
    })
}

module.exports.getById = function (req, res) {
    res.status(200).json({
        message: 'getById drivers OK'
    })
}

module.exports.remove = function (req, res) {
    res.status(200).json({
        message: 'remove drivers OK'
    })
}

module.exports.update = function (req, res) {
    res.status(200).json({
        message: 'update drivers OK'
    })
}