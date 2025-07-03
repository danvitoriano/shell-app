'use client'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Box
} from '@mui/material'
import { 
  Home, 
  Info, 
  ContactMail, 
  Settings, 
  Dashboard,
  Article 
} from '@mui/icons-material'

const SidebarMicroFrontend = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, href: '#' },
    { text: 'Home', icon: <Home />, href: '#' },
    { text: 'Artigos', icon: <Article />, href: '#' },
    { text: 'Sobre', icon: <Info />, href: '#' },
    { text: 'Contato', icon: <ContactMail />, href: '#' },
    { text: 'Configurações', icon: <Settings />, href: '#' },
  ]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          position: 'relative',
          height: '100%',
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        <List>
          {menuItems.slice(0, 3).map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#1976d2' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.slice(3).map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#1976d2' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

// Single-SPA lifecycle functions
export const bootstrap = () => Promise.resolve()

export const mount = (props: any) => {
  const container = document.getElementById('sidebar-mf-container')
  if (container) {
    const root = createRoot(container)
    root.render(<SidebarMicroFrontend />)
    return Promise.resolve()
  }
  return Promise.reject('Container not found')
}

export const unmount = (props: any) => {
  const container = document.getElementById('sidebar-mf-container')
  if (container) {
    container.innerHTML = ''
  }
  return Promise.resolve()
}

export default SidebarMicroFrontend 