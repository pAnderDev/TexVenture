require('dotenv').config();
const { exec } = require('child_process');

const { SEED_AUTH_KEY } = process.env;

exec(`node seed/seedClasses.js ${SEED_AUTH_KEY}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error seeding classes: ${err.message}`);
    return;
  }
  console.log(`Classes seed result: ${stdout}`);
  
});

exec(`node seed/seedRaces.js ${SEED_AUTH_KEY}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error seeding races: ${err.message}`);
    return;
  }
  console.log(`Races seed result: ${stdout}`);
  
});
