import React from 'react'

import { Navigate } from "react-router-dom";

import useAuth from '../hooks/useAuth'

export default function RequiredAuth({children} ) {

    // Wrap inside Component Required
    const{getFromLocalStorage} = useAuth();

    
  return getFromLocalStorage()? (
    children
  ):(
    <Navigate to="/sign-in" />
  )
}
