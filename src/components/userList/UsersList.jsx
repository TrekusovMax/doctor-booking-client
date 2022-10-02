import React, { useEffect, useState } from 'react'

import GetTableSetting from './TableSettings'
import { DataGrid, ruRU } from '@mui/x-data-grid'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import {
  Typography,
  Paper,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import StyledBox from './StyledBox'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

export default function UsersList() {
  const { rows } = GetTableSetting()
  const [pageSize, setPageSize] = useState(20)
  const [tableData, setTableData] = useState(rows)
  const [open, setOpen] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleDialogOpen = () => {
    let isBoss = window.confirm('Ты здесь главный?')
  }
  const handleDialogClose = () => {
    setDialogOpen(false)
  }
  const handleCreateNewUser = (event) => {
    console.log(event.target)
  }

  const handleAddNewUser = () => {
    setDialogOpen(true)
  }
  const handleIsAdmin = (event) => {
    setAdmin(event.target.checked)
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

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Добавление нового сотрудника'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="ФИО"
            type="text"
            fullWidth
            variant="standard"
            helperText="ФИО не должно быть пустым!"
          />
          <TextField
            autoFocus
            margin="dense"
            id="login"
            label="Логин"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Пароль"
            type="password"
            fullWidth
            variant="standard"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={admin}
                onChange={handleIsAdmin}
                name="isAdmin"
              />
            }
            label="Администратор?"
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreateNewUser}
            autoFocus
          >
            Создать
          </Button>
          <Button color="error" variant="contained" onClick={handleDialogClose}>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
