import React, { useState } from 'react'
import { Paper, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import styles from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthErrors, login } from '../../store/users'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import localStorageService from '../../services/localStorage.service'

export const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    login: 'admin',
    password: '12345678',
  })
  const handleChange = (event) => {
    setData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: data,
  })
  const loginError = useSelector(getAuthErrors())
  const dispatch = useDispatch()

  const onSubmit = async () => {
    const res = await dispatch(login(data))

    if (!res) {
      return toast.error('Не удалось авторизоваться!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
        theme: 'colored',
      })
    }
    navigate('/')
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
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
