import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';
import User from '../models/users.js';
import ConflictError from '../errors/ConflictError.js';
import { errorMessageUser } from '../utils/constants.js';

dotenv.config();

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

function findUserById(id, res, next) {
  User.findById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError(errorMessageUser.notFound);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessageUser.badRequest));
      } else {
        next(err);
      }
    });
}

export function getMe(req, res, next) {
  findUserById(req.user._id, res, next);
}

export function updateUserInfo(req, res, next) {
  const {
    email,
    name,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    email,
    name,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError(errorMessageUser.notFound);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessageUser.badRequestUpdate));
      } else if (err.code === 11000) {
        next(new ConflictError(errorMessageUser.conflict));
      } else {
        next(err);
      }
    });
}

export function createUser(req, res, next) {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, name, password: hash,
    }))
    .then((user) => {
      const userOutOfPassword = user.toObject();
      delete userOutOfPassword.password;
      res.send(userOutOfPassword);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessageUser.badRequestCreate));
      } else if (err.code === 11000) {
        next(new ConflictError(errorMessageUser.conflict));
      } else {
        next(err);
      }
    });
}

export function login(req, res, next) {
  const {
    email,
    password,
  } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
      );
      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
        secure: true,
      }).send({ JWT: token });
    })
    .catch(next);
}

export function logout(req, res) {
  res.clearCookie('jwt').send({
    message: 'Вышли из аккаунта',
  });
}
