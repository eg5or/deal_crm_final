const {Schema, model} = require('mongoose')

const DriverSchema = new Schema({
    _id: Schema.Types.ObjectId,
    driverName: {type: String, required: true},
    tel: {type: String, required: true},
    auto: {type: String, required: true}
})


module.exports = model('Driver', DriverSchema)