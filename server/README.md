# ReadEase API REST
API REST in Nodejs for a readease project

## Instalation

1. Download or clone this repo

```bash
git clone https://github.com/raulbalrod/readease.git
```

```bash
cd server
```

2. Install npm dependencies

```bash
npm install
```

> You must insert your port, expiresIn and username ReadEase API password on variable.

3. Simply run on your local

```bash
npm start
```

4. By default, the app deploy on port 3000. To use the app you can:
    - **Postman** Use the provided [postman collection](./postman/collections) and [postman environment](./postman/environments).
    - **SwaggerUI** Go to [localhost:3000/api-docs](http://localhost:3000/api-docs/) to see swagger playground or [Swagger deployed](https://bookbuddy-v7ra.onrender.com/api-docs/).
    - **Deploy** Use the already deployed [API](https://bookbuddy-v7ra.onrender.com) and use the different API endpoints.

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
