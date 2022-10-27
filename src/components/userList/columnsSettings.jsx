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
]
