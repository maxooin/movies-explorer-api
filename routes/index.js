import express from 'express';
import usersRouter from './users.js';
import movieRouter from './movie.js';
import NotFoundError from '../errors/NotFoundError.js';

const router = express();

router.use('/users', usersRouter);
router.use('/movies', movieRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

export default router;
