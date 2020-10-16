const {Schema, model} = require('mongoose')

const NotificationSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'Employee' },
    recipients: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
    deal: { type: Schema.Types.ObjectId, ref: 'Deal' },
    dt: {type: Date, default: Date.now},
    message: {type: String},
    read: {type: Boolean, default: false}
})


module.exports = model('Notification', NotificationSchema)