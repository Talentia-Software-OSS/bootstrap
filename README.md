# @talentia/bootstrap

Bootstrap 4.6.2 migrato per utilizzare Dart Sass moderno con sistema di moduli `@use`.

## 🎯 Caratteristiche

- ✅ Utilizza il moderno sistema di moduli Sass (`@use` invece di `@import` deprecato)
- ✅ Compatibile con Dart Sass 1.80+
- ✅ Funzionalmente identico a Bootstrap 4.6.2
- ✅ Include codice sorgente SCSS personalizzabile
- ✅ CSS compilato e minificato disponibile

## 📦 Installazione

```bash
npm install @talentia/bootstrap
```

## 🚀 Quick Start

### Utilizzo CSS

```javascript
// Import CSS precompilato
import '@talentia/bootstrap/dist/css/bootstrap.css';
```

### Utilizzo SCSS

#### Import completo

```scss
@use '@talentia/bootstrap/scss/bootstrap' as *;
```

#### Customizzazione variabili (con `with`)

```scss
// Import functions
@use '@talentia/bootstrap/scss/functions' as *;

// Sovrascrivi variabili usando 'with'
@use '@talentia/bootstrap/scss/variables' with (
  $primary: #ff5722,
  $secondary: #424242,
  $enable-rounded: false,
  $enable-shadows: true,
  $font-family-base: ('Roboto', sans-serif)
);

// Import mixins e componenti
@use '@talentia/bootstrap/scss/mixins' as *;
@use '@talentia/bootstrap/scss/bootstrap';
```

#### Import selettivo

```scss
@use '@talentia/bootstrap/scss/functions' as *;
@use '@talentia/bootstrap/scss/variables' as *;
@use '@talentia/bootstrap/scss/mixins' as *;

// Solo i componenti necessari
@use '@talentia/bootstrap/scss/root';
@use '@talentia/bootstrap/scss/reboot';
@use '@talentia/bootstrap/scss/grid';
@use '@talentia/bootstrap/scss/buttons';
```

## 📚 Documentazione

Per informazioni dettagliate su come personalizzare le variabili e importare solo i componenti necessari, consulta la [documentazione completa](./dist/README.md).

## 🔧 Sviluppo

### Prerequisiti

- Node.js >= 18.0.0
- npm >= 9.0.0

### Build

```bash
# Installa le dipendenze
npm install

# Build completo
npm run build

# Watch mode per sviluppo
npm run css-watch
```

### Struttura del progetto

```
.
├── vendors/custom/scss/    # Codice sorgente SCSS
├── dist/                   # Build output (pubblicato su npm)
│   ├── dist/css/          # CSS compilato
│   └── scss/              # SCSS sorgente
└── package.json
```

## 🆚 Differenze da Bootstrap originale

La principale differenza è l'uso del sistema di moduli Sass moderno:

**Bootstrap originale (4.6.2):**
```scss
@import "functions";
@import "variables";
```

**Questa versione:**
```scss
@use "functions" as *;
@use "variables" as *;
```

### Vantaggi del sistema `@use`:

1. **Namespace espliciti**: Evita conflitti di nomi
2. **No duplicazione**: Ogni modulo viene importato una sola volta
3. **Performance migliori**: Compilazione più veloce
4. **Futuro di Sass**: `@import` sarà rimosso in Dart Sass 3.0

## 📄 License

MIT - Vedi [LICENSE](./LICENSE)

## 🙏 Credits

Basato su [Bootstrap 4.6.2](https://github.com/twbs/bootstrap) by The Bootstrap Authors.
