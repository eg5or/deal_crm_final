const {Schema, model} = require('mongoose')

const CompanySchema = new Schema({
    name: {type: String, required: true},
    bill: {type: String, required: true},
    tax: {type: Number, required: true}
})


module.exports = model('Company', CompanySchema)