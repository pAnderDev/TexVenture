require('dotenv').config();
const mongoose = require('mongoose');
const Race = require('../models/Race');

const { SEED_AUTH_KEY } = process.env;

if (process.argv[2] !== SEED_AUTH_KEY) {
  console.error('Unauthorized access');
  process.exit(1);
}

const races = [
  {
    name: 'Elf',
  },
  {
    name: 'Human',
  },
  {
    name: 'Dwarf',
  },
  {
    name: 'Orc',
  },
  {
    name: 'Half-Elf',
  },
  {
    name: 'Drow',
  },
  {
    name: 'Halfling',
  },
  {
    name: 'Dragonborn',
  },
  {
    name: 'Forest Gnome',
  },
  {
    name: 'Rock Gnome',
  },
  {
    name: 'High Elf',
  },
  {
    name: 'Tiefling',
  },
  {
    name: 'Mountain Dwarf',
  },
  {
    name: 'Half-Orc',
  },
  {
    name: 'Stout Halfling',
  },
  {
    name: 'Hill Dwarf',
  },
  {
    name: 'Wood Elf',
  },
  {
    name: 'Lightfoot Halfling',
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(() => Race.insertMany(races))
  .then(() => {
    console.log('Races added');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
