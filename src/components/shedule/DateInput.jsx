import React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

export default function DateInput() {
  const locale = 'ru'
  const [datePickerValue, setDatePickerValue] = React.useState(dayjs())

  //console.log(new Date(datePickerValue).getTime())

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DatePicker
        value={datePickerValue}
        onChange={(newValue) => setDatePickerValue(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
