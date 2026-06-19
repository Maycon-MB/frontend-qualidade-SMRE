# Guia Definitivo: Como Hospedar Qualquer Projeto no GitHub Pages de Graça 🚀

O **GitHub Pages** é uma ferramenta incrível e gratuita que pega os arquivos do seu repositório no GitHub e os transforma em um site real na internet, acessível por qualquer pessoa (geralmente no endereço `https://seu-usuario.github.io/nome-do-projeto`).

A forma de configurar o GitHub Pages muda um pouco dependendo se o seu projeto é **simples** ou **avançado**. Abaixo, você aprende a fazer os dois!

---

## 🌍 Cenário 1: Projetos Simples (HTML, CSS e JS puro)

Se o seu projeto é basicamente um arquivo `index.html`, estilos `.css` e imagens, o processo não exige nenhuma instalação. O navegador já entende esses arquivos perfeitamente.

**Passo a passo:**
1. **Suba o código para o GitHub:** Garanta que seu arquivo principal se chame exatamente `index.html` e que ele esteja na raiz do seu repositório (não dentro de pastas secundárias).
2. **Acesse as Configurações:** Na página principal do seu repositório no GitHub, clique na aba **⚙️ Settings** (Configurações).
3. **Menu lateral:** Na barra do lado esquerdo, procure pela opção **Pages** (dentro da categoria *Code and automation*).
4. **Escolha a Fonte (Source):** 
   - Em *Build and deployment*, certifique-se de que a opção **Deploy from a branch** está selecionada.
   - Abaixo, escolha a branch principal do seu projeto (geralmente se chama `main` ou `master`).
   - Mantenha a pasta como `/ (root)`.
   - Clique em **Save**.
5. **Aguarde a Magia:** Em 1 ou 2 minutos, o GitHub vai processar os arquivos. Recarregue a página de configurações e você verá uma mensagem verde com o link oficial do seu site!

> **Sempre que você modificar o seu código** no GitHub, o seu site será atualizado automaticamente em alguns minutos.

---

## ⚛️ Cenário 2: Projetos em React (e outros Frameworks)

Projetos feitos em React, Angular ou Vue são um pouco diferentes. O código que você escreve neles não pode ser lido diretamente pelo navegador. Ele precisa passar por um processo chamado **Build**, que transforma o seu código React em arquivos HTML/CSS puros que o navegador entende.

Para que você não precise fazer esse processo na mão, nós usamos um "ajudante" chamado `gh-pages`. É ele que vai compilar e colocar o seu site no ar automaticamente.

**Passo a passo:**

### 1. Atualize o seu `package.json`
Abra o seu projeto no VS Code, abra o arquivo `package.json` e adicione a URL que o seu site terá lá no começo do arquivo. Fica assim:

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "homepage": "https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO",
  ...
}
```

### 2. Instale o pacote publicador
No terminal, dentro da pasta do projeto, rode o comando abaixo para instalar o publicador mágico:
```bash
npm install gh-pages --save-dev
```

### 3. Crie os "Atalhos" de publicação
No mesmo arquivo `package.json`, encontre a seção `"scripts"` e adicione duas novas linhas (`predeploy` e `deploy`):

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
```
*(Não esqueça da vírgula na linha anterior se necessário!)*

### 4. Publique o site!
Agora toda a configuração difícil acabou. Sempre que você quiser publicar a versão atual do seu projeto na internet, basta abrir o terminal e rodar:

```bash
npm run deploy
```

**O que esse comando faz?**
Ele primeiro roda o "build" (criando a versão otimizada do site) e, em seguida, envia apenas essa versão otimizada para uma pasta escondida (chamada `gh-pages`) no seu repositório no GitHub.

**Último detalhe:**
Vá até a aba **⚙️ Settings > Pages** do seu repositório lá no site do GitHub e certifique-se de que a branch selecionada é a `gh-pages` (e não a `main`). O seu site já estará no ar!
