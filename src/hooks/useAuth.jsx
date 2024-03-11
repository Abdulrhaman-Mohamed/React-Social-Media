import { jwtDecode } from 'jwt-decode';
import React from 'react'

import { useNavigate } from "react-router-dom";


export default function useAuth() {
    const navigate = useNavigate();

    function setToLocalStorage(value){
        localStorage.setItem("user",value)
    }

    function getFromLocalStorage(){
      if(localStorage.getItem("user")) return jwtDecode(localStorage.getItem("user"))
        
        return localStorage.getItem("user")
    }

    function removeToken(){

        localStorage.removeItem("user")
        navigate("/sign-in")
    }



  return{
    setToLocalStorage,
    getFromLocalStorage,
    removeToken
  }
}
