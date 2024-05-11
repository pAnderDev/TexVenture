//create REST functions here
const User = require('../models/User')
const test = (req, res) => {
    res.json('test is working')
}

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

        const user = await User.create({
            username, email, password
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    test,
    registerUser
}