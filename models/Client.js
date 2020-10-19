const {Schema, model} = require('mongoose')

const ClientSchema = new Schema({
    type: {type: String, required: true},
    name: {type: String, required: true},
    manager: {type: String, required: true}
})


module.exports = model('Client', ClientSchema)