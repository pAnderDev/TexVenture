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
    attributes: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 0 }
  },
  {
    name: 'Human',
    attributes: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 }
  },
  {
    name: 'Dwarf',
    attributes: { str: 0, dex: 0, con: 2, int: 0, wis: 0, cha: 0 }
  },
  {
    name: 'Orc',
    attributes: { str: 2, dex: 0, con: 1, int: 0, wis: 0, cha: 0 }
  },
  {
    name: 'Half-Elf',
    attributes: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 2 }
  },
  {
    name: 'Drow',
    attributes: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 1 }
  },
  {
    name: 'Halfling',
    attributes: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 0 }
  },
  {
    name: 'Dragonborn',
    attributes: { str: 2, dex: 0, con: 0, int: 0, wis: 0, cha: 1 }
  },
  {
    name: 'Forest Gnome',
    attributes: { str: 0, dex: 1, con: 0, int: 2, wis: 0, cha: 0 }
  },
  {
    name: 'Rock Gnome',
    attributes: { str: 0, dex: 0, con: 1, int: 2, wis: 0, cha: 0 }
  },
  {
    name: 'High Elf',
    attributes: { str: 0, dex: 2, con: 0, int: 1, wis: 0, cha: 0 }
  },
  {
    name: 'Tiefling',
    attributes: { str: 0, dex: 0, con: 0, int: 1, wis: 0, cha: 2 }
  },
  {
    name: 'Mountain Dwarf',
    attributes: { str: 2, dex: 0, con: 2, int: 0, wis: 0, cha: 0 }
  },
  {
    name: 'Half-Orc',
    attributes: { str: 2, dex: 0, con: 1, int: 0, wis: 0, cha: 0 }
  },
  {
    name: 'Stout Halfling',
    attributes: { str: 0, dex: 2, con: 1, int: 0, wis: 0, cha: 0 }
  },
  {
    name: 'Hill Dwarf',
    attributes: { str: 0, dex: 0, con: 2, int: 0, wis: 1, cha: 0 }
  },
  {
    name: 'Wood Elf',
    attributes: { str: 0, dex: 2, con: 0, int: 0, wis: 1, cha: 0 }
  },
  {
    name: 'Lightfoot Halfling',
    attributes: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 1 }
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
