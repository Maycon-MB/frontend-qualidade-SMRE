# Como publicar seu próprio Fork no GitHub Pages

Este projeto já está pré-configurado para ser publicado facilmente no GitHub Pages. Se você fez um *fork* deste repositório, basta seguir os 3 passos abaixo:

### 1️⃣ Atualize a URL do projeto
Abra o arquivo `FrontEnd/package.json` e encontre a seguinte linha no começo do arquivo:
```json
"homepage": "https://Maycon-MB.github.io/frontend-qualidade-SMRE",
```
Substitua essa linha com o SEU nome de usuário do GitHub e o NOME do seu repositório:
```json
"homepage": "https://SEU-USUARIO.github.io/NOME-DO-SEU-FORK",
```

### 2️⃣ Instale as dependências
Abra o terminal na pasta `FrontEnd` e instale as dependências do projeto rodando o comando:
```bash
cd FrontEnd
npm install
```

### 3️⃣ Publique o site!
Ainda no terminal, rode o nosso comando mágico:
```bash
npm run deploy
```

**E pronto!** Esse único comando vai "compilar" todo o código React, criar uma branch chamada `gh-pages` escondida e mandar pro GitHub automaticamente. 

Em um ou dois minutos, o GitHub Pages vai colocar o seu site no ar na URL que você configurou no Passo 1! 🚀
