const {Schema, Types, model} = require('mongoose')

const clientInvoiceSchema = new Schema({
    deal: { type: Types.ObjectId, ref: 'Deal' },
    company: {type: String, required: true},
    fileUrl: {type: String},
    sum: {type: Number, required: true},
    typeFile: {type: String, required: true}
})


module.exports = model('ClientInvoice', clientInvoiceSchema)

