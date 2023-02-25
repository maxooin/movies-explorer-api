import dotenv from 'dotenv';
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';
import User from '../models/users.js';

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
        throw new NotFoundError(`Пользователь с указанным _id=${id} не найден.`);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные: _id=${id} при запросе информации о пользователе.`));
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
        throw new NotFoundError(`Пользователь c указанным _id=${req.user._id} не найден.`);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при обновлении пользователя: ${Object.values(err.errors)[0].message}`));
      } else {
        next(err);
      }
    });
}
