import React from 'react'

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
    editable: false,
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
  },
]
