const {Schema, model} = require('mongoose')

const dealSchema = new Schema({
    date: {type: Date, required: true},
    client: {type: String, required: true},
    responsibility: {
        name: {type: String, required: true},
    },
    dealStatus: {
        approved: {type: Boolean, default: false},
        providerPaid: {type: Boolean, default: false},
        delivered: {type: Boolean, default: false},
        clientPaid: {type: Boolean, default: false},
        docSigned: {type: Boolean, default: false},
        docCollected: {type: Boolean, default: false}
    },
    docsFiles: {
        clientInvoices: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ClientInvoice'
            }
        ],
        providerInvoices: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProviderInvoice'
            }
        ],
        allDocs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'AllDocs'
            }
        ],
        delta: {type: Number, default: ''}
    },
    deliver: {
        drivers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Driver'
            }
        ],
        forwarders: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Forwarder'
            }
        ]
    },
    commentManager: {type: String, default: ''},
    commentHead: {type: String, default: ''}

})

module.exports = model('Deal', dealSchema)
