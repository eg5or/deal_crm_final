const {Schema, model} = require('mongoose')

const ReleaseSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    items: [],
    version: {type: String, required: true},
    date: {type: String, required: true}
})


module.exports = model('Release', ReleaseSchema)