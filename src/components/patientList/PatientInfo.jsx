import React, { useEffect } from 'react'
import { Box, Divider, Paper, Typography, Button } from '@mui/material'
import '@fontsource/roboto/400.css'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById, getOneOrder, getError } from '../../store/order'
import {
  changeStatusOrderFromList,
  deleteOrderFromList,
} from '../../store/order'
import moment from 'moment'

const PatientInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const order = useSelector(getOneOrder())
  const error = useSelector(getError())

  useEffect(() => {
    dispatch(getOrderById(id))
  }, [])

  const handleClose = () => {
    const conf = window.confirm('Вы действительно хотите закрыть запись?')
    if (conf) {
      dispatch(changeStatusOrderFromList({ id }))
      navigate('/list')
    }
  }
  const handleDelete = () => {
    const conf = window.confirm('Вы действительно хотите удалить запись?')

    if (conf) {
      dispatch(deleteOrderFromList({ id }))
      navigate('/list')
    }
  }

  return (
    <>
      {error && navigate('/list')}
      <Paper
        elevation={3}
        sx={{ mx: 'auto', width: 'sm', maxWidth: 'sm', pt: 2 }}
      >
        {order && (
          <Box component="div" sx={{ m: 2 }}>
            <Typography
              sx={{ ml: 5 }}
              align="center"
              variant="h3"
              component="h3"
            >
              {order.name}
            </Typography>
            <Typography sx={{ my: 2 }} align="center" variant="h6" gutterBottom>
              {moment(order.dateOfBirth).format('DD.MM.YYYY г.р.')}
            </Typography>
            <Typography sx={{ my: 2 }} align="center" variant="h6" gutterBottom>
              Телефон: {order.phone}
            </Typography>
            <Divider />
            <Typography sx={{ my: 2, ml: 5 }} variant="h5" gutterBottom>
              {'Запись на приём: '}
              {moment(order.start).format('DD.MM.YYYY')}
            </Typography>
            <Typography sx={{ my: 2, ml: 5 }} variant="h5" gutterBottom>
              {'Время посещения: '}

              {`c ${moment(order.start).format('hh:mm')} 
            до  ${moment(order.end).format('hh:mm')} `}
            </Typography>
            <Divider />
            <Typography sx={{ my: 2, ml: 5 }} variant="h5" gutterBottom>
              {'Направивший врач: '}
              {order.doctor}
            </Typography>
            <Typography sx={{ my: 2, ml: 5 }} variant="h5" gutterBottom>
              {'Цель посещения: '}
              {order.diagnosis}
            </Typography>
            <Divider />
            <div className="flex flex-row justify-around mt-4 mb-4">
              <Button
                onClick={handleDelete}
                color="error"
                variant="contained"
                endIcon={<DeleteIcon />}
              >
                Удалить
              </Button>

              {order.isOpen && (
                <Button
                  onClick={handleClose}
                  color="success"
                  variant="contained"
                  endIcon={<DoneIcon />}
                >
                  Завершить
                </Button>
              )}
            </div>
            <Divider />
          </Box>
        )}
      </Paper>
    </>
  )
}

export default PatientInfo
