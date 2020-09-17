const {Schema, model} = require('mongoose')

const dealSchema = new Schema({
    _id: Schema.Types.ObjectId,
    date: {type: Date, required: true},
    client: {type: String, required: true},
    responsibility: {
        type: Schema.Types.ObjectId,
        ref: 'Manager'
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
        sumClientInvoices: {type: Number, required: true},
        providerInvoices: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProviderInvoice'
            }
        ],
        sumProviderInvoices: {type: Number, required: true},
        allDocs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'AllDocs'
            }
        ],
        delta: {type: Number, required: true}
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
    commentManager: {type: String, required: true},
    commentHead: {type: String, required: true}

})

module.exports = model('Deal', dealSchema)
