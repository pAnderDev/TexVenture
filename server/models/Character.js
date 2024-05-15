const mongoose = require('mongoose')
const { Schema } = mongoose

const characterSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        ref: 'Class' ,
        required: true
    },
    race: {
        type: String,
        ref: 'Race',
        required: true
    }
    });

const CharacterModel = mongoose.model('Character', characterSchema);
module.exports = CharacterModel;