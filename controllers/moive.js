import Movie from '../models/movie.js';
import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError.js';
import ForbiddenError from '../errors/ForbiddenError.js';

export function getMovies(req, res, next) {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
}

export function createMovie(req, res, next) {
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(`Переданны некорректные данные при создании фильма: ${Object.values(err.errors)[0].message}`));
      } else {
        next(err);
      }
    });
}

export function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данного фильма нет');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удаление не возможно. Вы не являетесь создателем данного фильма');
      } else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((result) => {
            res.send(result);
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданны некорректные данные'));
      } else {
        next(err);
      }
    });
}
