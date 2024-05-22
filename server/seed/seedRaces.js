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
    name: 'Dwarf',
    bonuses: {
      constitution: 2,
      wisdom: 1
    }
  },
  {
    name: 'Elf',
    bonuses: {
      dexterity: 2,
      wisdom: 1
    }
  },
  {
    name: 'Halfling',
    bonuses: {
      dexterity: 2,
      charisma: 1
    }
  },
  {
    name: 'Human',
    bonuses: {
      strength: 1,
      dexterity: 1,
      constitution: 1
    }
  },
  {
    name: 'Dragonborn',
    bonuses: {
      strength: 2,
      charisma: 1,
    }
  },
  {
    name: 'Gnome',
    bonuses: {
      intelligence: 3
    }
  },
  {
    name: 'Half-Elf',
    bonuses: {
      charisma: 1,
      dexterity: 1,
      intelligence: 1
    }
  },
  {
    name: 'Half-Orc',
    bonuses: {
      strength: 2,
      constitution: 1,
    }
  },
  {
    name: 'Tiefling',
    bonuses: {
      charisma: 2,
      intelligence: 1
    }
  },
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
