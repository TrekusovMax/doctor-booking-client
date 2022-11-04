import React, { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

export default function DateInput({
  name,
  setActualDays,
  actualDays,
  error,
  sheduleId,
}) {
  const locale = 'ru'
  const date = sheduleId ? dayjs(actualDays).format('MM.DD.YYYY') : ''
  const [datePickerValue, setDatePickerValue] = useState(date)

  const handleChange = (newValue) => {
    setDatePickerValue(newValue)
    setActualDays((prev) => ({
      ...prev,
      [`${name}`]: dayjs(newValue).valueOf(),
    }))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DatePicker
        value={datePickerValue}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: '',
            }}
            error={error}
          />
        )}
      />
    </LocalizationProvider>
  )
}
