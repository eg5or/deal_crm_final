const {Schema, model} = require('mongoose')

const ForwarderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    forwarderName: {type: String, required: true},
    tel: {type: String, required: true}
})


module.exports = model('Forwarder', ForwarderSchema)