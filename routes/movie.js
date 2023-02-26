import { Router } from 'express';
import { createMovie, deleteMovie, getMovies } from '../controllers/moive.js';
import { validateCreateMovie, validateMovieId } from '../validators/movie.js';

const movieRouter = Router();

movieRouter.get('/', getMovies);

movieRouter.post('/', validateCreateMovie, createMovie);

movieRouter.delete('/:movieId', validateMovieId, deleteMovie);

export default movieRouter;
