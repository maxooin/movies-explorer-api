const urlRegex = /^https?:\/\/(www\.)?[0-9a-zA-Z]+\.[\w\-._~:\\/?#[\]@!$&'()*+,;=]{2,}#?$/;
export default urlRegex;

export const errorMessageUser = {
  notFound: 'Пользователь с указанным _id не найден',
  badRequest: 'Переданы некорректные данные при запросе информации о пользователе.',
  badRequestCreate: 'Переданы некорректные данные при создании пользователя',
  badRequestUpdate: 'Переданы некорректные данные при обновлении пользователя.',
  conflict: 'Данный email уже занят',
};

export const errorMessageMovies = {
  notFound: 'Данного фильма нет.',
  forbidden: 'Удаление не возможно. Вы не являетесь создателем данного фильма.',
  badRequest: 'Переданны некорректные данные.',
  badRequestCreate: 'Переданны некорректные данные при создании фильма.',
};

export const errorMessageAuth = {
  unauthorized: 'Передан не верифицированый токен',
  cookie: 'Отсутствует авторизационный заголовок или cookies',
};

export const errorMessageRouters = {
  notFound: 'Маршрут не найден',
  unknown: 'На сервере произошла ошибка',
  tooMany: 'Слишком много запросов с одного IP-адреса',
};
