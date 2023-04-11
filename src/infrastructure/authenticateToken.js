import jwt from 'jsonwebtoken';
import User from "../domian/model/User.js"
import { config } from "../config.js";

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.sendStatus(401);
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};

export default authenticateToken;
