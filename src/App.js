import React, { useEffect } from 'react'
import Header from './components/Header'
import Container from '@mui/material/Container'
import Calendar from './components/calendar/IndexCalendar'
import { Box } from '@mui/material'
import { Routes, Route, useNavigate, redirect } from 'react-router-dom'
import PatientList from './components/patientList/PatientList'
import PatientInfo from './components/patientList/PatientInfo'
import UsersList from './components/userList/UsersList'
import SheduleList from './components/shedule/SheduleList'
import { Login } from './components/login/Login'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AppLoader from './hoc/appLoader'
import localStorageService from './services/localStorage.service'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from './store/users'
import Logout from './components/Logout'

function App() {
  let currentUserId = localStorageService.getUserId()
  const isLoggedIn = useSelector(getIsLoggedIn())
  useEffect(() => {
    currentUserId = localStorageService.getUserId()
  }, [isLoggedIn])
  return (
    <Container maxWidth="">
      <Header />
      <Box
        sx={{
          marginTop: '20px',
        }}
      >
        {!currentUserId ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/list" element={<PatientList />} />
            <Route path="/list/:id" element={<PatientInfo />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/shedule" element={<SheduleList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        )}
      </Box>
      <ToastContainer />
    </Container>
  )
}

export default App
