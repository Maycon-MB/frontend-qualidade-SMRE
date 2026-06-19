# Como publicar o repositório **frontend-qualidade-SMRE** no GitHub Pages

Este tutorial foi escrito para quem **fizer fork** deste repositório (https://github.com/Maycon-MB/frontend-qualidade-SMRE) e quiser transformar o front‑end já pronto em um site hospedado gratuitamente pelo GitHub Pages.

---

## 📦 Pré‑requisitos

1. **Conta no GitHub** (já deve ter feito o fork).  
2. **Node.js ≥ 18** (opcional – somente se quiser rodar o projeto localmente).  
3. **Git** instalado e configurado (`git --version`).

---

## 1️⃣ Clone o fork na sua máquina

```bash
# Substitua <SEU_USUARIO> pelo seu nome de usuário no GitHub
git clone https://github.com/<SEU_USUARIO>/frontend-qualidade-SMRE.git
cd frontend-qualidade-SMRE
```

---

## 2️⃣ Instale as dependências (apenas para desenvolvimento local)

> **Obs.:** O site é estático, mas o repositório usa React + Bootstrap.  
> Caso queira apenas publicar o build, você pode pular esta etapa.

```bash
npm install   # ou "yarn install" se preferir Yarn
```

---

## 3️⃣ Gere a versão estática (build)

```bash
npm run build   # cria a pasta "build" com arquivos HTML/CSS/JS prontos
```

A pasta `build` será criada na raiz do projeto (ou dentro de FrontEnd, dependendo de como você organizou).

---

## 4️⃣ Escolha a estratégia de publicação no GitHub Pages

### Opção A – **Branch `gh-pages`** (recomendado)

1. Instale o helper `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Adicione os scripts ao **package.json** (se ainda não existirem):
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Execute o deploy:
   ```bash
   npm run deploy
   ```
4. No GitHub, vá em **Settings → Pages** e selecione **Branch: `gh-pages`** → **Folder: `/ (root)`**. Salve.

### Opção B – **Branch `main` (raiz)**

1. Copie o conteúdo da pasta `build` para a raiz do repositório.
2. Em **Settings → Pages**, escolha **Branch: `main`** → **Folder: `/ (root)`**.

---

## 5️⃣ Verifique a URL do seu site

Após alguns segundos, o GitHub Pages publicará o site em:
```
https://<SEU_USUARIO>.github.io/frontend-qualidade-SMRE/
```
Abra esse endereço no navegador e você verá a interface.

---

## 6️⃣ Atualizando o site depois de alterações

Sempre que mudar código‑fonte (React components, CSS, etc.):
```bash
npm run build     # gera novo build
npm run deploy    # (opção A) ou faça commit/push (opção B)
```
O GitHub Pages será reconstruído automaticamente.
