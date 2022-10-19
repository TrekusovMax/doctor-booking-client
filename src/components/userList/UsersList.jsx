import React, { useEffect, useState } from 'react'

import GetTableSetting from './TableSettings'
import { DataGrid, ruRU } from '@mui/x-data-grid'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { Typography, Paper, Button } from '@mui/material'
import StyledBox from './StyledBox'

import OpenDialog from './OpenDialog'
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/users'
import { toast } from 'react-toastify'

export default function UsersList() {
  const dispatch = useDispatch()
  const { rows } = GetTableSetting()
  const [pageSize, setPageSize] = useState(20)
  const [tableData, setTableData] = useState(rows)
  const [open, setOpen] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [errors, setErrors] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    let confirmDelete = window.confirm('Подтверждаете удаление?')
  }
  const handleDialogClose = () => {
    setDialogOpen(false)
  }
  const handleCreateNewUser = () => {
    const data = {
      name,
      login,
      password,
      isAdmin,
    }
    dispatch(signUp(data))
    toast('asd')
  }

  const handleAddNewUser = () => {
    setDialogOpen(true)
  }

  const columns = [
    {
      field: 'id',
      width: 50,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      renderHeader: () => <strong>{'ID'}</strong>,
      hide: true,
    },
    {
      editable: false,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      renderHeader: () => <strong>{'Логин'}</strong>,
      field: 'login',
      width: 120,
    },
    {
      width: 500,
      sortable: false,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => <strong>{'ФИО'}</strong>,
      field: 'fullName',
    },

    {
      field: 'isAdmin',
      renderHeader: () => <strong>{'Администратор'}</strong>,
      type: 'boolean',
      width: 140,
      editable: true,
      sortable: false,
    },
    {
      field: 'more',
      headerName: '',
      sortable: false,
      headerAlign: 'center',
      width: 200,
      isSecureContext,
      align: 'center',
      filterable: false,

      renderCell: () => {
        return (
          <Button color="error" onClick={handleDialogOpen} variant="contained">
            Удалить
          </Button>
        )
      },
    },
  ]

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const getCellClassName = (params) => {
    if (params.field === 'isAdmin') {
      return params.value ? 'isAdmin' : 'isUser'
    }
  }
  const processRowUpdate = (newRow) => {
    const newData = tableData.map((i) => (i.id === newRow.id ? newRow : i))

    setTableData(newData)
    setOpen(true)
    return newRow
  }
  /* useEffect(() => {
    console.log('name', name)
  }, [name])
  useEffect(() => {
    console.log('login', login)
  }, [login])
  useEffect(() => {
    console.log('password', password)
  }, [password])
  useEffect(() => {
    console.log('isAdmin', isAdmin)
  }, [isAdmin]) */
  return (
    <>
      <Typography variant="h3" align="center" sx={{ my: 2 }} component="h2">
        Список сотрудников
      </Typography>
      <StyledBox sx={{ marginX: 'auto' }}>
        <Button
          onClick={handleAddNewUser}
          sx={{ marginY: 2 }}
          color="primary"
          variant="contained"
        >
          Добавить
        </Button>
        <Paper elevation={3}>
          <DataGrid
            sx={{
              height: '75vh',
              width: '1000px',
              marginX: 'auto',
            }}
            disableColumnSelector
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={tableData}
            columns={columns}
            pagination
            autoHeight
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            experimentalFeatures={{ newEditingApi: true }}
            getCellClassName={getCellClassName}
            processRowUpdate={processRowUpdate}
          />
        </Paper>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            Данные пользователя изменнены
          </Alert>
        </Snackbar>
      </StyledBox>
      <OpenDialog
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        setLogin={setLogin}
        setPassword={setPassword}
        setName={setName}
        setIsAdmin={setIsAdmin}
        handleCreateNewUser={handleCreateNewUser}
      />
    </>
  )
}
