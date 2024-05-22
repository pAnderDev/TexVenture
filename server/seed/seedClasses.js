const mongoose = require('mongoose');
const Class = require('../models/Class');
const dotenv = require('dotenv').config()

const { SEED_AUTH_KEY } = process.env;

if(process.argv[2] != SEED_AUTH_KEY) {
    console.error('Unauthorized access');
    process.exit(1);
}
const classes = [
  {
    name: 'Barbarian',
    hitDie: 12
  },
  {
    name: 'Bard',
    hitDie: 8
    
  },
  {
    name: 'Cleric',
    hitDie: 8
   
  },
  {
    name: 'Druid',
    hitDie: 8
   
  },
  {
    name: 'Fighter',
    hitDie: 10
   
  },
  {
    name: 'Monk',
    hitDie: 8
    
  },
  {
    name: 'Paladin',
    hitDie: 10
    
  },
  {
    name: 'Ranger',
    hitDie: 10
   
  },
  {
    name: 'Rogue',
    hitDie: 8
   
  },
  {
    name: 'Sorcerer',
    hitDie: 6
    
  },
  {
    name: 'Warlock',
    hitDie: 8
    
  },
  {
    name: 'Wizard',
    hitDie: 6
   
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(() => Class.insertMany(classes))
  .then(() => {
    console.log('Classes added');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
