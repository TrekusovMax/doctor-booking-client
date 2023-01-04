import React, { useState } from 'react'
import { Box, Typography, Modal, Button } from '@mui/material'

import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import { useDispatch } from 'react-redux'
import { changeStatusOrder, deleteOrder } from '../../store/order'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '25px',
}

export default function BasicModal({ event }) {
  const dispatch = useDispatch()

  const { id } = event
  const month = new Date(event.start).getMonth() + 1
  const year = new Date(event.start).getFullYear()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    const conf = window.confirm('Вы действительно хотите закрыть запись?')
    if (conf) {
      dispatch(changeStatusOrder({ id, month, year }))
    }
    setOpen(false)
  }
  const handleDelete = () => {
    const conf = window.confirm('Вы действительно хотите удалить запись?')
    if (conf) {
      dispatch(deleteOrder({ id, month, year }))
    }
    setOpen(false)
  }
  const date = moment(event.start)
    .format('DD.MM.YYYY')
    .toString()
  const timeStart = moment(event.start)
    .format('HH:mm')
    .toString()
  const timeEnd = moment(event.end)
    .format('HH:mm')
    .toString()

  return (
    <div>
      <span onClick={handleOpen} className="flex  justify-between flex-nowrap">
        <strong> {event.name} </strong>
      </span>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            {event.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Запись на приём: <strong>{date} г.</strong> c {timeStart} до{' '}
            {timeEnd}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Цель приёма: {event.diagnosis}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Записал: {event.doctor}
          </Typography>
          <div className="flex flex-row justify-around mt-4">
            <Button
              onClick={handleDelete}
              color="error"
              variant="contained"
              endIcon={<DeleteIcon />}
            >
              Удалить
            </Button>
            <Button
              onClick={handleClose}
              color="success"
              variant="contained"
              endIcon={<DoneIcon />}
            >
              Завершить
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
