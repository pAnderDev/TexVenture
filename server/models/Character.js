const mongoose = require('mongoose')
const { Schema } = mongoose

const characterSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    classType: {
        type: String, 
        required: true
    },
    level: {
        type: Number,
        required: true,
        points: {type: Number}
    },
    attributes: {
        str: {

        },
        dex: {

        },
        con: {

        },
        int: {

        },
        wis: {

        },
        cha: {

        }
    },
    armorClass: {
        type: Number, default: 10
    },
    initiative: {
        type: Number
    },
    health: {
        hitDice: {type: Number},
        max_hit_points: {type: Number, default: hitDice},
        current_hit_points: {type: Number, default: hitDice},
        temporary_hit_points: {type: Number}
    },
    current_location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    spell_slots: {
        
    }
})