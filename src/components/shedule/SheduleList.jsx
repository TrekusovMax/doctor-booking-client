import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import SheduleDay from './SheduleDay'
import { Settings, initState } from './Settings'
import { Box, Typography, Stack, Button, Paper } from '@mui/material'

import DateInput from './DateInput'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDateFrom,
  getDateTo,
  getIsLoading,
  getShedule,
  getSheduleId,
  setNewShedule,
} from '../../store/shedule'

import { getDays } from '../../store/shedule'

const SheduleList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const sheduleId = useSelector(getSheduleId())
  const dates = useSelector(getDays())
  const dateFrom = useSelector(getDateFrom())
  const dateTo = useSelector(getDateTo())
  const sheduleIsLoading = useSelector(getIsLoading())

  const { days } = Settings
  const [shedule, setShedule] = useState(initState)
  const [actualDays, setActualDays] = useState({})
  const [dateError, setDateError] = useState(false)

  useEffect(() => {
    if (sheduleId) setShedule(dates)
  }, [sheduleId])

  useEffect(() => {
    dispatch(getShedule())
    setActualDays({
      date_from: dateFrom,
      date_to: dateTo,
    })
  }, [dateFrom, dateTo])

  const handleSave = () => {
    if (!actualDays.date_from) {
      setDateError(true)
    } else {
      dispatch(
        setNewShedule(
          Object.assign({ _id: sheduleId, days: shedule }, actualDays),
        ),
      )

      setDateError(false)
    }
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
      }}
    >
      <Typography variant="h3" sx={{ my: 2 }} component="h2">
        Расписание приёма
      </Typography>
      {!sheduleIsLoading && (
        <Stack
          sx={{ my: 1, ml: 4 }}
          direction="row"
          spacing={3}
          justifyContent={'space-between'}
        >
          <Stack
            sx={{ my: 3, ml: 4 }}
            direction="row"
            spacing={3}
            justifyContent={'start'}
            alignItems={'center'}
          >
            <Typography variant="body1" sx={{ my: 2 }} component="h2">
              C
            </Typography>
            <DateInput
              actualDays={actualDays.date_from}
              setActualDays={setActualDays}
              name="date_from"
              error={dateError}
              sheduleId={sheduleId}
            />
            <Typography variant="body1" sx={{ my: 2 }} component="h2">
              По
            </Typography>
            <DateInput
              actualDays={actualDays.date_to}
              setActualDays={setActualDays}
              name="date_to"
              sheduleId={sheduleId}
            />
          </Stack>

          <Stack
            sx={{ my: 3 }}
            direction="row"
            spacing={3}
            justifyContent={'end'}
            alignItems={'center'}
          >
            <Button
              color="success"
              onClick={handleSave}
              variant="contained"
              autoFocus
            >
              Сохранить
            </Button>
            <Button color="error" onClick={handleBack} variant="contained">
              Отмена
            </Button>
          </Stack>
        </Stack>
      )}
      {!sheduleIsLoading ? (
        <Paper elevation={3} sx={{ p: 4 }}>
          {shedule.map((s, i) => (
            <SheduleDay
              setShedule={setShedule}
              shedule={s}
              key={i}
              day={Object.keys(s)}
              sheduleId={sheduleId}
            />
          ))}
        </Paper>
      ) : (
        'Загрузка...'
      )}
    </Box>
  )
}

export default SheduleList
