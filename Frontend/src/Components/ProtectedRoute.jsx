import React from 'react'
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import { Children } from 'react'

const ProtectedRoute = ({children})  => {
    const {user} = useContext(AuthContext);
    return user ? children : <Navigate to='/login' />
}

export default ProtectedRoute
