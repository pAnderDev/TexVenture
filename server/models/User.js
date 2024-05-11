const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    passowrd: String
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;