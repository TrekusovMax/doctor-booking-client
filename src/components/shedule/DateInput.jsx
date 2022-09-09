import React, { useRef, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

export default function DateInput({ actualDays, name, setActualDays }) {
  const locale = 'ru'
  const [datePickerValue, setDatePickerValue] = useState(dayjs())
  let minDate = actualDays['date_from']
  const handleChange = (newValue) => {
    setDatePickerValue(newValue)

    setActualDays((prev) => ({ ...prev, [`${name}`]: new Date(newValue).getTime() }))
  }

  //console.log(new Date(datePickerValue).getTime())

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DatePicker
        value={datePickerValue}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
