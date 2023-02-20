import mongoose from 'mongoose';
import urlRegex from '../utils/constants.js';

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле страны не заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле директора не заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле длительности не заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле года не заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле описания не заполнено'],
  },
  image: {
    type: String,
    validate: {
      validator: (url) => urlRegex.test(url),
      message: 'В поле ссылка на постер [{VALUE}] не является ссылкой',
    },
    required: [true, 'Поле ссылка на постер не заполнено'],
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (url) => urlRegex.test(url),
      message: 'В поле ссылка на трейлер [{VALUE}] не является ссылкой',
    },
    required: [true, 'Поле ссылка на трейлер не заполнено'],
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (url) => urlRegex.test(url),
      message: 'В поле ссылка на миниатюру [{VALUE}] не является ссылкой',
    },
    required: [true, 'Поле ссылка на миниатюру не заполнено'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'поле название фильма на русском языке не заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'поле название фильма на английском языке не заполнено'],
  },
});

export default mongoose.model('movie', movieSchema);
