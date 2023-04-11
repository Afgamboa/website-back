
const User = require('../models/User');

// Controlador para obtener todos los usuarios
const getAllUsers = (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json({ message: 'Users retrieved successfully', users });
    })
    .catch(err => {
      res.status(500).json({ message: 'Could not retrieve users', error: err.message });
    });
};

// Controlador para obtener un usuario por su id
const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User retrieved successfully', user });
    })
    .catch(err => {
      res.status(500).json({ message: 'Could not retrieve user', error: err.message });
    });
};

// Controlador para actualizar un usuario por su id
const updateUserById = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully', user });
    })
    .catch(err => {
      res.status(500).json({ message: 'Could not update user', error: err.message });
    });
};

// Controlador para eliminar un usuario por su id
const deleteUserById = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully', user });
    })
    .catch(err => {
      res.status(500).json({ message: 'Could not delete user', error: err.message });
    });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  login,
  updateUserById,
  deleteUserById
};
