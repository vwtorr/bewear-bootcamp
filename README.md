# 🛍️ E-commerce BEWEAR

Um e-commerce moderno e responsivo para venda de roupas, tênis, mochilas e acessórios, construído com as mais recentes tecnologias web.

## ✨ Funcionalidades

- 🛒 **Carrinho de compras completo** com persistência por usuário
- 🔐 **Sistema de autenticação seguro** com BetterAuth
- 📱 **Design totalmente responsivo** para mobile e desktop
- 🎨 **Interface moderna e intuitiva** com shadcn/ui
- 🔍 **Catálogo de produtos** com categorias e variantes (cores, preços)
- 👤 **Gestão de perfil** com informações pessoais
- 📦 **Sistema completo de pedidos** com status (pendente, pago, cancelado)
- 📍 **Múltiplos endereços de entrega** por usuário
- 💳 **Checkout integrado** com validação completa
- 🚀 **Performance otimizada** com Next.js 15 e cache inteligente

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### Backend & Database
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM moderno e type-safe
- **BetterAuth** - Sistema de autenticação

### Ferramentas de Desenvolvimento
- **TypeScript** - Desenvolvimento type-safe
- **ESLint** - Linting de código
- **Prettier** - Formatação de código

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+ 
- PostgreSQL
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/ecommerce-platform.git
cd ecommerce-platform
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:
```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ecommerce"

# Authentication
BETTER_AUTH_SECRET="seu-secret-aqui"
BETTER_AUTH_URL="http://localhost:3000"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
```

4. **Configure o banco de dados**
```bash
# Execute as migrations
npm run db:migrate

# (Opcional) Popular com dados de exemplo
npm run db:seed
```

5. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) em seu navegador.

## 📁 Estrutura do Projeto

```
├── app/                    # App Router (Next.js 15)
│   ├── (auth)/            # Rotas de autenticação
│   ├── cart/              # Carrinho e checkout
│   ├── products/          # Páginas de produtos
│   └── globals.css        # Estilos globais
├── components/            # Componentes reutilizáveis
│   └── ui/               # Componentes shadcn/ui
├── db/                   # Configuração do banco
│   ├── schema.ts         # Schemas Drizzle
│   └── migrations/       # Migrations
├── lib/                  # Utilitários e configurações
├── hooks/                # Custom hooks
├── types/                # Definições TypeScript
└── public/               # Arquivos estáticos
```

## 🗃️ Schema do Banco de Dados

### Entidades Principais

#### 👤 **Autenticação e Usuários**
- **`user`** - Dados dos usuários (nome, email, imagem)
- **`session`** - Sessões ativas dos usuários  
- **`account`** - Contas de provedores externos (OAuth)
- **`verification`** - Tokens de verificação

#### 🛍️ **Catálogo de Produtos**
- **`category`** - Categorias dos produtos (roupas, calçados, etc.)
- **`product`** - Produtos base (nome, descrição, categoria)
- **`product_variant`** - Variantes dos produtos (cor, preço, imagem)

#### 🛒 **Carrinho e Pedidos**
- **`cart`** - Carrinho de compras do usuário
- **`cart_item`** - Itens individuais do carrinho
- **`order`** - Pedidos finalizados com status
- **`order_item`** - Itens de cada pedido

#### 📍 **Endereços**
- **`shipping_address`** - Endereços de entrega dos usuários

### Status de Pedidos
- `pending` - Aguardando pagamento
- `paid` - Pago e confirmado
- `canceled` - Cancelado

## 🎨 Design System

O projeto utiliza uma paleta de cores moderna e componentes consistentes:

- **Componentes**: Baseados no shadcn/ui
- **Tipografia**: Sistema de escalas responsivas
- **Cores**: Paleta neutra com acentos vibrantes
- **Espaçamento**: Grid system baseado em Tailwind CSS

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Build para produção
npm run start        # Inicia servidor de produção

# Database
npm run db:generate  # Gera migrations
npm run db:migrate   # Executa migrations
npm run db:studio    # Abre Drizzle Studio

# Linting
npm run lint         # Executa ESLint
npm run type-check   # Verificação de tipos
```

## 📦 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Docker

```bash
# Build da imagem
docker build -t ecommerce-app .

# Execute o container
docker run -p 3000:3000 ecommerce-app
```
---

⭐ Se este projeto te ajudou, deixe uma estrela no repositório!
