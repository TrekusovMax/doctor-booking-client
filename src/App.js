import React, { useEffect } from 'react'
import Header from './components/Header'
import Container from '@mui/material/Container'
import Calendar from './components/calendar/IndexCalendar'
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import PatientList from './components/patientList/PatientList'
import PatientInfo from './components/patientList/PatientInfo'
import UsersList from './components/userList/UsersList'
import SheduleList from './components/shedule/SheduleList'
import { Login } from './components/login/Login'
import { useDispatch } from 'react-redux'
import { loadUsersList } from './store/users'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUsersList())
  }, [])
  return (
    <Container maxWidth="">
      <Header />
      <Box
        sx={{
          marginTop: '20px',
        }}
      >
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/list" element={<PatientList />} />
          <Route path="/list/:id" element={<PatientInfo />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/shedule" element={<SheduleList />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Container>
  )
}

export default App
