import React, { useState, useTransition } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, TextField, Checkbox, FormControlLabel } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthErrors, getAuthErrors, getIsRegistered } from '../../store/users'

import { toast } from 'react-toastify'

const OpenDialog = ({
  dialogOpen,
  handleDialogClose,
  setLogin,
  setPassword,
  setName,
  setIsAdmin,
  handleCreateNewUser,
}) => {
  const dispatch = useDispatch()
  const [admin, setAdmin] = useState(false)
  const [isPending, startTransition] = useTransition()
  let errName = ''
  let errLogin = ''
  let errPassword = ''

  const handleChangeName = (event) => {
    startTransition(() => {
      setName(event.target.value)
    })
  }
  const handleChangePassword = (event) => {
    startTransition(() => {
      setPassword(event.target.value)
    })
  }
  const handleChangeLogin = (event) => {
    startTransition(() => {
      setLogin(event.target.value)
    })
  }
  const handleChangeIsAdmin = () => {
    setAdmin((prev) => !prev)
    setIsAdmin(!admin)
  }
  const authErrors = useSelector(getAuthErrors())
  const isRegistered = useSelector(getIsRegistered())

  if (authErrors) {
    errName =
      authErrors.errors &&
      authErrors.errors
        .map((er) => (er.param === 'name' ? er : ''))
        .filter((el) => el.param === 'name')[0]

    errLogin =
      authErrors.errors &&
      authErrors.errors
        .map((er) => (er.param === 'login' ? er : ''))
        .filter((el) => el.param === 'login')[0]

    errPassword =
      authErrors.errors &&
      authErrors.errors
        .map((er) => (er.param === 'password' ? er : ''))
        .filter((el) => el.param === 'password')[0]

    if (authErrors.message === 'LOGIN_EXISTS') {
      errLogin = 'Данный логин уже существует! Введите другой логин!'
      toast.error(errLogin, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
        theme: 'colored',
      })
      dispatch(clearAuthErrors())
    }
  }

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Добавление нового сотрудника'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="ФИО"
            type="text"
            fullWidth
            variant="standard"
            error={Boolean(errName)}
            helperText={errName && errName ? errName.msg : ''}
            onChange={handleChangeName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="login"
            name="login"
            label="Логин"
            type="text"
            fullWidth
            variant="standard"
            error={Boolean(errLogin)}
            helperText={errLogin && errLogin ? errLogin.msg : ''}
            onChange={handleChangeLogin}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="Пароль"
            type="password"
            fullWidth
            variant="standard"
            error={Boolean(errPassword)}
            helperText={errPassword && errPassword ? errPassword.msg : ''}
            onChange={handleChangePassword}
          />
          <FormControlLabel
            control={<Checkbox checked={admin} name="isAdmin" onChange={handleChangeIsAdmin} />}
            label="Администратор?"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleCreateNewUser} autoFocus>
            Создать
          </Button>
          <Button color="error" variant="contained" onClick={handleDialogClose}>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default OpenDialog
