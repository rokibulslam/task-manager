import { getToken } from '../helper/sessionHelper'
import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const location = useLocation()
    const navigate= useNavigate()
    const token = getToken()
    if (!token) {
        return (<Navigate to="/login" state={{ from: location }}></Navigate>)
    }
    return children
}

export default ProtectedRoute