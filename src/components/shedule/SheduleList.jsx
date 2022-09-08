import React, { useState } from 'react'

import SheduleDay from './SheduleDay'
import { Box, Typography } from '@mui/material'

const SheduleList = () => {
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
      <SheduleDay day="Понедельник" />
      <SheduleDay day="Вторник" />
      <SheduleDay day="Среда" />
    </Box>
  )
}

export default SheduleList
