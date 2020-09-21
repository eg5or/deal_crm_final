const {Schema, model} = require('mongoose')

const CompanySchema = new Schema({
    type: {type: String, required: true},
    name: {type: String, required: true},
    manager: {type: String, required: true}
})


module.exports = model('Company', CompanySchema)