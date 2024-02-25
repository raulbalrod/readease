import bcrypt from 'bcrypt';
import { HttpStatusError } from 'common-errors';
import jwt from 'jsonwebtoken';

import config from '../config.js';
import User from '../models/User.js';

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HttpStatusError(401, 'Invalid email or password');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, config.app.secretKey);
    res.send({ token });
  } catch (error) {
    next(error);
  }
}
