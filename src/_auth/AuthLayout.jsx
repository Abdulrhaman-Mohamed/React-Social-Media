import React from 'react'
import {Outlet , Navigate} from "react-router-dom"
import useAuth from '../hooks/useAuth';

export default function AuthLayout() {
    //using router Outlet
    const{getFromLocalStorage} = useAuth();

    const isAuth = getFromLocalStorage();
  return (
    <>
    {
        (isAuth)? (
            <Navigate to="/"/>
        ):(
            <>
            <section>
                <Outlet />
            </section>
            </>
        )
    }
    </>
  )
}
