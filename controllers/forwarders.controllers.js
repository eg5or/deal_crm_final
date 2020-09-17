module.exports.getAll = function (req, res) {
    res.status(200).json({
        message: 'getAll forwarders OK'
    })
}

module.exports.create = function (req, res) {
    res.status(200).json({
        message: 'add forwarders OK'
    })
}

module.exports.getById = function (req, res) {
    res.status(200).json({
        message: 'getById forwarders OK'
    })
}

module.exports.remove = function (req, res) {
    res.status(200).json({
        message: 'remove forwarders OK'
    })
}

module.exports.update = function (req, res) {
    res.status(200).json({
        message: 'update forwarders OK'
    })
}