const mongoose = require('mongoose');
const { Schema } = mongoose;

const raceSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ['Dwarf', 'Elf','Halfling','Human','Dragonborn','Gnome','Half-Elf','Half-Orc','Tiefling',
    ]
  },
  bonuses: {
    strength: { type: Number, default: 0 },
    dexterity: { type: Number, default: 0 },
    constitution: { type: Number, default: 0 },
    intelligence: { type: Number, default: 0 },
    wisdom: { type: Number, default: 0 },
    charisma: { type: Number, default: 0 }
  }
});
const RaceModel = mongoose.model('Race', raceSchema);
module.exports = RaceModel;
