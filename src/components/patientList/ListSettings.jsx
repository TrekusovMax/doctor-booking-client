import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

export const columns = [
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
    field: 'fullName',
    renderHeader: () => <strong>{'ФИО'}</strong>,
    width: 300,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'age',
    type: 'date',
    width: 150,
    headerAlign: 'center',
    align: 'center',
    renderHeader: () => <strong>{'День рождения'}</strong>,
  },
  {
    field: 'phone',
    renderHeader: () => <strong>{'Телефон'}</strong>,
    width: 200,
    headerAlign: 'center',
    align: 'center',
    sortable: false,
  },

  {
    field: 'status',
    renderHeader: () => <strong>{'Статус'}</strong>,
    sortable: false,
    width: 300,
    headerAlign: 'center',
    align: 'center',
    editable: false,
    type: 'singleSelect',
    valueOptions: ['Ожидает приёма', 'Завершено'],
  },
  {
    field: 'date',
    renderHeader: () => <strong>{'Дата'}</strong>,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    width: 232,
  },
  {
    field: 'more',
    headerName: '',
    sortable: false,
    headerAlign: 'center',
    width: 300,
    isSecureContext,
    align: 'center',
    filterable: false,

    renderCell: (params) => {
      return (
        <Link variant="contained" to={`/list/${params.id}`}>
          <Button variant="outlined">Подробнее</Button>
        </Link>
      )
    },
  },
]
