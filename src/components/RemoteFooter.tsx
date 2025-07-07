'use client'
import React, { Suspense } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

// Carregamento dinâmico do componente remoto
const RemoteFooter = React.lazy(() => 
  import('footer_mf/Footer').catch(() => {
    console.log('Footer remote não disponível, usando fallback')
    return import('../app/microfrontends/footer-mf')
  })
)

const RemoteFooterWrapper = () => {
  return (
    <Suspense 
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
          <CircularProgress size={20} />
          <Typography variant="body2">Carregando Footer...</Typography>
        </Box>
      }
    >
      <RemoteFooter />
    </Suspense>
  )
}

export default RemoteFooterWrapper 