import React, { useState } from 'react'
import { Button } from '@mui/material'
import { randomId } from '@mui/x-data-grid-generator'

export default function GetTableSetting() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleDialogOpen = () => {
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

      renderCell: (cellValues) => {
        return (
          <Button color="error" onClick={handleDialogOpen} variant="contained">
            Удалить
          </Button>
        )
      },
    },
  ]

  const rows = [
    {
      id: randomId(),
      login: 'admin',
      fullName: 'Бехорашвили И.Ю.',
      isAdmin: true,
    },
  ]

  return { dialogOpen, columns, rows }
}

/* export const columns = [
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

    renderCell: (cellValues) => {
      return (
        <Button
          color="error"
          onClick={(event) => handleDialogOpen(event, cellValues)}
          variant="contained">
          Удалить
        </Button>
      )
    },
  },
] */
