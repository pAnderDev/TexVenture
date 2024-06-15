//create REST functions here
const User = require('../models/User')
const Character = require('../models/Character')
const Race = require('../models/Race')
const Class = require('../models/Class')
const Backgrounds = require('../models/Backgrounds')
const { hashPassword, comparePasswords } = require('../helpers/auth')
const jwt = require('jsonwebtoken');

//Register endpoint
const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        // check if username was entered
        if(!username) {
            return res.json({
                error: "Please enter a username"
            })
        }
        //check if password is good
        if(!password || password.length < 6) {
            return res.json({
                error: 'Password is required and needs to be at least 6 characters long'
            })
        };
        //check email
        const exist = await User.findOne({email});
        if(exist) {
            return res.json({
                error: 'Email is already in use'
            })
        }

        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            username, 
            email, 
            password: hashedPassword,
            date_created: new Date(),
            last_login: new Date(),
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

//Login endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                error: "No user with that email"
            })
        } 

        //check if passwords match
        const match = await comparePasswords(password, user.password)
        if(match) {
            jwt.sign({email: user.email, id: user._id, username: user.username}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user);
            })
            user.last_login= new Date()
        } else {
            return res.json({
                error: "Incorrect password"
            })
        }
    } catch (error) {
        console.log(error)

    }
}

const createCharacter = async (req, res) => {
    const { token } = req.cookies;
    
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
            if (err) return res.json({ error: "Invalid token" });

            try {
                const { name, classId, raceId, backgroundId, stats } = req.body;

                // Make sure the classID, raceID, and stats are correctly passed
                if (!classId || !raceId || !stats) {
                    return res.status(400).json({ error: "classID, raceID, and stats are required" });
                }

                const selectedClass = await Class.findById(classId);
                const selectedRace = await Race.findById(raceId);
                const selectedBackground = await Backgrounds.findById(backgroundId);

                if (!selectedClass || !selectedRace || !selectedBackground) {
                    return res.status(404).json({ error: "Class, Race, or Background not found" });
                }

                // Apply racial bonuses
                const raceBonuses = selectedRace.bonuses;
                const adjustedStats = {
                    strength: stats.strength + (raceBonuses.strength || 0),
                    dexterity: stats.dexterity + (raceBonuses.dexterity || 0),
                    constitution: stats.constitution + (raceBonuses.constitution || 0),
                    intelligence: stats.intelligence + (raceBonuses.intelligence || 0),
                    wisdom: stats.wisdom + (raceBonuses.wisdom || 0),
                    charisma: stats.charisma + (raceBonuses.charisma || 0),
                };

                const newCharacter = await Character.create({
                    user: user.id,
                    name,
                    class: selectedClass.name,
                    race: selectedRace.name,
                    background: selectedBackground.name,
                    stats: adjustedStats, // Use adjusted stats here
                });

                return res.json(newCharacter);
            } catch (error) {
                console.log(error);
                return res.json({ error: "Failed to create character" });
            }
        });
    } else {
        res.json({ error: "No token provided" });
    }
}

const selectCharacter = async (req, res) => {
    const { token } = req.cookies; //get the user who sent request
    const { characterId } = req.body;

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
            if(err) return res.json({error: "Invalid token"});

            try {
                //gather the list of all characters 
                const updatedUser = await User.findByIdAndUpdate(user.id, { selectedCharacter: characterId }, { new: true });
                if (!updatedUser) {
                    return res.status(404).json({ error: "User not found" });
                }
                return res.json({ message: "Character selected successfully", user: updatedUser });
            } catch (error) {
                console.log("Error selecting character:", error);
                return res.status(500).json({ error: "Failed to select character" });
            }
        });
    } else {
        res.json({error: "No token provided"});
    }
}

const getCharactersByUser = async (req, res) => {
    const { token } = req.cookies;

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
            if(err) return res.json({error: "Invalid token"});

            try {
                //gather the list of all characters 
                const characters = await Character.find({ user: user.id });
                return res.json(characters);
            } catch (error) {
                console.log("Error fetching characters:", error);
                return res.status(500).json({ error: "Failed to fetch characters" });
            }
        });
    } else {
        res.json({error: "No token provided"});
    }
};

    const getClasses = async (req, res) => {
        try {
        const classes = await Class.find();
        res.json(classes);
        } catch (error) {
        console.error('Error fetching class data:', error);
        res.status(500).json({ error: 'Server error' });
        }
    };
  
    // Get all race data
    const getRaces = async (req, res) => {
        try {
        const races = await Race.find();
        res.json(races);
        } catch (error) {
        console.error('Error fetching race data:', error);
        res.status(500).json({ error: 'Server error' });
        }
    };

  const getBackgrounds = async (req, res) => {
    try {
      const backgrounds = await Backgrounds.find();
      res.json(backgrounds);
    } catch (error) {
      console.error('Error fetching backgrounds data:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  const getRacialBonusesById = async (req, res) => {
    try {
        const { raceId } = req.params;
        const racialBonuses = await Race.findById(raceId);
        if(!racialBonuses) {
            return res.status(400).json({error: 'Race not found' });
        }
        res.json(racialBonuses);
    } catch (error) {
        console.error('Error fetching racial bonuses:', error);
        res.status(500).json({error: 'Server error' });
    }
};

  const getBackgroundById = async (req, res) => {
    try {
        const { backgroundId } = req.params;
        const background = await Backgrounds.findById(backgroundId);
        if (!background) {
            return res.status(404).json({ error: 'Background not found' });
        }
        res.json(background);
    } catch (error) {
        console.error('Error fetching background:', error);
        res.status(500).json({ error: 'Server error' });
    }
};



const getProfile = (req, res) => {
    const{token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logged out successfully" });
}


module.exports = {
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    createCharacter,
    selectCharacter,
    getClasses,
    getRaces,
    getCharactersByUser,
    getBackgrounds,
    getRacialBonusesById,
    getBackgroundById
}