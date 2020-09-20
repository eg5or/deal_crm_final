const {Schema, model} = require('mongoose')

const DriverSchema = new Schema({
    name: {type: String, required: true},
    tel: {type: String, required: true},
    auto: {type: String, required: true}
})


module.exports = model('Driver', DriverSchema)