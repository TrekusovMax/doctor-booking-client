import React, { useState } from 'react'
import Box from '@mui/material/Box'
import './Style.css'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import DoneIcon from '@mui/icons-material/Done'
import { MenuItem, TextField } from '@mui/material'
import DateInput from './DateInput'
import { randomId } from '@mui/x-data-grid-generator'

const diagnosisList = [
  {
    value: 'Глаукома',
    label: 'Глаукома',
  },
  {
    value: 'Катаракта',
    label: 'Катаракта',
  },
  {
    value: 'Консультация',
    label: 'Консультация',
  },
]

export default function PatientOrderModal({
  isOpen,
  setIsOrderModalOpen,
  setEvents,
  myEvents,
  orderTime,
}) {
  const [dateError, setDateError] = useState(false)
  const [name, setName] = useState('')
  const [orderDay, setOrderDay] = useState(new Date())
  const [diagnosis, setDiagnosis] = useState(diagnosisList[2].value)
  const [errName, setErrName] = useState(false)
  const handleListChange = (event) => {
    setDiagnosis(event.target.value)
  }
  const handleChange = (newValue) => {
    setOrderDay(newValue)
  }

  const handleWrite = () => {
    if (!name) {
      setErrName(true)
      return
    }
    const event = {
      id: randomId(),
      ...orderTime,
      title: name,
      date: orderDay,
      diagnosis,
    }
    myEvents.push(event)
    const newEvent = myEvents
    setEvents(newEvent)
    setName('')
    setIsOrderModalOpen(false)
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

  return (
    <div>
      <Modal
        //className="flex flex-col content-around"
        open={isOpen}
        //open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
            <DateInput
              orderDay={orderDay}
              setOrderDay={setOrderDay}
              error={dateError}
            />
            <TextField
              //defaultValue={diagnosis[0].value}
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
              disabled={errName}
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
      </Modal>
    </div>
  )
}
