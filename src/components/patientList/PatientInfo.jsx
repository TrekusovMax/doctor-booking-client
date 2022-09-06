import { Box, Divider, Paper, Typography, Button } from '@mui/material'
import React from 'react'
import '@fontsource/roboto/400.css'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import { useNavigate } from 'react-router-dom'

const PatientInfo = () => {
  const navigate = useNavigate()
  return (
    <Paper elevation={3} sx={{ mx: 'auto', width: 'sm', maxWidth: 'sm', pt: 2 }}>
      <Box component="div" sx={{ m: 2 }}>
        <Typography sx={{ ml: 5 }} align="center" variant="h3" component="h3">
          Иванов И.И.
        </Typography>
        <Typography sx={{ my: 2 }} align="center" variant="h6" gutterBottom>
          {'25.08.1986 г.р.'}
        </Typography>
        <Divider />
        <Typography sx={{ my: 2, ml: 5 }} variant="h5" gutterBottom>
          {'Запись на приём: '}
          {'22.08.2022 г. '}
        </Typography>
        <Typography sx={{ my: 2, ml: 5 }} variant="h5" gutterBottom>
          {'Время посещения: '}
          {'c 11:30 до 11:45'}
        </Typography>
        <Divider />
        <Typography sx={{ my: 2, ml: 5 }} variant="h5" gutterBottom>
          {'Направивший врач: '}
          {'Смирнов В.В. '}
        </Typography>
        <Typography sx={{ my: 2, ml: 5 }} variant="h5" gutterBottom>
          {'Цель посещения: '}
          {'консультация'}
        </Typography>
        <Divider />
        <div className="flex flex-row justify-around mt-4 mb-4">
          <Button
            onClick={() => navigate('/list')}
            color="error"
            variant="contained"
            endIcon={<DeleteIcon />}>
            Удалить
          </Button>
          <Button
            onClick={() => navigate('/list')}
            color="success"
            variant="contained"
            endIcon={<DoneIcon />}>
            Завершить
          </Button>
        </div>
        <Divider />
      </Box>
    </Paper>
  )
}

export default PatientInfo
