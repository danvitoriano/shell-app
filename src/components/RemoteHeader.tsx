'use client'
import React, { Suspense } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

// Carregamento dinâmico do componente remoto
const RemoteHeader = React.lazy(() => 
  import('header_mf/Header').catch(() => {
    console.log('Header remote não disponível, usando fallback')
    return import('../app/microfrontends/header-mf')
  })
)

const RemoteHeaderWrapper = () => {
  return (
    <Suspense 
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
          <CircularProgress size={20} />
          <Typography variant="body2">Carregando Header...</Typography>
        </Box>
      }
    >
      <RemoteHeader />
    </Suspense>
  )
}

export default RemoteHeaderWrapper 