# Micro-Frontend Shell App

Esta é a aplicação shell (orquestradora) do projeto de micro-frontends usando **Next.js**, **Single-SPA** e **Material UI**.

## 🏗️ Arquitetura

A aplicação é composta por micro-frontends independentes:

- **Header MF**: Barra de navegação superior
- **Sidebar MF**: Menu lateral de navegação
- **Main Content MF**: Conteúdo principal da aplicação
- **Footer MF**: Rodapé com informações e links

## 🔗 Micro-Frontend Repositories

Cada micro-frontend possui seu próprio repositório para desenvolvimento e deploy independente:

### 📱 Header Micro-Frontend
- **Repositório**: [header-mf](https://github.com/danvitoriano/header-mf)
- **Porta**: 3001
- **Deploy**: [header-mf-danvitoriano.vercel.app](https://header-mf-danvitoriano.vercel.app)

### 📋 Sidebar Micro-Frontend  
- **Repositório**: [sidebar-mf](https://github.com/danvitoriano/sidebar-mf)
- **Porta**: 3002
- **Deploy**: [sidebar-mf-danvitoriano.vercel.app](https://sidebar-mf-danvitoriano.vercel.app)

### 📄 Main Content Micro-Frontend
- **Repositório**: [main-content-mf](https://github.com/danvitoriano/main-content-mf)
- **Porta**: 3003
- **Deploy**: [main-content-mf-danvitoriano.vercel.app](https://main-content-mf-danvitoriano.vercel.app)

### 🦶 Footer Micro-Frontend
- **Repositório**: [footer-mf](https://github.com/danvitoriano/footer-mf)
- **Porta**: 3004
- **Deploy**: [footer-mf-danvitoriano.vercel.app](https://footer-mf-danvitoriano.vercel.app)

### 🏠 Shell App (Este Repositório)
- **Repositório**: [shell-app](https://github.com/danvitoriano/shell-app)
- **Porta**: 3000
- **Deploy**: [shell-app-danvitoriano.vercel.app](https://shell-app-danvitoriano.vercel.app)

> **Nota**: Atualize as URLs de deploy conforme seus deployments reais no Vercel.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Single-SPA** - Orquestração de micro-frontends
- **Material UI** - Biblioteca de componentes
- **Emotion** - CSS-in-JS (usado pelo Material UI)

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
npm install
```

### Execução em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### Build para Produção

```bash
npm run build
npm start
```

## 🌐 Deploy na Vercel

### Deploy Automático via GitHub

1. Faça push do código para um repositório GitHub
2. Conecte o repositório na Vercel
3. A Vercel detectará automaticamente como um projeto Next.js
4. Configure as variáveis de ambiente se necessário
5. Deploy será feito automaticamente

### Deploy Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📁 Estrutura do Projeto

```
shell-app/
├── src/
│   └── app/
│       ├── microfrontends/        # Micro-frontends
│       │   ├── header-mf.tsx      # Header
│       │   ├── sidebar-mf.tsx     # Sidebar
│       │   ├── main-content-mf.tsx # Conteúdo principal
│       │   └── footer-mf.tsx      # Footer
│       ├── globals.css            # Estilos globais
│       ├── layout.tsx             # Layout principal
│       ├── page.tsx               # Página inicial
│       └── theme.ts               # Tema Material UI
├── package.json
└── README.md
```

## 🎨 Personalização

### Tema

O tema do Material UI pode ser personalizado no arquivo `src/app/theme.ts`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul
    },
    secondary: {
      main: '#dc004e', // Rosa
    },
  },
})
```

### Micro-frontends

Cada micro-frontend está localizado em `src/app/microfrontends/` e implementa:

- **mount()**: Função para montar o componente
- **unmount()**: Função para desmontar o componente
- Componente React com Material UI

## 🔧 Configuração do Single-SPA

Os micro-frontends são registrados no arquivo `page.tsx`:

```typescript
registerApplication({
  name: 'header-mf',
  app: () => import('./microfrontends/header-mf'),
  activeWhen: () => true,
})
```

## 📝 Scripts Disponíveis

- `npm run dev` - Execução em desenvolvimento
- `npm run build` - Build para produção
- `npm start` - Execução em produção
- `npm run lint` - Verificação de linting

## 🌟 Funcionalidades

- ✅ Layout responsivo
- ✅ Tema personalizado Material UI
- ✅ Arquitetura micro-frontend
- ✅ TypeScript
- ✅ Otimizado para Vercel
- ✅ Single-SPA para orquestração

## 📄 Licença

MIT License

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
