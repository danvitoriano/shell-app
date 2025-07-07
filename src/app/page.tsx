'use client'
import { Box, Container, Typography } from '@mui/material'
import DynamicMicrofrontend from '../components/DynamicMicrofrontend'
import HeaderMicroFrontend from './microfrontends/header-mf'
import SidebarMicroFrontend from './microfrontends/sidebar-mf'
import MainContentMicroFrontend from './microfrontends/main-content-mf'
import FooterMicroFrontend from './microfrontends/footer-mf'

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ width: '100%', zIndex: 1100 }}>
        <DynamicMicrofrontend
          name="Header"
          url="http://localhost:3001/api/microfrontend"
          globalName="headerMicrofrontend"
          fallback={HeaderMicroFrontend}
        />
      </Box>

      {/* Main Layout */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <Box sx={{ width: 280, flexShrink: 0 }}>
          <DynamicMicrofrontend
            name="Sidebar"
            url="http://localhost:3002/microfrontend.js"
            globalName="sidebarMicrofrontend"
            fallback={SidebarMicroFrontend}
          />
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="lg">
            <DynamicMicrofrontend
              name="Main Content"
              url="http://localhost:3003/microfrontend.js"
              globalName="mainContentMicrofrontend"
              fallback={MainContentMicroFrontend}
            />
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ width: '100%', mt: 'auto' }}>
        <DynamicMicrofrontend
          name="Footer"
          url="http://localhost:3004/microfrontend.js"
          globalName="footerMicrofrontend"
          fallback={FooterMicroFrontend}
        />
      </Box>

      {/* Info sobre carregamento dinâmico */}
      <Box sx={{ p: 2, backgroundColor: '#f0f0f0', textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          🌐 Micro-frontends carregados dinamicamente de repositórios externos
        </Typography>
        <Typography variant="caption" color="textSecondary">
          🟢 Remote: Carregado de outro servidor | 🟠 Local: Fallback local | ⚡ Dinâmico: Renderizado do React
        </Typography>
      </Box>
    </Box>
  )
}
