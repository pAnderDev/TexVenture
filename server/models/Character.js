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
    }, 
    level: {
        type: Number,
        required: true,
        default: 1
    },
    stats: {
        strength: { type: Number, required: true, default: 8 },
        dexterity: { type: Number, required: true, default: 8 },
        constitution: { type: Number, required: true, default: 8 },
        intelligence: { type: Number, required: true, default: 8 },
        wisdom: { type: Number, required: true, default: 8 },
        charisma: { type: Number, required: true, default: 8 }
    },
    inventory: [{
        item: { type: String },
        quantity: { type: Number, default: 1 }
    }],
    abilities: [{
        name: { type: String },
        description: { type: String }
    }],
    background: {
        type: String,
        ref: 'Backgrounds',
        required: true
    },
    experience: {
        type: Number,
        required: true,
        default: 0
    },
    hitPoints: {
        type: Number,
        required: true,
        default: 10
    },
    spellSlots: {
        type: Number
    }
    });

const CharacterModel = mongoose.model('Character', characterSchema);
module.exports = CharacterModel;