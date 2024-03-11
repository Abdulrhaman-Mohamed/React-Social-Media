import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider } from 'react-router-dom'


import { ThemeProvider } from "@material-tailwind/react";
import { CustomTheme } from './utils/CustomThem.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider value={CustomTheme}>
    <App />
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
