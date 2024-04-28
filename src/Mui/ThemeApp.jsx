import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import React from 'react'

export const ThemeApp = ({children}) => {

    const tema = createTheme({
        palette:{
          placeHolder:{
            main: '#143350'
          }
        }
    })
  return (
    <ThemeProvider theme={tema}>
        {children}
    </ThemeProvider>
  )
}
