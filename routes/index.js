import express from 'express';
import usersRouter from './users.js';
import movieRouter from './movie.js';
import NotFoundError from '../errors/NotFoundError.js';
import auth from '../middlewares/auth.js';
import { validateCreateUser, validateLogin } from '../validators/users.js';
import { createUser, login, logout } from '../controllers/users.js';

const router = express();

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', movieRouter);
router.post('/signout', logout);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

export default router;
