# Projeto API - Disney

Breve projeto front-end que consome a API pública da Disney (https://api.disneyapi.dev) e apresenta uma listagem paginada de personagens.

**Funcionalidades principais**
- Gerar e carregar personagens (botão "Gerar personagens").
- Busca por nome com debounce (campo "Buscar personagem").
- Paginação simples (Anterior / Próximo).
- Cards com imagem e nome dos personagens.

**Estrutura do projeto**
- `html/` - arquivos HTML (a principal é `html/index.html`).
- `js/` - scripts do projeto: `api.js`, `main.js`, `utils.js`.
- `bootstrap/` - arquivos CSS e JS do Bootstrap usados para layout.
- `vercel.json` - configuração para deploy estático no Vercel.
- `README_DEPLOY_VERCEL.md` - instruções específicas para deploy no Vercel.

**Como rodar localmente**
Opções simples (o projeto é estático):

1) Abrir o arquivo diretamente no navegador:

   - Abra `html/index.html` no navegador.

2) Usar um servidor estático (recomendado para evitar problemas de CORS):

```bash
# com Node (serve)
npx serve . -p 5000
# ou com Python 3
python -m http.server 5000
```

Em seguida acesse `http://localhost:5000/html/index.html`.

**API usada**
- Endpoint: `https://api.disneyapi.dev/character`.
- A lógica de paginação e busca está em `js/api.js`.
