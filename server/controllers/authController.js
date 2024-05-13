//create REST functions here
const User = require('../models/User')
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
            last_login: new Date()
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
    logoutUser
}