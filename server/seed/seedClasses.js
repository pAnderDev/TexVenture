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
    description: 'A fierce warrior of primitive background who can enter a battle rage',
    hit_die: 'd12',
    primary_ability: 'Strength',
    saving_throw_proficiencies: ['Strength', 'Constitution'],
    armor_weapon_proficiencies: ['Light and medium armor', 'shields', 'simple and martial weapons'],
    spells: {}
  },
  {
    name: 'Bard',
    description: 'An inspiring magician whose power echoes the music of creation',
    hit_die: 'd8',
    primary_ability: 'Charisma',
    saving_throw_proficiencies: ['Dexterity', 'Charisma'],
    armor_weapon_proficiencies: ['Light armor', 'simple weapons', 'hand crossbows', 'longswords', 'rapiers', 'shortswords'],
    spells: {}
  },
  {
    name: 'Cleric',
    description: 'A priestly champion who wields divine magic in service of a higher power',
    hit_die: 'd8',
    primary_ability: 'Wisdom',
    saving_throw_proficiencies: ['Wisdom', 'Charisma'],
    armor_weapon_proficiencies: ['Light and medium armor', 'shields', 'simple weapons'],
    spells: {}
  },
  {
    name: 'Druid',
    description: 'A priest of the Old Faith, wielding the powers of nature—moonlight and plant growth, fire and lightning—and adopting animal forms',
    hit_die: 'd8',
    primary_ability: 'Wisdom',
    saving_throw_proficiencies: ['Intelligence', 'Wisdom'],
    armor_weapon_proficiencies: ['Light and medium armor (nonmetal)', 'shields (nonmetal)', 'clubs', 'daggers', 'darts', 'javelins', 'maces', 'quarterstaffs', 'scimitars', 'sickles', 'slings', 'spears'],
    spells: {}
  },
  {
    name: 'Fighter',
    description: 'A master of martial combat, skilled with a variety of weapons and armor',
    hit_die: 'd10',
    primary_ability: 'Strength or Dexterity',
    saving_throw_proficiencies: ['Strength', 'Constitution'],
    armor_weapon_proficiencies: ['All armor', 'shields', 'simple and martial weapons'],
    spells: {}
  },
  {
    name: 'Monk',
    description: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection',
    hit_die: 'd8',
    primary_ability: 'Dexterity & Wisdom',
    saving_throw_proficiencies: ['Strength', 'Dexterity'],
    armor_weapon_proficiencies: ['Simple weapons', 'shortswords'],
    spells: {}
  },
  {
    name: 'Paladin',
    description: 'A holy warrior bound to a sacred oath',
    hit_die: 'd10',
    primary_ability: 'Strength & Charisma',
    saving_throw_proficiencies: ['Wisdom', 'Charisma'],
    armor_weapon_proficiencies: ['All armor', 'shields', 'simple and martial weapons'],
    spells: {}
  },
  {
    name: 'Ranger',
    description: 'A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization',
    hit_die: 'd10',
    primary_ability: 'Dexterity & Wisdom',
    saving_throw_proficiencies: ['Strength', 'Dexterity'],
    armor_weapon_proficiencies: ['Light and medium armor', 'shields', 'simple and martial weapons'],
    spells: {}
  },
  {
    name: 'Rogue',
    description: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies',
    hit_die: 'd8',
    primary_ability: 'Dexterity',
    saving_throw_proficiencies: ['Dexterity', 'Intelligence'],
    armor_weapon_proficiencies: ['Light armor', 'simple weapons', 'hand crossbows', 'longswords', 'rapiers', 'shortswords'],
    spells: {}
  },
  {
    name: 'Sorcerer',
    description: 'A spellcaster who draws on inherent magic from a gift or bloodline',
    hit_die: 'd6',
    primary_ability: 'Charisma',
    saving_throw_proficiencies: ['Constitution', 'Charisma'],
    armor_weapon_proficiencies: ['Daggers', 'darts', 'slings', 'quarterstaffs', 'light crossbows'],
    spells: {}
  },
  {
    name: 'Warlock',
    description: 'A wielder of magic that is derived from a bargain with an extraplanar entity',
    hit_die: 'd8',
    primary_ability: 'Charisma',
    saving_throw_proficiencies: ['Wisdom', 'Charisma'],
    armor_weapon_proficiencies: ['Light armor', 'simple weapons'],
    spells: {}
  },
  {
    name: 'Wizard',
    description: 'A scholarly magic-user capable of manipulating the structures of reality',
    hit_die: 'd6',
    primary_ability: 'Intelligence',
    saving_throw_proficiencies: ['Intelligence', 'Wisdom'],
    armor_weapon_proficiencies: ['Daggers', 'darts', 'slings', 'quarterstaffs', 'light crossbows'],
    spells: {}
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
