import React, { useState, useTransition } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, TextField, Checkbox, FormControlLabel } from '@mui/material'

const OpenDialog = ({
  dialogOpen,
  handleDialogClose,
  setLogin,
  setPassword,
  setName,
  setIsAdmin,
  handleCreateNewUser,
}) => {
  const [admin, setAdmin] = useState(false)
  const [isPending, startTransition] = useTransition()
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
            helperText="ФИО не должно быть пустым!"
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
