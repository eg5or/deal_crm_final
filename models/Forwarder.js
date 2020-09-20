const {Schema, model} = require('mongoose')

const ForwarderSchema = new Schema({
    name: {type: String, required: true},
    tel: {type: String, required: true}
})


module.exports = model('Forwarder', ForwarderSchema)