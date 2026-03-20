
# Perto de Mim — Fase 1: Páginas Públicas

## Configuração Inicial
- Copiar logos para o projeto (logo colorida, preta, branca, símbolo/favicon)
- Configurar paleta de cores customizada no Tailwind (azul-roxo #6B6FD4, dark #0D0D1A, etc.)
- Implementar Dark/Light mode com toggle no header (dark como padrão, salvo no localStorage)
- Configurar fontes Nunito (títulos) e Inter (corpo)

## Layout Global
- **Header**: Logo + navegação (Home, Empresas, Classificados, Planos, Sobre, Contato, Blog) + toggle dark/light + botão "Anuncie Grátis" + hamburger menu no mobile
- **Footer**: Logo branca, links, redes sociais, copyright

## Páginas a Construir

### 1. Home (/)
- Hero com gradiente escuro, logo grande, headline, barra de pesquisa com dropdown de categoria
- Seção categorias em grid com ícones (12 categorias)
- Empresas em destaque (carousel com cards premium — dados mock)
- Classificados em alta (grid de cards — dados mock)
- Seção "Como funciona" (3 passos)
- Depoimentos (carousel)
- Micro-interações: hover nos cards, animações de entrada

### 2. Todas as Empresas (/empresas)
- Grid de cards com busca e filtros (categoria, cidade)
- Cards com badge de plano (Premium/Pro/Smart)
- Ordenação visual por tier de plano
- Paginação

### 3. Perfil da Empresa (/empresa/:slug)
- Versão Smart (básica): logo, info, contato, mapa placeholder
- Versão Premium (landing page modelo "Elegance"): hero full, seções sobre/serviços/galeria/depoimentos/contato
- Botão flutuante WhatsApp

### 4. Classificados (/classificados)
- Grid com filtros (categoria, cidade, preço)
- Cards com foto, título, preço, cidade, data

### 5. Planos (/planos)
- 3 cards lado a lado com todos os recursos (✅/❌)
- Toggle mensal/anual
- Preços com desconto riscado
- FAQ accordion

### 6. Sobre Nós (/sobre)
- História, missão/visão/valores, equipe mock, números

### 7. FAQ (/faq)
- Accordion organizado por categorias

### 8. Contato (/contato)
- Formulário + info de contato + mapa placeholder

### 9. Blog (/blog e /blog/:slug)
- Grid de artigos mock + página de artigo individual

## Design & UX
- Mobile-first, totalmente responsivo
- Skeleton loading nos cards
- Badges animados (Premium dourado com shimmer, Pro prata, Smart outline)
- Hover com elevação e escala nos cards
- Transição suave de 300ms no dark/light mode
