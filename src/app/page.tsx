'use client'
import { useEffect, useState } from 'react'
import { Box, Container, Typography, Alert } from '@mui/material'
import { registerApplication, start } from 'single-spa'

export default function Home() {
  const [microfrontendsStatus, setMicrofrontendsStatus] = useState({
    header: false,
    sidebar: false,
    mainContent: false,
    footer: false
  })

  useEffect(() => {
    // Verificar se os microfrontends estão disponíveis
    const checkMicrofrontends = async () => {
      const checks = {
        header: false,
        sidebar: false,
        mainContent: false,
        footer: false
      }

      try {
        // Verificar header-mf (porta 3001)
        const headerResponse = await fetch('http://localhost:3001', { mode: 'no-cors' })
        checks.header = true
      } catch (e) {
        console.log('Header MF não disponível em localhost:3001')
      }

      try {
        // Verificar sidebar-mf (porta 3002)
        const sidebarResponse = await fetch('http://localhost:3002', { mode: 'no-cors' })
        checks.sidebar = true
      } catch (e) {
        console.log('Sidebar MF não disponível em localhost:3002')
      }

      try {
        // Verificar main-content-mf (porta 3003)
        const mainResponse = await fetch('http://localhost:3003', { mode: 'no-cors' })
        checks.mainContent = true
      } catch (e) {
        console.log('Main Content MF não disponível em localhost:3003')
      }

      try {
        // Verificar footer-mf (porta 3004)
        const footerResponse = await fetch('http://localhost:3004', { mode: 'no-cors' })
        checks.footer = true
      } catch (e) {
        console.log('Footer MF não disponível em localhost:3004')
      }

      setMicrofrontendsStatus(checks)
    }

    checkMicrofrontends()

    // Função para carregar microfrontend remoto
    const loadRemoteMicrofrontend = async (url: string, globalName: string, fallbackImport: () => Promise<any>) => {
      try {
        const response = await fetch(url)
        if (response.ok) {
          // Carregar o script do microfrontend remoto
          const script = document.createElement('script')
          script.src = url
          document.head.appendChild(script)
          
          // Aguardar o script carregar e retornar as funções do Single-SPA
          return new Promise((resolve) => {
            script.onload = () => {
              const remoteMF = (window as any)[globalName]
              if (remoteMF) {
                resolve({
                  bootstrap: () => Promise.resolve(),
                  mount: (props: any) => {
                    const container = document.getElementById(props.name + '-container')
                    if (container && remoteMF.mount) {
                      remoteMF.mount(container)
                    }
                    return Promise.resolve()
                  },
                  unmount: (props: any) => {
                    const container = document.getElementById(props.name + '-container')
                    if (container && remoteMF.unmount) {
                      remoteMF.unmount(container)
                    }
                    return Promise.resolve()
                  }
                })
              } else {
                console.log(`${globalName} não encontrado, usando fallback`)
                resolve(fallbackImport())
              }
            }
            script.onerror = () => {
              console.log(`Erro ao carregar ${url}, usando fallback`)
              resolve(fallbackImport())
            }
          })
        }
      } catch (error) {
        console.log(`Erro ao carregar ${url}, usando fallback local`)
      }
      return fallbackImport()
    }

    // Registrar microfrontends (com fallback para locais)
    registerApplication({
      name: 'header-mf',
      app: () => loadRemoteMicrofrontend(
        'http://localhost:3001/microfrontend.js',
        'headerMicrofrontend',
        () => import('./microfrontends/header-mf')
      ),
      activeWhen: () => true,
    })

    registerApplication({
      name: 'sidebar-mf',
      app: () => loadRemoteMicrofrontend(
        'http://localhost:3002/microfrontend.js',
        'sidebarMicrofrontend',
        () => import('./microfrontends/sidebar-mf')
      ),
      activeWhen: () => true,
    })

    registerApplication({
      name: 'main-content-mf',
      app: () => loadRemoteMicrofrontend(
        'http://localhost:3003/microfrontend.js',
        'mainContentMicrofrontend',
        () => import('./microfrontends/main-content-mf')
      ),
      activeWhen: () => true,
    })

    registerApplication({
      name: 'footer-mf',
      app: () => loadRemoteMicrofrontend(
        'http://localhost:3004/microfrontend.js',
        'footerMicrofrontend',
        () => import('./microfrontends/footer-mf')
      ),
      activeWhen: () => true,
    })

    // Iniciar o Single-SPA
    start()
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Status dos Micro-frontends */}
      <Box sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" gutterBottom>
          Status dos Micro-frontends Remotos:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Alert severity={microfrontendsStatus.header ? "success" : "warning"} sx={{ minWidth: 200 }}>
            Header: {microfrontendsStatus.header ? "Online :3001" : "Offline (fallback local)"}
          </Alert>
          <Alert severity={microfrontendsStatus.sidebar ? "success" : "warning"} sx={{ minWidth: 200 }}>
            Sidebar: {microfrontendsStatus.sidebar ? "Online :3002" : "Offline (fallback local)"}
          </Alert>
          <Alert severity={microfrontendsStatus.mainContent ? "success" : "warning"} sx={{ minWidth: 200 }}>
            Main: {microfrontendsStatus.mainContent ? "Online :3003" : "Offline (fallback local)"}
          </Alert>
          <Alert severity={microfrontendsStatus.footer ? "success" : "warning"} sx={{ minWidth: 200 }}>
            Footer: {microfrontendsStatus.footer ? "Online :3004" : "Offline (fallback local)"}
          </Alert>
        </Box>
      </Box>

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
