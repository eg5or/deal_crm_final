const {Schema, model} = require('mongoose')

const employeeSchema = new Schema({
    position: {type: String, required: true},
    name: {type: String, required: true, unique: true},
    head: {type: String, required: true},
    location: {type: String, required: true},
    tel: {type: String, required: true},
    intel: {type: String, required: true},
    birthday: {type: String, required: true},
})


module.exports = model('Employee', employeeSchema)