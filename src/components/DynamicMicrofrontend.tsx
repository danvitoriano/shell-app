'use client'
import React, { useState, useEffect, useRef } from 'react'
import { CircularProgress, Typography, Box, IconButton, Tooltip } from '@mui/material'
import { Refresh as RefreshIcon } from '@mui/icons-material'

interface DynamicMicrofrontendProps {
  name: string
  url: string
  globalName: string
  fallback: React.ComponentType
}

const DynamicMicrofrontend: React.FC<DynamicMicrofrontendProps> = ({
  name,
  url,
  globalName,
  fallback: Fallback,
}) => {
  const [status, setStatus] = useState<'loading' | 'remote' | 'local' | 'error'>('loading')
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const microfrontendRef = useRef<any>(null)

  const loadMicrofrontend = async (showRefreshing = false) => {
    if (showRefreshing) {
      setIsRefreshing(true)
    } else {
      setStatus('loading')
    }

    try {
      // Adicionar timestamp para evitar cache
      const timestamp = new Date().getTime()
      const urlWithTimestamp = `${url}?t=${timestamp}`
      
      const response = await fetch(urlWithTimestamp)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const scriptContent = await response.text()
      
      // Remover script anterior se existir
      const existingScript = document.querySelector(`script[data-microfrontend="${globalName}"]`)
      if (existingScript) {
        existingScript.remove()
      }

      // Criar novo script
      const script = document.createElement('script')
      script.setAttribute('data-microfrontend', globalName)
      script.textContent = scriptContent
      document.head.appendChild(script)

      // Aguardar o script carregar
      await new Promise(resolve => setTimeout(resolve, 100))

      // Verificar se o microfrontend foi carregado
      if (window[globalName as keyof Window]) {
        const microfrontend = window[globalName as keyof Window] as any
        
        // Fazer unmount do anterior se existir
        if (microfrontendRef.current && containerRef.current) {
          try {
            microfrontendRef.current.unmount(containerRef.current)
          } catch (error) {
            console.warn('Erro ao fazer unmount:', error)
          }
        }

        // Fazer mount do novo
        if (containerRef.current) {
          await microfrontend.mount(containerRef.current)
          microfrontendRef.current = microfrontend
        }

        setStatus('remote')
        setLastUpdated(new Date().toLocaleTimeString())
        console.log(`✅ ${name} carregado remotamente`)
      } else {
        throw new Error(`Microfrontend ${globalName} não foi carregado`)
      }
    } catch (error) {
      console.error(`❌ Erro ao carregar ${name}:`, error)
      setStatus('local')
    } finally {
      setIsRefreshing(false)
    }
  }

  // Função para refresh manual
  const handleRefresh = () => {
    loadMicrofrontend(true)
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (microfrontendRef.current && containerRef.current) {
        try {
          microfrontendRef.current.unmount(containerRef.current)
        } catch (error) {
          console.warn('Erro ao fazer cleanup:', error)
        }
      }
    }
  }, [])

  // Carregar inicial
  useEffect(() => {
    loadMicrofrontend()
  }, [url, globalName])

  // Auto-refresh a cada 10 segundos apenas para APIs dinâmicas
  useEffect(() => {
    if (url.includes('/api/')) {
      const interval = setInterval(() => {
        loadMicrofrontend(true)
      }, 10000) // 10 segundos

      return () => clearInterval(interval)
    }
  }, [url])

  const getStatusIndicator = () => {
    switch (status) {
      case 'remote':
        return url.includes('/api/') ? '⚡' : '🟢'
      case 'local':
        return '🟠'
      default:
        return '🔄'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'remote':
        return url.includes('/api/') ? 'Dinâmico' : 'Remote'
      case 'local':
        return 'Local'
      default:
        return 'Carregando'
    }
  }

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
        <CircularProgress size={20} />
        <Typography variant="body2">Carregando {name}...</Typography>
      </Box>
    )
  }

  if (status === 'local') {
    return (
      <Box sx={{ position: 'relative' }}>
        <Fallback />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem',
            zIndex: 1000,
          }}
        >
          <span>{getStatusIndicator()}</span>
          <span>{getStatusText()}</span>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <div ref={containerRef} />
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: status === 'remote' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontSize: '0.75rem',
          zIndex: 1000,
        }}
      >
        <span>{getStatusIndicator()}</span>
        <span>{getStatusText()}</span>
        {lastUpdated && (
          <>
            <span>•</span>
            <span>{lastUpdated}</span>
          </>
        )}
        {url.includes('/api/') && (
          <Tooltip title="Atualizar agora">
            <IconButton
              size="small"
              onClick={handleRefresh}
              disabled={isRefreshing}
              sx={{ 
                color: 'white', 
                p: 0.5,
                ml: 0.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  )
}

export default DynamicMicrofrontend 