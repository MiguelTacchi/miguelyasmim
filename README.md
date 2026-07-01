# Miguel & Yasmim 💕

Site de aniversário de namoro — estrutura front-end real com React + Vite + Framer Motion.

## Estrutura

```
miguelyasmim/
├── index.html              ← entry HTML
├── vite.config.js          ← config do Vite
├── package.json            ← dependências
└── src/
    ├── main.jsx            ← bootstrap React
    ├── App.jsx             ← componente raiz
    ├── styles/
    │   └── global.css      ← todo CSS (variáveis, seções, animações)
    ├── pages/
    │   ├── HomePage.jsx        ← página inicial
    │   ├── TimelinePage.jsx    ← linha do tempo
    │   ├── GalleryPage.jsx     ← galeria de fotos
    │   └── CartaPage.jsx       ← carta
    └── components/
        ├── ParticlesCanvas.jsx  ← estrelas voando (canvas)
        ├── PetalRain.jsx        ← chuva de pétalas (canvas)
        ├── Navbar.jsx           ← nav com entrada animada
        ├── Header.jsx           ← cabeçalho das páginas
        ├── Hero.jsx             ← counter ao vivo
        ├── Timeline.jsx         ← linha do tempo
        ├── Gallery.jsx          ← galeria + lightbox
        ├── Promises.jsx         ← promessas com hover
        ├── Letter.jsx           ← carta com cera de lacre
        ├── PageTransition.jsx   ← cortinas animadas entre seções
        └── Reveal.jsx           ← hook/componente de scroll reveal
```

## Como rodar

```bash
cd miguelyasmim-deploy
npm install
npm run dev
```

## Adicionar fotos

Abra `src/components/Gallery.jsx` e preencha o array `PHOTOS`:

```js
const PHOTOS = [
  '/fotos/foto1.jpg',   // coloque em public/fotos/
  'data:image/jpeg;base64,...',  // ou base64 direto
]
```

## Personalizar

- **Datas / textos**: edite diretamente em cada página (`TimelinePage.jsx`, `HomePage.jsx`, etc.)
- **Cores**: variáveis CSS em `src/styles/global.css` — bloco `:root`
- **Carta**: texto em `CartaPage.jsx` / `Letter.jsx`

## Build para produção

```bash
npm run build
# saída em dist/
```

## Deploy

O site é publicado via GitHub Pages a partir da branch `main`:

```bash
cd miguelyasmim-deploy
npm run build
cd ..
git add .
git commit -m "sua mensagem aqui"
git push origin main
```

Site ao vivo: [migueltacchi.github.io/miguelyasmim](https://migueltacchi.github.io/miguelyasmim/)
