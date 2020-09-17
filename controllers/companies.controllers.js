module.exports.getAll = function (req, res) {
    res.status(200).json({
        message: 'getAll companies OK'
    })
}

module.exports.create = function (req, res) {
    res.status(200).json({
        message: 'add company OK'
    })
}

module.exports.getById = function (req, res) {
    res.status(200).json({
        message: 'getById companies OK'
    })
}

module.exports.remove = function (req, res) {
    res.status(200).json({
        message: 'remove companies OK'
    })
}

module.exports.update = function (req, res) {
    res.status(200).json({
        message: 'update companies OK'
    })
}