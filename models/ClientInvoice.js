const {Schema, model} = require('mongoose')

const clientInvoiceSchema = new Schema({
    deal: {type: String, required: true},
    company: {type: String, required: true},
    fileUrl: {type: String},
    sum: {type: Number, required: true},
    typeFile: {type: String, required: true}
})


module.exports = model('ClientInvoice', clientInvoiceSchema)

