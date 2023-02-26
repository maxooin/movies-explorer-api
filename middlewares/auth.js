import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { errorMessageAuth } from '../utils/constants.js';

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

function auth(req, res, next) {
  const { cookies } = req;

  if (cookies && cookies.jwt) {
    const token = cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    } catch (e) {
      next(new UnauthorizedError(errorMessageAuth.unauthorized));
    }
    req.user = payload;
    next();
  } else {
    next(new UnauthorizedError(errorMessageAuth.cookie));
  }
}

export default auth;
