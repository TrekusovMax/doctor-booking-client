import * as React from 'react'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import moment from 'moment'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'

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
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const date = moment(event.event.start)
    .format('DD.MM.YYYY')
    .toString()
  const timeStart = moment(event.event.start)
    .format('HH:mm')
    .toString()
  const timeEnd = moment(event.event.end)
    .format('HH:mm')
    .toString()

  return (
    <div>
      <span onClick={handleOpen} className="flex  justify-between flex-nowrap">
        <strong> {event.event.title} </strong>
      </span>
      <Modal
        open={open}
        onClose={handleClose}
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
            Цель приёма: {event.event.diagnosis}
          </Typography>
          <div className="flex flex-row justify-around mt-4">
            <Button
              onClick={handleClose}
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
