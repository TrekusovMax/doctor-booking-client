import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import { columns } from './ListSettings'
import { DataGrid, ruRU } from '@mui/x-data-grid'
import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLoading, getAllOrders, getOrdersList } from '../../store/order'
import moment from 'moment'

const PatientList = () => {
  const [pageSize, setPageSize] = useState(20)
  const [tableData, setTableData] = useState([] /* rows */)

  const dispatch = useDispatch()
  const ordersList = useSelector(getOrdersList())
  const isLoadingList = useSelector(getIsLoading())

  const getCellClassName = (params) => {
    if (params.field === 'status') {
      return params.value === 'Завершено' ? 'done' : 'pending'
    }
  }

  useEffect(() => {
    dispatch(getAllOrders())
  }, [])

  useEffect(() => {
    const patientList = []
    //добавляем пациентов в список
    ordersList.map((order) =>
      patientList.push({
        id: order.id,
        fullName: order.name,
        age: moment(order.dateOfBirth).format('DD.MM.YYYY'),
        date: moment(order.start).format('DD.MM.YYYY'),
        status: order.isOpen ? 'Ожидает приёма' : 'Завершено',
        phone: order.phone,
      }),
      // }
    )
    setTableData(patientList)
  }, [ordersList])

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
        {!isLoadingList && (
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
            getCellClassName={getCellClassName}
          />
        )}
      </Paper>
    </Box>
  )
}

export default PatientList
