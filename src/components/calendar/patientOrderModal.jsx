import React, { useState, useId } from 'react'
import Box from '@mui/material/Box'
import './Style.css'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import DoneIcon from '@mui/icons-material/Done'
import { MenuItem, TextField } from '@mui/material'
import DateInput from './DateInput'
import { getUserCurrentData } from '../../store/users'
import { useDispatch, useSelector } from 'react-redux'
import { diagnosisList } from '../../utils/diagnosis'
import moment from 'moment/moment'
import { createOrder } from '../../store/order'
import { idID } from '@mui/material/locale'

export default function PatientOrderModal({
  isOpen,
  setIsOrderModalOpen,
  setEvents,
  myEvents,
  orderTime,
}) {
  const dispatch = useDispatch()
  const currentUser = useSelector(getUserCurrentData())
  const [dateError, setDateError] = useState(false)
  const [name, setName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState(new Date())
  const [diagnosis, setDiagnosis] = useState(diagnosisList[2].value)
  const [errName, setErrName] = useState(false)
  const handleListChange = (event) => {
    setDiagnosis(event.target.value)
  }

  const handleWrite = () => {
    if (!name) {
      setErrName(true)
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
      title: name,
      dateOfBirth,
      diagnosis,
      doctor: currentUser.name,
    }

    const eventArray = []
    eventArray.push(event)
    setEvents(eventArray)
    setName('')
    setIsOrderModalOpen(false)
    dispatch(createOrder(event))
    /* console.log({
      start: moment(orderTime.start).valueOf(),
      end: moment(orderTime.end).valueOf(),
      //...orderTime,
      name,
      dateOfBirth,
      diagnosis,
      doctor: currentUser.name,
    }) */
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
              dateOfBirth={dateOfBirth}
              setDateOfBirth={setDateOfBirth}
              error={dateError}
              setDateError={setDateError}
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
              disabled={errName && dateError}
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
