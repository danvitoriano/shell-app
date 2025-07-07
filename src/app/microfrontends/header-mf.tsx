'use client'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton 
} from '@mui/material'
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material'

const HeaderMicroFrontend = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          🚀 Micro-Frontend App - HOT RELOAD FUNCIONANDO!
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Sobre</Button>
          <Button color="inherit">Contato</Button>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

// Single-SPA lifecycle functions
export const bootstrap = () => Promise.resolve()

export const mount = (props: any) => {
  const container = document.getElementById('header-mf-container')
  if (container) {
    const root = createRoot(container)
    root.render(<HeaderMicroFrontend />)
    return Promise.resolve()
  }
  return Promise.reject('Container not found')
}

export const unmount = (props: any) => {
  const container = document.getElementById('header-mf-container')
  if (container) {
    container.innerHTML = ''
  }
  return Promise.resolve()
}

export default HeaderMicroFrontend 