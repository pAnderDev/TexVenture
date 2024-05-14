const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: [
      'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 
      'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'
    ]
  },
  description: {
    type: String,
    required: true
  },
  hit_die: {
    type: String,
    required: true
  },
  primary_ability: {
    type: String,
    required: true
  },
  saving_throw_proficiencies: {
    type: [String],
    required: true
  },
  armor_weapon_proficiencies: {
    type: [String],
    required: true
  },
  spells: {
    lvlOneSpells: { type: [String], default: [] },
    lvlTwoSpells: { type: [String], default: [] },
    lvlThreeSpells: { type: [String], default: [] },
    lvlFourSpells: { type: [String], default: [] },
    lvlFiveSpells: { type: [String], default: [] }
  }
});

const ClassModel = mongoose.model('Class', classSchema);
module.exports = ClassModel;
