import React, { useRef, useState } from 'react'
import {
  Typography,
  Stack,
  Paper,
  styled,
  FormGroup,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material'
import { Settings } from './Settings'
import BasicSelect from './BasicSelect'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  justifyContent: 'space-between',

  color: theme.palette.text.secondary,
}))

const SheduleDay = ({ day, setShedule, shedule }) => {
  const [checked, setChecked] = useState(true)
  const [hoursStart, setHoursStart] = useState(8)
  const [minutesStart, setMinutesStart] = useState(0)
  const [hoursEnd, setHoursEnd] = useState(8)
  const [minutesEnd, setMinutesEnd] = useState(0)
  const [receiptTime, setReceiptTime] = useState(5)

  const switchRef = useRef()

  const handleDayChange = (event) => {
    setChecked(event.target.checked)

    setShedule((prev) =>
      prev.map((item) =>
        Object.keys(item)[0] === day
          ? { [`${day}`]: { ...item[day], ['enabled']: event.target.checked } }
          : item,
      ),
    )
  }
  const handleChange = (event) => {
    const elem = event.target.name

    setShedule((prev) =>
      prev.map((item) =>
        Object.keys(item)[0] === day
          ? { [`${day}`]: { ...item[day], [`${elem}`]: event.target.value } }
          : item,
      ),
    )

    switch (elem) {
      case 'hoursStart':
        setHoursStart(event.target.value)
        break
      case 'minutesStart':
        setMinutesStart(event.target.value)
        break
      case 'hoursEnd':
        setHoursEnd(event.target.value)
        break
      case 'minutesEnd':
        setMinutesEnd(event.target.value)
        break
      case 'receiptTime':
        setReceiptTime(event.target.value)
        break
    }
  }
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{
        height: '75px',
        marginX: 'auto',
      }}>
      <FormGroup
        sx={{
          minWidth: '175px',
        }}>
        <FormControlLabel
          labelPlacement="start"
          ref={switchRef}
          control={
            <Switch
              checked={checked}
              onChange={handleDayChange}
              inputProps={{ 'aria-label': 'controlled' }}
              color="primary"
            />
          }
          label={day}
        />
      </FormGroup>
      <Divider orientation="vertical" flexItem />
      <Typography variant="body1" sx={{ my: 2 }} component="h2">
        С
      </Typography>
      <BasicSelect
        label={'Часы'}
        onChange={handleChange}
        data={Settings.hoursStart}
        name={'hoursStart'}
        time={hoursStart}
        disabled={!checked}
      />
      <BasicSelect
        label={'Минуты'}
        onChange={handleChange}
        data={Settings.minutesStart}
        name={'minutesStart'}
        time={minutesStart}
        disabled={!checked}
      />
      <Divider orientation="vertical" flexItem />
      <Typography variant="body1" sx={{ my: 2 }} component="h2">
        По
      </Typography>
      <BasicSelect
        label={'Часы'}
        onChange={handleChange}
        data={Settings.hoursEnd}
        name={'hoursEnd'}
        time={hoursEnd}
        disabled={!checked}
      />
      <BasicSelect
        label={'Минуты'}
        onChange={handleChange}
        data={Settings.minutesEnd}
        name={'minutesEnd'}
        time={minutesEnd}
        disabled={!checked}
      />
      <Divider orientation="vertical" flexItem />
      <Typography variant="body1" sx={{ my: 2 }} component="h2">
        Время приёма
      </Typography>
      <BasicSelect
        label={'Минут'}
        onChange={handleChange}
        data={[5, 10, 15, 20, 25, 30]}
        name={'receiptTime'}
        time={receiptTime}
        disabled={!checked}
      />
    </Stack>
  )
}
export default SheduleDay
