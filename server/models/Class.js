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
  }
});

const ClassModel = mongoose.model('Class', classSchema);
module.exports = ClassModel;
