const {Schema, model} = require('mongoose')

const employeeSchema = new Schema({
    position: {type: String},
    positionTrue: {type: String},
    name: {type: String},
    head: { type: Schema.Types.ObjectId, ref: 'Employee' },
    location: {type: String},
    tel: {type: String},
    intel: {type: String},
    birthday: {type: String},
    avatar: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})


module.exports = model('Employee', employeeSchema)