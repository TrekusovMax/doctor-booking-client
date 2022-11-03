import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import SheduleDay from './SheduleDay'
import { Settings, initState } from './Settings'
import { Box, Typography, Stack, Button, Paper } from '@mui/material'

import DateInput from './DateInput'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDays, getShedule } from '../../store/shedule'

const SheduleList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dates = useSelector(getDays())
  const { days } = Settings
  const [shedule, setShedule] = useState(initState)
  const [actualDays, setActualDays] = useState({
    date_from: dayjs().valueOf(),
    date_to: '',
  })
  useEffect(() => {
    dispatch(getShedule())
  }, [])

  console.log(dates)

  const handleSave = () => {
    console.log(Object.assign({ days: shedule }, actualDays))
  }
  const handleBack = () => {
    navigate('/')
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '75%',
        marginX: 'auto',
        '& .pending': {
          backgroundColor: '#f0e68c',
        },
        '& .done': {
          backgroundColor: '#adff2f',
        },
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
        '& .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
      }}>
      <Typography variant="h3" sx={{ my: 2 }} component="h2">
        Расписание приёма
      </Typography>

      <Stack sx={{ my: 1, ml: 4 }} direction="row" spacing={3} justifyContent={'space-between'}>
        <Stack
          sx={{ my: 3, ml: 4 }}
          direction="row"
          spacing={3}
          justifyContent={'start'}
          alignItems={'center'}>
          <Typography variant="body1" sx={{ my: 2 }} component="h2">
            C
          </Typography>
          <DateInput actualDays={actualDays} setActualDays={setActualDays} name="date_from" />
          <Typography variant="body1" sx={{ my: 2 }} component="h2">
            По
          </Typography>
          <DateInput actualDays={actualDays} setActualDays={setActualDays} name="date_to" />
        </Stack>
        <Stack
          sx={{ my: 3 }}
          direction="row"
          spacing={3}
          justifyContent={'end'}
          alignItems={'center'}>
          <Button color="success" onClick={handleSave} variant="contained" autoFocus>
            Сохранить
          </Button>
          <Button color="error" onClick={handleBack} variant="contained">
            Отмена
          </Button>
        </Stack>
      </Stack>
      <Paper elevation={3} sx={{ p: 4 }}>
        {days.map((d, i) => (
          <SheduleDay setShedule={setShedule} key={i} day={d} />
        ))}
      </Paper>
    </Box>
  )
}

export default SheduleList
