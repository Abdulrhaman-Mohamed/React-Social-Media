import React from 'react'

import {Outlet , Navigate} from "react-router-dom"
import NavBar from '../components/NavBar'
import SilderBar from '../components/SilderBar'


export default function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>  

  )
}
