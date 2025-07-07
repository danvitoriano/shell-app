'use client'
import React, { Suspense } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

// Carregamento dinâmico do componente remoto
const RemoteSidebar = React.lazy(() => 
  import('sidebar_mf/Sidebar').catch(() => {
    console.log('Sidebar remote não disponível, usando fallback')
    return import('../app/microfrontends/sidebar-mf')
  })
)

const RemoteSidebarWrapper = () => {
  return (
    <Suspense 
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
          <CircularProgress size={20} />
          <Typography variant="body2">Carregando Sidebar...</Typography>
        </Box>
      }
    >
      <RemoteSidebar />
    </Suspense>
  )
}

export default RemoteSidebarWrapper 