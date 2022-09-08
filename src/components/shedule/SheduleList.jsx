import React, { useState } from 'react'

import SheduleDay from './SheduleDay'
import { Settings, initState } from './Settings'
import { Box, Typography } from '@mui/material'

const SheduleList = () => {
  const { days } = Settings
  const [shedule, setShedule] = useState(initState)

  //console.log(shedule)
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
      {days.map((d, i) => (
        <SheduleDay shedule={shedule} setShedule={setShedule} key={i} day={d} />
      ))}
    </Box>
  )
}

export default SheduleList
