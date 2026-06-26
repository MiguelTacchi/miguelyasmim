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
    └── components/
        ├── ParticlesCanvas.jsx  ← estrelas + pétalas voando (canvas)
        ├── Navbar.jsx           ← nav com entrada animada
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
cd miguelyasmim
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

- **Datas / textos**: edite diretamente em cada componente (`Hero.jsx`, `Timeline.jsx`, etc.)
- **Cores**: variáveis CSS em `src/styles/global.css` — bloco `:root`
- **Carta**: texto em `Letter.jsx`

## Build para produção

```bash
npm run build
# saída em dist/
```
