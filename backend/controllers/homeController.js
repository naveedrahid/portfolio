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



// const getUserById = async (req, res) => {
//     // Handle getting a user by ID
// };

// const updateUser = async (req, res) => {
//     // Handle updating a user
// };

// const deleteUser = async (req, res) => {
//     // Handle deleting a user
// };


module.exports = {
    homePage
}