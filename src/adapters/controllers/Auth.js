import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../domian/model/User.js';
import { config } from '../../config.js';

// Función para generar un token JWT
function generateToken(user) {
  const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: '1d' });
  return token;
}

// Función para validar las credenciales del usuario y generar un token JWT
async function login(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = generateToken(user);
  const userId = user.id;

  return res.status(200).json({ token,  userId});
}

// Función para crear un nuevo usuario y generar un token JWT
async function register(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: 'Ya existe un usuario con este correo electrónico' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });

  await user.save();

  const token = generateToken(user);

  return res.status(201).json({ token });
}

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ name: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {login, register, getUserById}
