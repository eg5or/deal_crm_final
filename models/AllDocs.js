const {Schema, model} = require('mongoose')

const AllDocsSchema = new Schema({
    _id: Schema.Types.ObjectId,
    company: {type: String, required: true},
    fileUrl: {type: String},
    sum: {type: Number, required: true}
})


module.exports = model('AllDocs', AllDocsSchema)