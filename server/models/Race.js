const mongoose = require('mongoose');
const { Schema } = mongoose;

const raceSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ['Elf', 'Human', 'Dwarf', 'Half-Orc', 'Half-Elf', 'Drow', 'Halfling', 'Tiefling', 'Dragonborn', 'High Elf', 'Forest Gnome', 'Rock Gnome',
            'Mountain Dwarf',  'Orc', 'Stout Halfling', 'Hill Dwarf', 'Wood Elf', 'Lightfoot Halfling',
    ]
  },
  attributes: {
    str: {
        type: Number,
        strModifier: {type: Number},
        required: true 
    },
    dex: {
        type: Number,
        dexModifier: {type: Number},
        required: true 
    },
    con: {
        type: Number,
        conModifier: {type: Number},
        required: true 
    },
    int: {
        type: Number,
        intModifier: {type: Number},
        required: true 
    },
    wis: {
        type: Number,
        wisModifier: {type: Number},
        required: true 
    },
    cha: {
        type: Number,
        chaModifier: {type: Number},
        required: true 
    }
}
});

const racialAbilityIncreases = {
    'Mountain Dwarf': { str: 2 },
    'Half-Orc': { str: 2, con: 1 },
    'Dragonborn': { str: 2, cha: 1 },
    'Human': { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    'Elf': { dex: 2 },
    'Forest Gnome': { dex: 1, int: 2 },
    'Halfling': { dex: 2 },
    'Dwarf': { con: 2 },
    'Rock Gnome': { con: 1, int: 2 },
    'High Elf': { int: 1 },
    'Tiefling': { int: 1, cha: 2 },
    'Hill Dwarf': { wis: 1 },
    'Wood Elf': { wis: 1 },
    'Half-Elf': { cha: 2 },
    'Drow': { cha: 1 },
    'Lightfoot Halfling': { cha: 1 },
    'Stout Halfling': { con: 1 }
  };

  Object.keys(racialAbilityIncreases).forEach(raceName => {
    const increases = racialAbilityIncreases[raceName];
    raceSchema.pre('save', function (next) {
        if(this.name === raceName) {
            Object.keys(increase).forEach(attr => {
                this.attributes[attr] = (this.attributes[attr] || 0) + increases[attr];
            });
        }
        next();
    });
  });


const RaceModel = mongoose.model('Race', raceSchema);
module.exports = RaceModel;
