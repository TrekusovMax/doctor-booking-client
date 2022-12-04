import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import { rows, columns } from './ListSettings'
import { DataGrid, ruRU } from '@mui/x-data-grid'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { Typography } from '@mui/material'

const PatientList = () => {
  const [pageSize, setPageSize] = useState(20)
  const [tableData, setTableData] = useState(rows)
  const [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const processRowUpdate = (newRow) => {
    const newData = tableData.map((i) => (i.id === newRow.id ? newRow : i))
    setTableData(newData)
    setOpen(true)
    return newRow
  }
  const getCellClassName = (params) => {
    if (params.field === 'status') {
      return params.value === 'Завершено' ? 'done' : 'pending'
    }
  }
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
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
        Список пациентов
      </Typography>
      <Paper elevation={3}>
        <DataGrid
          disableColumnSelector
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={tableData}
          columns={columns}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          autoHeight
          processRowUpdate={processRowUpdate}
          getCellClassName={getCellClassName}
        />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            Данные пациента изменнены
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  )
}

export default PatientList
