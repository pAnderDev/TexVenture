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
   
  },
  {
    name: 'Bard',
    
  },
  {
    name: 'Cleric',
   
  },
  {
    name: 'Druid',
   
  },
  {
    name: 'Fighter',
   
  },
  {
    name: 'Monk',
    
  },
  {
    name: 'Paladin',
    
  },
  {
    name: 'Ranger',
   
  },
  {
    name: 'Rogue',
   
  },
  {
    name: 'Sorcerer',
    
  },
  {
    name: 'Warlock',
    
  },
  {
    name: 'Wizard',
   
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
