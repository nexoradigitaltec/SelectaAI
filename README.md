# SelectAI

Landing page da SelectAI, criada com React, TypeScript e Vite.

## Publicar no GitHub Pages

1. Envie estes arquivos para um repositório GitHub na branch `main` ou `master`.
2. No repositório, abra **Settings → Pages** e escolha **GitHub Actions** como fonte de publicação.
3. A cada envio para a branch principal, a ação em `.github/workflows/deploy.yml` compila e publica o site.
4. Acompanhe **Actions** até o deploy terminar. O endereço publicado aparecerá no job `Deploy SelectAI to GitHub Pages`.

O workflow configura automaticamente o caminho dos assets para repositórios de projeto e para repositórios `usuario.github.io`.

## Executar localmente

```bash
npm ci
npm run dev
```

Não abra `index.html` diretamente: Vite precisa servir os módulos e assets da aplicação. Para testar a versão de produção localmente:

```bash
npm run build
npm run preview
```
