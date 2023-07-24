const User = require('../models/user');

const homePage = async (req, res) => {
    try {
        const users = await User.find();
        res.render('home', { users });
    } catch (error) {
        console.log('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
};

const createUser = async (req, res) => {
    try {
        // Get the user data from the request body
        const { name, email, age } = req.body;

        // Create a new user instance based on the provided data
        const newUser = new User({
            name,
            email,
            age,
        });

        // Save the new user to the database
        await newUser.save();

        // Return a success response
        res.json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    // Handle getting a user by ID
};

const updateUser = async (req, res) => {
    // Handle updating a user
};

const deleteUser = async (req, res) => {
    // Handle deleting a user
};

module.exports = {
    homePage,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}