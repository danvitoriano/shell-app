'use client'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Box,
  Button,
  Chip
} from '@mui/material'
import { Code, Web, Settings } from '@mui/icons-material'

const MainContentMicroFrontend = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
        🎉 Bem-vindo ao Micro-Frontend - AGORA COM HOT RELOAD!
      </Typography>
      
      <Typography variant="h6" paragraph sx={{ color: '#666', mb: 4 }}>
        Esta é uma aplicação demonstrativa usando arquitetura de micro-frontends com Next.js e Single-SPA
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <Card sx={{ height: '100%' }}>
            <CardMedia
              component="div"
              sx={{
                height: 200,
                backgroundColor: '#e3f2fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Code sx={{ fontSize: 80, color: '#1976d2' }} />
            </CardMedia>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Arquitetura Micro-Frontend
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Implementação usando Single-SPA para orquestração de micro-frontends independentes. 
                Cada componente (header, sidebar, conteúdo, footer) é um microfrontend separado.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip label="Next.js" color="primary" size="small" />
                <Chip label="Single-SPA" color="secondary" size="small" />
                <Chip label="Material UI" color="info" size="small" />
              </Box>
              <Button variant="contained" color="primary">
                Saiba Mais
              </Button>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <Card sx={{ height: '100%' }}>
            <CardMedia
              component="div"
              sx={{
                height: 200,
                backgroundColor: '#f3e5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Web sx={{ fontSize: 80, color: '#dc004e' }} />
            </CardMedia>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Tecnologias Utilizadas
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Stack moderna com React, Next.js, Material UI e Single-SPA para criar uma experiência 
                de usuário rica e escalável com deployment independente.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip label="React" color="primary" size="small" />
                <Chip label="TypeScript" color="secondary" size="small" />
                <Chip label="Vercel" color="success" size="small" />
              </Box>
              <Button variant="outlined" color="secondary">
                Ver Código
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Settings color="primary" />
          Características da Aplicação
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '1 1 200px', textAlign: 'center', p: 2 }}>
            <Typography variant="h6" color="primary">Modular</Typography>
            <Typography variant="body2">Cada microfrontend é independente</Typography>
          </Box>
          <Box sx={{ flex: '1 1 200px', textAlign: 'center', p: 2 }}>
            <Typography variant="h6" color="primary">Escalável</Typography>
            <Typography variant="body2">Deploy independente de cada módulo</Typography>
          </Box>
          <Box sx={{ flex: '1 1 200px', textAlign: 'center', p: 2 }}>
            <Typography variant="h6" color="primary">Moderno</Typography>
            <Typography variant="body2">Tecnologias atuais e best practices</Typography>
          </Box>
          <Box sx={{ flex: '1 1 200px', textAlign: 'center', p: 2 }}>
            <Typography variant="h6" color="primary">Responsivo</Typography>
            <Typography variant="body2">Adaptável a diferentes dispositivos</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

// Single-SPA lifecycle functions
export const bootstrap = () => Promise.resolve()

export const mount = (props: any) => {
  const container = document.getElementById('main-content-mf-container')
  if (container) {
    const root = createRoot(container)
    root.render(<MainContentMicroFrontend />)
    return Promise.resolve()
  }
  return Promise.reject('Container not found')
}

export const unmount = (props: any) => {
  const container = document.getElementById('main-content-mf-container')
  if (container) {
    container.innerHTML = ''
  }
  return Promise.resolve()
}

export default MainContentMicroFrontend 