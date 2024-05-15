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
});
const RaceModel = mongoose.model('Race', raceSchema);
module.exports = RaceModel;
