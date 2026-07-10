This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.






Leia isto para entender o programa

```md
# 🛒 MagicX - Loja de Componentes Eletrônicos

## 📋 Visão Geral

MagicX é uma loja online de componentes eletrônicos construída com **Next.js 16**, **TypeScript**, **Tailwind CSS** e **Supabase** (backend). O sistema suporta navegação por categorias, carrinho de compras, avaliações de produtos, autenticação real de usuários, histórico de compras e painel administrativo.

---

## 🎯 Objetivos

- Fornecer uma plataforma simples para venda de peças eletrônicas
- Permitir que usuários naveguem por categorias de produtos
- Carrinho de compras funcional com persistência online
- Sistema de avaliações e comentários nos produtos
- Autenticação real de usuários (Supabase Auth)
- Histórico de compras por usuário
- Painel admin com CRUD de produtos e gestão de usuários
- Interface responsiva com dark mode

---

## 🚀 Tecnologias

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth)
- **Deploy:** Vercel

---

## 📁 Estrutura de Pastas

```
catalogo/
├── app/
│   ├── api/
│   │   └── usuarios/route.ts        # API para listar usuários (admin)
│   ├── components/
│   │   ├── header.tsx               # Header com navegação, carrinho, perfil
│   │   ├── BannerCarrossel.tsx      # Carrossel de banners
│   │   ├── BotaoAdmin.tsx           # Botão flutuante ⚙️ (admin)
│   │   ├── ModalAdmin.tsx           # Painel admin: CRUD produtos + usuários
│   │   ├── ModalCarrinho.tsx        # Carrinho de compras
│   │   ├── ModalHistorico.tsx       # Histórico de compras
│   │   ├── ModalLogin.tsx           # Login / Registro
│   │   └── ParticulasFundo.tsx      # Partículas animadas
│   ├── contexts/
│   │   ├── AuthContext.tsx           # Autenticação via Supabase
│   │   ├── AdminContext.tsx          # Gestão de produtos (Supabase)
│   │   ├── CarrinhoContext.tsx       # Carrinho (localStorage)
│   │   ├── AvaliacaoContext.tsx      # Avaliações (localStorage)
│   │   └── HistoricoContext.tsx      # Histórico (localStorage)
│   ├── categoria/[slug]/page.tsx    # Página de categoria
│   ├── produto/[id]/page.tsx        # Página de detalhes do produto
│   ├── perfil/page.tsx              # Perfil do usuário
│   ├── layout.tsx                   # Layout raiz
│   ├── page.tsx                     # Página inicial
│   └── lib/supabase.ts              # Cliente Supabase
├── src/data/
│   └── banners.ts                   # Dados do carrossel
├── public/                          # Imagens estáticas
└── .env.local                       # Variáveis de ambiente
```

---

## 🔐 Autenticação

- **Supabase Auth** com email e senha
- Registro com: nome, email, senha, telefone, morada
- Senha exige mínimo de 6 caracteres
- Email validado (precisa conter @ e .)

### Conta de Administrador
- **Email:** `admin@magicx.com`
- **Senha:** `admin123`

Após login admin, aparece ícone ⚙️ no canto inferior direito com acesso ao painel.

---

## ⚙️ Painel Administrativo

Acessível apenas para admin (`admin@magicx.com`):

- **Produtos:** Listar, criar, editar, remover
- **Usuários:** Ver todos os usuários cadastrados
- Upload de imagem do computador ou via URL
- Campos: nome, descrição, preço, preço original, estoque, categoria

---

## 🛒 Carrinho & Compras

- Qualquer visitante pode adicionar ao carrinho
- Apenas usuários logados podem finalizar compra
- Histórico de compras por usuário

---

## ⭐ Avaliações

- Apenas usuários logados podem avaliar
- Nota de 1 a 5 estrelas
- Um usuário só pode dar nota uma vez por produto
- Pode comentar mais vezes (sem nova nota)

---

## 📦 Adicionar Novos Produtos

Via painel admin (⚙️) ou diretamente no banco Supabase.

---

## 🚀 Deploy

1. Push para GitHub
2. Importar na Vercel
3. Configurar variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

---

## 📚 Método de Ensino

Este projeto foi construído seguindo o método:
1. O professor explica o próximo conceito pequeno
2. O aluno implementa uma parte específica
3. O professor revisa e aponta correções
4. Quando necessário, o professor faz a parte mais complexa ("faz só você")
5. Só avançamos quando o atual está funcionando

---

## 📄 Licença

Projeto - MagicX 2026
```

