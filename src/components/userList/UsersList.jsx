import React, { useEffect, useState } from 'react'
import { DataGrid, ruRU } from '@mui/x-data-grid'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { Typography, Paper, Button } from '@mui/material'
import StyledBox from './StyledBox'

import OpenDialog from './OpenDialog'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteUser,
  getDataStatus,
  getUsersList,
  loadUsersList,
  signUp,
} from '../../store/users'
import { toast } from 'react-toastify'
import { columns } from './columnsSettings'

export default function UsersList() {
  const rows = []
  const dispatch = useDispatch()
  const usersDataStatus = useSelector(getDataStatus())
  const usersList = useSelector(getUsersList())

  const [pageSize, setPageSize] = useState(20)
  const [tableData, setTableData] = useState([])

  const [open, setOpen] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isDeletedUser, setIsDeletedUser] = useState(false)

  useEffect(() => {
    dispatch(loadUsersList())
    usersList &&
      usersList.map((u) =>
        rows.push({
          id: u._id,
          login: u.login,
          fullName: u.name,
          isAdmin: u.isAdmin,
        }),
      )
    setTableData(rows)
    setIsDeletedUser(false)
  }, [usersDataStatus, dialogOpen, isDeletedUser])

  const handleDialogClose = () => {
    setDialogOpen(false)
  }
  const handleCreateNewUser = async () => {
    const data = {
      name,
      login,
      password,
      isAdmin,
    }
    const res = await dispatch(signUp(data))
    await dispatch(loadUsersList())

    if (res) {
      toast.success('Добавлен новый сотрудник', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
        theme: 'colored',
      })
      setDialogOpen(false)
    }
  }

  const handleAddNewUser = () => {
    setDialogOpen(true)
  }

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
  const handleDialogDelete = async ({ id }) => {
    let confirmDelete = window.confirm('Подтверждаете удаление?')

    if (confirmDelete) {
      const res = await dispatch(deleteUser(id))
      if (res) {
        toast.error('Cотрудник удалён', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          progress: undefined,
          theme: 'colored',
        })
        setIsDeletedUser(true)
      }
    }
  }
  const processRowUpdate = (newRow) => {
    const newData = tableData.map((i) => (i.id === newRow.id ? newRow : i))

    setTableData(newData)
    setOpen(true)
    return newRow
  }
  const btnColumn = {
    field: 'more',
    headerName: '',
    sortable: false,
    headerAlign: 'center',
    width: 200,
    isSecureContext,
    align: 'center',
    filterable: false,

    renderCell: (params) => {
      return (
        <Button
          color="error"
          onClick={() => handleDialogDelete(params)}
          variant="contained"
        >
          Удалить
        </Button>
      )
    },
  }
  columns.push(btnColumn)

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
