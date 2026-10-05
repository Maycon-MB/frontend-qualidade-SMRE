# Portal do Colaborador SMREDE

Front-end do Portal do Colaborador da Santa Mônica Rede: contracheque, ramais, aniversariantes,
documentos da Qualidade e o Guia do Portal. Usa o mesmo login e o mesmo backend do
[site original](https://portaldocolaborador.smrede.net.br/).

## Requisitos

Node 22 e npm 10.

## Instalação

Na pasta `FrontEnd`:

```
npm ci
cp .env.example .env
npm start
```

Abra http://localhost:3000/frontend-qualidade-SMRE/. Abrir só `localhost:3000` não carrega o app,
porque o caminho vem do `homepage` do `package.json`.

> **Atenção:** o ambiente local e o beta usam o backend de produção. Login, upload e cadastro
> mexem em dados reais.

## Configuração

| Variável | Para que |
|---|---|
| `REACT_APP_BACKEND` | Endereço da API. O padrão do `.env.example` é o backend de produção. |

O `.env` só é lido quando o `npm start` ou o build começa. Depois de mudar o arquivo, reinicie o
`npm start` ou publique de novo.

Os scripts de build preenchem `REACT_APP_FASE` (esconde menus em construção na produção) e
`REACT_APP_ALVO` (gera só o tutorial dos Termos). Não coloque essas duas no `.env`.

## Publicar

Tudo vai para o GitHub Pages, cada versão numa pasta. Rode na pasta `FrontEnd`.

| Comando | Endereço | Quando |
|---|---|---|
| `npm run deploy:beta` | https://maycon-mb.github.io/frontend-qualidade-SMRE/beta/ | Sempre primeiro, para conferir |
| `npm run deploy` | https://maycon-mb.github.io/frontend-qualidade-SMRE/ | Produção, depois do beta aprovado (não verificado) |
| `npm run deploy:tutorial-termo` | https://maycon-mb.github.io/frontend-qualidade-SMRE/tutorial-termo/ | Tutorial dos Termos de Compromisso, sem login nem Portal (não verificado) |

O tutorial usa os mesmos arquivos do Guia do Portal (`src/Pages/Guia/conteudoTermo.jsx`). Um
ajuste de texto ali vale para os dois, mas cada endereço só muda depois do seu próprio deploy.

Para hospedar o tutorial em outro servidor, troque o `PUBLIC_URL` do script `build:tutorial-termo`
pelo endereço novo e rode `npm run build:tutorial-termo`. O resultado fica na pasta `build`.
