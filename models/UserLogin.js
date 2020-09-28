const {Schema, model} = require('mongoose')

const UserLoginSchema = new Schema({
    id: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    token: {type: String, required: true, unique: true},
})


module.exports = model('UserLogin', UserLoginSchema)