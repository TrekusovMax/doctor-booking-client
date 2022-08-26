import React from 'react'
import Header from './components/Header'
import Container from '@mui/material/Container'
import IndexCalendar from './components/calendar/IndexCalendar'
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Container maxWidth="">
      <Header />
      <Box
        sx={{
          marginTop: '20px',
        }}>
        <Routes>
          <Route path="/" element={<IndexCalendar />} />
        </Routes>
      </Box>
    </Container>
  )
}

export default App

