// Переданы некорректные данные при создании пользователя
const movieRelatedErrors = {
  wrongMovieId: 'Неправильный формат _id фильма',
  invalidMovieDataPayload: 'Переданы некорректные данные при создании фильма',
  movieNotFound: 'Фильм не найден',
  forbidden: 'Нет прав для удаления чужого фильма',
};

const userRelatedErrors = {
  wrongUserId: 'Неправильный формат _id пользователя',
  invalidCreateUserDataPayload: 'Переданы некорректные данные при создании пользователя',
  invalidUpdateUserDataPayload: 'Переданы некорректные данные при обновлении профиля',
  userAlreadyExists: 'Пользователь с таким email уже существует',
  userNotFound: 'Пользователь не найден',
  wrongEmailOrPassword: 'Неправильные почта или пароль',
};

const validateErrorMessages = {
  wrongEmail: 'Неправильный формат email',
  wrongUrl: 'Неправильный формат ссылки',
};

const errorMessages = {
  ...userRelatedErrors,
  ...movieRelatedErrors,
  ...validateErrorMessages,
};

module.exports = errorMessages;
