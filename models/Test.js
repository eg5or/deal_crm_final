const {Schema, model, Types} = require('mongoose')


const TestSchema = new Schema({
    _id: Types.ObjectId,
    name: {type: String, required: true},
    sum: {type: Number, required: true}
})


module.exports = model('Test', TestSchema)