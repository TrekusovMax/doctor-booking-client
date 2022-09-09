import React, { useState } from 'react'

import SheduleDay from './SheduleDay'
import { Settings, initState } from './Settings'
import { Box, Typography, Stack, Button, Paper } from '@mui/material'

import DateInput from './DateInput'

const SheduleList = () => {
  const { days } = Settings
  const [shedule, setShedule] = useState(initState)
  const [actualDays, setActualDays] = useState({
    date_from: '',
    date_to: '',
  })
  /* 
  useEffect(() => {
    //console.log(actualDays)
  }, [actualDays])

  useEffect(() => {
    //  console.log(shedule)
  }, [shedule]) */

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
          <DateInput setActualDays={setActualDays} name="date_from" />
          <Typography variant="body1" sx={{ my: 2 }} component="h2">
            По
          </Typography>
          <DateInput setActualDays={setActualDays} name="date_to" />
        </Stack>
        <Stack
          sx={{ my: 3 }}
          direction="row"
          spacing={3}
          justifyContent={'end'}
          alignItems={'center'}
        >
          <Button color="success" variant="contained" autoFocus>
            Сохранить
          </Button>
          <Button color="error" variant="contained">
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
