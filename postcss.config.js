import autoprefixer from 'autoprefixer';

// Plugin personalizzato per convertire rgb() in esadecimale
const rgbToHex = () => {
  return {
    postcssPlugin: 'rgb-to-hex',
    Declaration(decl) {
      // Converti rgb(r, g, b) in hex (escludi rgba)
      decl.value = decl.value.replace(/\brgb\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)\)/g, (match, r, g, b) => {
        const toHex = (n) => {
          const rounded = Math.round(parseFloat(n));
          return rounded.toString(16).padStart(2, '0');
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      });
    }
  };
};
rgbToHex.postcss = true;

// Plugin personalizzato per arrotondare la precisione decimale a 6 cifre
const reducePrecision = () => {
  return {
    postcssPlugin: 'reduce-precision',
    Declaration(decl) {
      // Arrotonda tutti i numeri decimali a 6 cifre
      decl.value = decl.value.replace(/(\d+)\.(\d+)/g, (match, int, decimals) => {
        const num = parseFloat(match);
        // Arrotonda a 6 decimali
        const rounded = Math.round(num * 1000000) / 1000000;
        // Converti in stringa mantenendo esattamente 6 decimali se necessario
        return rounded.toString();
      });
    }
  };
};
reducePrecision.postcss = true;

// Plugin personalizzato per convertire hsla() in hexa
const hslaToHex = () => {
  return {
    postcssPlugin: 'hsla-to-hex',
    Declaration(decl) {
      // Converti hsla(h, s%, l%, a) in hex (#RRGGBB o #RRGGBBAA)
      decl.value = decl.value.replace(/\bhsla\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)%,\s*(\d+(?:\.\d+)?)%,\s*(\d+(?:\.\d+)?)\)/g, (match, h, s, l, a) => {
        const hue = parseFloat(h) / 360;
        const sat = parseFloat(s) / 100;
        const lig = parseFloat(l) / 100;
        const alpha = parseFloat(a);

        let r, g, b;
        
        if (sat === 0) {
          r = g = b = lig;
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
          };

          const q = lig < 0.5 ? lig * (1 + sat) : lig + sat - lig * sat;
          const p = 2 * lig - q;
          r = hue2rgb(p, q, hue + 1/3);
          g = hue2rgb(p, q, hue);
          b = hue2rgb(p, q, hue - 1/3);
        }

        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);

        const toHex = (n) => n.toString(16).padStart(2, '0');
        
        // Se alpha è 1, usa formato hex standard (#RRGGBB)
        if (alpha === 1) {
          return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        }
        
        // Se alpha < 1, usa formato hex con alpha (#RRGGBBAA)
        const alphaHex = Math.round(alpha * 255);
        return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alphaHex)}`;
      });
    }
  };
};
hslaToHex.postcss = true;

// Plugin per convertire caratteri Unicode in escape sequences
const unicodeToEscape = () => {
  return {
    postcssPlugin: 'unicode-to-escape',
    Declaration(decl) {
      // Converti solo le proprietà content e font-family dove gli escape sono più rilevanti
      if (decl.prop === 'content') {
        decl.value = decl.value.replace(/["']([^"']*)["']/g, (match, content) => {
          // Converti ogni carattere con codice > 127 (non-ASCII) in escape Unicode
          const escaped = content.split('').map(char => {
            const code = char.charCodeAt(0);
            if (code > 127) {
              return '\\' + code.toString(16).padStart(4, '0');
            }
            return char;
          }).join('');
          return match[0] + escaped + match[match.length - 1];
        });
      }
    }
  };
};
unicodeToEscape.postcss = true;

export default {
  plugins: [
    autoprefixer({ cascade: false }),
    hslaToHex(),
    rgbToHex(),
    reducePrecision(),
    unicodeToEscape()
  ]
}