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
        type: Schema.Types.ObjectId,
        ref: 'Class' ,
        required: true
    },
    race: {
        type: Schema.Types.ObjectId,
        ref: 'Race',
        required: true
    },
    level_info: {
        level: {type: Number, required: true},
        points: {type: Number, required: true}
    },
    attributes: {
        str: {
          type: Number,
          required: true,
          default: 0
        },
        dex: {
          type: Number,
          required: true,
          default: 0
        },
        con: {
          type: Number,
          required: true,
          default: 0
        },
        int: {
          type: Number,
          required: true,
          default: 0
        },
        wis: {
          type: Number,
          required: true,
          default: 0
        },
        cha: {
          type: Number,
          required: true,
          default: 0
        }
      },
      armorClass: {
        type: Number,
        default: 10
      },
      initiative: {
        type: Number,
        default: 0
      },
      health: {
        hitDice: { type: Number, default: 0 },
        max_hit_points: { type: Number, default: 0 },
        current_hit_points: { type: Number, default: 0 },
        temporary_hit_points: { type: Number, default: 0 }
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
        lvlOne: { type: Number, default: 0 },
        lvlTwo: { type: Number, default: 0 },
        lvlThree: { type: Number, default: 0 },
        lvlFour: { type: Number, default: 0 },
        lvlFive: { type: Number, default: 0 }
      },
      spellbook: {
        lvlOneSpells: { type: [String], default: [] },
        lvlTwoSpells: { type: [String], default: [] },
        lvlThreeSpells: { type: [String], default: [] },
        lvlFourSpells: { type: [String], default: [] },
        lvlFiveSpells: { type: [String], default: [] },
        lvlSixSpells: { type: [String], default: [] },
        lvlSevenSpells: { type: [String], default: [] },
        lvlEightSpells: { type: [String], default: [] },
        lvlNineSpells: { type: [String], default: [] }
      },
      additional_features: {
        race: { type: String, default: '' },
        background: { type: String, default: '' },
        alignment: { type: String, default: '' },
        personality: { type: String, default: '' },
        ideals: { type: String, default: '' },
        bonds: { type: String, default: '' },
        flaws: { type: String, default: '' },
        features_traits: { type: String, default: '' },
        age: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
        weight: { type: Number, default: 0 },
        eyes: { type: String, default: '' },
        hair: { type: String, default: '' }
      }
    });

const CharacterModel = mongoose.model('Character', characterSchema);
module.exports = CharacterModel;