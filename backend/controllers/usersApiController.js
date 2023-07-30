const User = require('../models/user');

const getUsers = (req, res) => {
    User.find().then(
        data => {
            res.json(data);
        }
    ).catch(
        err => {
            console.error('Users not founded', err);
            res.status(500).json({ error: 'Error getting users' });
        });
}

const createUser = (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({
            error: 'Please provide name, email, and age.'
        });
    }
    User.create({ name, email, age })
        .then(newUser => { res.json(newUser); })
        .catch(err => {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Failed to create user' });
        });
};

const updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
        return res.status(400).json({ error: 'Please provide name, email, and age.' });
    }
    User.findByIdAndUpdate(userId, { name, email, age }, { new: true }).then(
        updateUsersAll => {
            if (!updateUsersAll)
                return res.status(404).json({ error: 'User Not Found' });
            res.json(updateUsersAll);
        }
    ).catch(err => {
        console.log('Error updating user:', err);
        res.json(500).json({ error: 'Feild updating user:' });
    })
}

module.exports = {
    createUser,
    getUsers,
    updateUser
}