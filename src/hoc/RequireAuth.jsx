import React from 'react'
import { useLocation, Navigate, redirect } from 'react-router-dom'
import localStorageService from '../services/localStorage.service'

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const currentUserId = localStorageService.getUserId()

  if (!currentUserId) {
    //return <Navigate to="/login" state={{ from: location }} />
    return redirect('/login')
  }

  return children
}

export default RequireAuth
