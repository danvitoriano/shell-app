'use client'
import { useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { registerApplication, start } from 'single-spa'

export default function Home() {
  useEffect(() => {
    // Registrar os microfrontends
    registerApplication({
      name: 'header-mf',
      app: () => import('./microfrontends/header-mf'),
      activeWhen: () => true,
    })

    registerApplication({
      name: 'sidebar-mf',
      app: () => import('./microfrontends/sidebar-mf'),
      activeWhen: () => true,
    })

    registerApplication({
      name: 'main-content-mf',
      app: () => import('./microfrontends/main-content-mf'),
      activeWhen: () => true,
    })

    registerApplication({
      name: 'footer-mf',
      app: () => import('./microfrontends/footer-mf'),
      activeWhen: () => true,
    })

    // Iniciar o Single-SPA
    start()
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ width: '100%', zIndex: 1100 }}>
        <div id="header-mf-container" />
      </Box>

      {/* Main Layout */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <Box sx={{ width: 280, flexShrink: 0 }}>
          <div id="sidebar-mf-container" />
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="lg">
            <div id="main-content-mf-container" />
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ width: '100%', mt: 'auto' }}>
        <div id="footer-mf-container" />
      </Box>
    </Box>
  )
}
