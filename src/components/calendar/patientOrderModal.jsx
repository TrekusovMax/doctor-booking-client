import React, { useState } from 'react'
import './Style.css'
import DoneIcon from '@mui/icons-material/Done'
import { MenuItem, TextField, Button, Typography, Box } from '@mui/material'
import DateInput from './DateInput'
import { getUserCurrentData } from '../../store/users'
import { useDispatch, useSelector } from 'react-redux'
import { diagnosisList } from '../../utils/diagnosis'
import { createOrder } from '../../store/order'

export default function PatientOrderModal({ setIsOrderModalOpen, orderTime }) {
  const dispatch = useDispatch()
  const currentUser = useSelector(getUserCurrentData())
  const [dateError, setDateError] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState(new Date())
  const [diagnosis, setDiagnosis] = useState(diagnosisList[2].value)
  const [errName, setErrName] = useState(false)
  const [errPhone, setErrPhone] = useState(false)
  const handleListChange = (event) => {
    setDiagnosis(event.target.value)
  }
  const handleWrite = () => {
    if (!name) {
      setErrName(true)
      return
    }
    if (!phone) {
      setErrPhone(true)
      return
    }
    if (!dateOfBirth) {
      setDateError(true)
      return
    }

    const event = {
      start: orderTime.start,
      end: orderTime.end,
      name,
      phone,
      title: name,
      dateOfBirth,
      diagnosis,
      doctor: currentUser.name,
    }
    const eventArray = []
    eventArray.push(event)

    setName('')
    setPhone('')
    setIsOrderModalOpen(false)
    dispatch(createOrder(event))
  }
  const handleClose = () => {
    setIsOrderModalOpen(false)
  }
  const handleChangeName = (event) => {
    setName(event.target.value)
    if (event.target.value === '') {
      setErrName(true)
    } else {
      setErrName(false)
    }
  }
  const handleChangePhone = (event) => {
    setPhone(event.target.value)
    if (event.target.value === '') {
      setErrPhone(true)
    } else {
      setErrPhone(false)
    }
  }

  return (
    <Box className="Box">
      <div className="flex flex-col space-y-5">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
        >
          Запись на приём:
        </Typography>
        <TextField
          autoFocus
          id="name"
          name="name"
          label="ФИО"
          type="text"
          fullWidth
          variant="outlined"
          error={Boolean(errName)}
          helperText={errName ? 'ФИО не должно быть пустым!' : ''}
          onChange={handleChangeName}
        />
        <TextField
          id="phone"
          name="phone"
          label="Телефон"
          type="text"
          fullWidth
          variant="outlined"
          error={Boolean(errPhone)}
          helperText={errPhone ? 'Телефон не должен быть пустым!' : ''}
          onChange={handleChangePhone}
        />
        <DateInput
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          error={dateError}
          setDateError={setDateError}
        />
        <TextField
          id="outlined-select-diagnosis"
          select
          label="Цель посещения"
          value={diagnosis}
          onChange={handleListChange}
          variant="outlined"
        >
          {diagnosisList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          onClick={handleWrite}
          color="success"
          variant="contained"
          endIcon={<DoneIcon />}
          disabled={errName && errPhone && dateError}
        >
          Записать
        </Button>
        <Button
          onClick={handleClose}
          color="error"
          variant="contained"
          endIcon={<DoneIcon />}
        >
          Отмена
        </Button>
      </div>
    </Box>
  )
}
