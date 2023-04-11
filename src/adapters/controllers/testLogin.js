
//const User = require('../models/User');
//const connect = require('../server/conexion');
//const mongoose = require('mongoose');

import User from '../../domian/model/User.js';
import connect from '../../infrastructure/database/conexion.js';
import mongoose from 'mongoose';


mongoose.set('strictQuery', true);
connect();
const user = new User({
  username: 'Camilo30',
  email: 'camilo30@gmail.com',
  password: '12345',
  firstName: 'Camilo Perez'
});

user.save()
  .then(() => console.log('Usuario creado exitosamente'))
  .catch(err => console.log('Error al crear el usuario', err));