import React from 'react'
import PropTypes from 'prop-types'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function BasicSelect({
  label,
  data,
  name,
  onChange,
  time,
  disabled,
}) {
  /* const handleChange = (event) => {
    setTime(event.target.value)
  } */

  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        labelId={name}
        id={`${name}-select`}
        name={name}
        value={time}
        label={label}
        onChange={onChange}
      >
        {data.map((d) => (
          <MenuItem value={d} key={d}>
            {d}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

BasicSelect.propTypes = {
  label: PropTypes.string.isRequired,
}
