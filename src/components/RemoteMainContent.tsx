'use client'
import React, { Suspense } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

// Carregamento dinâmico do componente remoto
const RemoteMainContent = React.lazy(() => 
  import('main_content_mf/MainContent').catch(() => {
    console.log('MainContent remote não disponível, usando fallback')
    return import('../app/microfrontends/main-content-mf')
  })
)

const RemoteMainContentWrapper = () => {
  return (
    <Suspense 
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
          <CircularProgress size={20} />
          <Typography variant="body2">Carregando Main Content...</Typography>
        </Box>
      }
    >
      <RemoteMainContent />
    </Suspense>
  )
}

export default RemoteMainContentWrapper 