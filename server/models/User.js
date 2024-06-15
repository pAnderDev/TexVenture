const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {type: String, required: true},
    date_created: Date,
    last_login: Date,
    selectedCharacter: {
        type: Schema.Types.ObjectId,
        ref: 'Character',
        required: true,
        default: null}

})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;