# Proyecto Notas
API REST in Nodejs for a bookbuddy project

## Instalation

1. Download or clone this repo

```bash
git clone https://github.com/raulbalrod/bookbuddy.git
```

```bash
cd server
```

2. Install npm dependencies

```bash
npm install
```

> You must insert your port, expiresIn and username Bookbuddy API password on variable.

3. Simply run on your local

```bash
npm start
```

4. By default, the app deploy on port 3000. To use the app you can:
    - **Postman** Use the provided [postman collection](./postman/collections) and [postman environment](./postman/environments).
    - **Deploy** Use the already deployed [api](https://bookbuddy-v7ra.onrender.com)

## Architecture

```bash
📦server
 ┣ 📂.vscode
 ┃ ┗ settings.json
 ┣ 📂src
 ┃ ┣ 📂config # Modules configurations
 ┃ ┣ 📂controllers # API controllers
 ┃ ┣ 📂loaders # Setup server and services on load
 ┃ ┣ 📂middlewares # API middlewares
 ┃ ┣ 📂openapi # Openapi (Swagger) specification
 ┃ ┣ 📂routes # API routes
 ┃ ┣ 📂services # API services
 ┃ ┣ 📂utils
 ┃ ┣ 📜app.js # App main
 ┃ ┗ 📜index.js # Launch app
 ┣ 📂postman
 ┃ ┣ 📂collections
 ┃ ┗ 📂environments
 ┣ 📜.editorconfig
 ┣ 📜.env
 ┣ 📜.env.template
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗📜README.md
```

## Main dependencies

- `bcrypt`
- `cors`
- `dotenv`
- `express`
- `js-yaml`
- `jsonwebtoken`
- `mongodb`
- `mongoose`
- `multer`
- `morgan`
- `swagger-ui-express`
- `winston`
