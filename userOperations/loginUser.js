const User = require('../models/user');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ 'message': 'All fields must have a value' });
    }

    try {
        const foundUser = await User.findOne({ 
            $or: [ 
                { email: identifier }, 
                { username: identifier } 
            ],
           
        }).exec();
        
        
        if (!foundUser) {
            return res.status(401).json({ 'message':  'User not found' });
        } 

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) {
            return res.status(401).json({ 'message': 'Wrong credentials, try again!' });
        }

        res.json({ success: true, message: "Login successful",foundUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while trying to verify login details' });
    }
};

module.exports = { loginUser };
