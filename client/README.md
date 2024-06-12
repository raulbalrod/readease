# Bookbuddy Front
Bookbuddy es una aplicación que hace que la lectura sea más accesible para los usuarios, en esta aplicación puedes administrar tus lecturas, leer libros electrónicos y escuchar audiolibros.

## Instalation

1. Download or clone this repo

```bash
git clone https://github.com/raulbalrod/bookbuddy.git
```

```bash
cd client
```

2. Install npm dependencies

```bash
npm install
```

> You must insert your port, expiresIn and username Bookbuddy API password on variable.

3. Simply run on your local

```bash
npm run dev 
```



1. By default, the app deploy on port 4000. To use the app you can:
    - **Local** Go to [localhost:4000/landing-page](http://localhost:4000/landing-page) to see the landing page or [Bookbuddy deployed](https://bookbuddy-digital.vercel.app/landing-page) to create your account or login.
## Architecture

```bash
client
 ┣ 📂public # Public assets
 ┣ 📂src
 ┃ ┣ 📂app # Routes pages
 ┃ ┣ 📂components # All components
 ┃ ┣ 📂constants # Constants
 ┃ ┣ 📂contexts #Contexts
 ┃ ┣ 📂lib # Libraries
 ┃ ┣ 📂models  # Types for database data
 ┃ ┣ 📂types # Types for TypeScript
 ┃ ┣ 📂utils # Utilities
 ┃ ┣ 📜app.js  # Main app file
 ┃ ┗ 📜index.js # App launcher
 ┣ 📜next.config.mjs   
 ┣ 📜tailwind.config.ts  
 ┣ 📜tsconfig.ts         
 ┣ 📜.gitignore         
 ┣ 📜package.json        
 ┣ 📜package-lock.json   
 ┗ 📜README.md          
```

## Main dependencies

- `next`
- `react`
- `react-reader`
- `zod`
- `tailwindcss-animate`
- `radix-ui`
- `lucide-react`
- `boxicons`
- `tailwindcss`
- `typescript`
