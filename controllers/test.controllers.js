module.exports.test = function (req, res) {
    res.status(200).json({
        driver: {
            name: req.body.name,
            sum: req.body.sum
        }

    })
}