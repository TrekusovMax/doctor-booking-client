export function generateAuthError(message) {
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Логин или пароль введены некорректно'
    case 'LOGIN_EXISTS':
      return 'Пользователь с таким логином уже существует'

    default:
      return 'Слишком много попыток входа. Попробуйте позже'
  }
}
