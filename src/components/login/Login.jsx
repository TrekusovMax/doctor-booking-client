import React from 'react'
import { Paper, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import styles from './Login.module.css'

export const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: 'admin',
      password: '12345',
    },
  })

  const onSubmit = (values) => {
    alert(JSON.stringify(values))
    /* const data = await dispatch(fetchAuth(values))
    if (!data.payload) {
      return alert('Не удалось авторизоваться!')
    }
    if ('token' in data.payload) {
      localStorage.setItem('token', data.payload.token)
    } */
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Логин"
          name="login"
          error={Boolean(errors.login)}
          helperText={errors.login ? 'Укажите логин' : ''}
          {...register('login', { required: 'Укажите логин' })}
          fullWidth
        />

        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          error={Boolean(errors.password)}
          helperText={errors.password ? 'Укажите пароль' : ''}
          {...register('password', { required: 'Укажите пароль' })}
          type="password"
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  )
}
