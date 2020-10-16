const {Schema, Types, model} = require('mongoose')

const counterSchema = new Schema({
    dealNumber: String,
    seq: Number

})

module.exports = model('Counter', counterSchema)
