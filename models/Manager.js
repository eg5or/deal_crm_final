const {Schema, model} = require('mongoose')

const managerSchema = new Schema({
    name: {type: String, required: true},
    head: {type: String, required: true},
    tel: {type: String, required: true},
})


module.exports = model('Manager', managerSchema)