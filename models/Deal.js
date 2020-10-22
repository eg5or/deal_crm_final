const {Schema, Types, model} = require('mongoose')

const dealSchema = new Schema({
    date: {type: Date, required: true},
    client: {type: String, required: true},
    responsibility: { type: Types.ObjectId, ref: 'Employee' },
    dealStatus: {
        approved: {type: Boolean, default: false},
        providerPaid: {type: Boolean, default: false},
        delivered: {type: Boolean, default: false},
        clientPaid: {type: Boolean, default: false},
        docSigned: {type: Boolean, default: false},
        docCollected: {type: Boolean, default: false},
        dealDone: {type: Boolean, default: false}
    },
    clientInvoices: [],
    providerInvoices: [],
    allDocs: [],
    delta: {type: Number, default: ''},
    drivers: [],
    forwarders: [],
    taxes: [],
    gifts: [],
    address: {type: String, default: ''},
    commentManager: {type: String, default: ''},
    commentHead: {type: String, default: ''},
    dealNumber: {type: Number, default: ''}

})

module.exports = model('Deal', dealSchema)
