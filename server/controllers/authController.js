//create REST functions here
const User = require('../models/User')
const Character = require('../models/Character')
const Race = require('../models/Race')
const Class = require('../models/Class')
const Backgrounds = require('../models/Backgrounds')
const { hashPassword, comparePasswords } = require('../helpers/auth')
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { initialGameState } = require('../gameStates/gameStates.js');

require('dotenv').config(); // Ensure to load environment variables

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


//endpoint to handle OpenAI API calls
const openaiEndpoint = async (req, res) => {
    const { token } = req.cookies;
    const { input } = req.body;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
            if (err) return res.json({ error: "Invalid token" });

            try {
                const gameState = await getGameState(user.id); // Retrieve the game state from the database or session
                const prompt = generatePrompt(gameState, input);

                const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                    prompt,
                    max_tokens: 150,
                    temperature: 0.7,
                }, {
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                });

                const output = response.data.choices[0].text;
                const updatedGameState = updateGameState(gameState, input, output); // Update the game state
                await saveGameState(user.id, updatedGameState); // Save the updated game state

                return res.json({ output, gameState: updatedGameState });
            } catch (error) {
                console.error('Error generating GPT response:', error);
                return res.status(500).json({ error: 'Failed to generate response' });
            }
        });
    } else {
        res.json({ error: "No token provided" });
    }
};

const generatePrompt = (gameState, input) => {
    if (!gameState.player || !gameState.player.location) {
        throw new Error('Game state is invalid or player location is missing');
    }
    return `The player is currently at the ${gameState.player.location}. 
    The player has the following items: ${gameState.player.inventory.join(', ')}. 
    The player says: "${input}". 
    Continue the story based on this input and provide an engaging narrative.`;
};

const updateGameState = (gameState, input, output) => {
    if(input.toLowerCase.includes('go to the forest')) {
        gameState.player.location = 'Forest';
    }
    if(input.toLowerCase.includes('go to the town')) {
        gameState.player.location = 'Town';
    }
    return gameState;
}

const getGameState = async (userId) => {
    // Retrieve the user from the database
    const user = await User.findById(userId).populate('selectedCharacter');
    if (!user || !user.selectedCharacter) {
        throw new Error('User or selected character not found');
    }

    const character = user.selectedCharacter;

    // Initialize game state based on the selected character
    const gameState = {
        player: {
            name: character.name,
            location: 'Village', // Default starting location, you can change this based on your game logic
            inventory: [], // Initialize inventory, you can load this from the character if you have such data
            stats: character.stats,
        },
        world: {
            locations: [
                { name: 'Village', description: 'A small village with friendly inhabitants.' },
                { name: 'Forest', description: 'A dense forest filled with mysterious creatures.' },
                { name: 'Castle', description: 'A grand castle with tall towers.' },
            ],
            npcs: [
                { name: 'Old Man', location: 'Village', role: 'Quest Giver' },
                { name: 'Guard', location: 'Castle', role: 'Guard' },
            ],
            quests: [
                { id: 1, name: 'Find the Lost Sword', location: 'Forest', reward: 'Gold' },
            ],
        },
    };

    return gameState;
};

const saveGameState = async (userId, gameState) => {
    // Save the updated game state to the database or session for the given userId
    // For this example, we'll just log it
    console.log(`Saving game state for user ${userId}`, gameState);
};


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
    getBackgroundById,
    openaiEndpoint
}