import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded'
import { Link, useNavigate } from 'react-router-dom'
import localStorageService from '../services/localStorage.service'
export default function Header() {
  const navigate = useNavigate()
  const currentUserId = localStorageService.getAccessToken()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="flex justify-between">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <RemoveRedEyeRoundedIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={'/'} className="flex flex-row content-center">
              Ocovision
            </Link>
          </Typography>
          {currentUserId && (
            <>
              <Button onClick={() => navigate('/shedule')} color="inherit">
                Расписание
              </Button>
              <Button onClick={() => navigate('/list')} color="inherit">
                Список пациентов
              </Button>
              <Button onClick={() => navigate('/users')} color="inherit">
                Список пользователей
              </Button>
              <Button onClick={() => navigate('/logout')} color="inherit">
                Выйти
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
