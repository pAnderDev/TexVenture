const mongoose = require('mongoose');
const { Schema } = mongoose;

const backgroundSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: [
      'Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk Hero', 'Guild Artisan', 'Hermit',
      'Noble', 'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin'
    ]
  },
  description: {
    type: String,
    required: true
  }
});

const BackgroundModel = mongoose.model('Backgrounds', backgroundSchema);
module.exports = BackgroundModel;