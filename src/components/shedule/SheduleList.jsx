import React, { useEffect, useState } from 'react'

import SheduleDay from './SheduleDay'
import { Settings, initState } from './Settings'
import { Box, Typography, Stack } from '@mui/material'

import DateInput from './DateInput'

const SheduleList = () => {
  const { days } = Settings
  const [shedule, setShedule] = useState(initState)

  useEffect(() => {
    console.log(shedule)
  }, [shedule])

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
      <Stack
        sx={{ my: 3, ml: 4 }}
        direction="row"
        spacing={3}
        justifyContent={'start'}
        alignItems={'center'}>
        <Typography variant="body1" sx={{ my: 2 }} component="h2">
          C
        </Typography>
        <DateInput />
        <Typography variant="body1" sx={{ my: 2 }} component="h2">
          По
        </Typography>
        <DateInput />
      </Stack>
      {days.map((d, i) => (
        <SheduleDay shedule={shedule} setShedule={setShedule} key={i} day={d} />
      ))}
    </Box>
  )
}

export default SheduleList
