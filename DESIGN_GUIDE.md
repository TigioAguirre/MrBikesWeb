# Mr.Bike — Guía de diseño web

Guía para rediseñar la web de **Mr.Bike Importaciones** (Av. Amazonas y Azuay, Quito, Ecuador).
Documenta tokens, componentes, motion y catálogo, tomando como referencia los patrones de e-commerce de marcas como Cannondale y Specialized.

> **Aviso de fuentes (leer primero).** Desde el entorno de trabajo no fue posible abrir `cannondale.com/es-es` ni `specialized.com/es/es`: el proxy bloqueó la conexión (403) y la resolución DNS falló. Por eso:
> - Los patrones de la sección 3 son **patrones de industria** de sitios de bicicletas premium, no medidas extraídas del CSS de esas webs. Están marcados como *[patrón]*.
> - Los datos verificados con búsqueda web están marcados como *[verificado]* con su fuente.
> - Todo lo que no pude verificar está marcado *[por confirmar]*. Antes de implementar, conviene abrir ambos sitios con DevTools y contrastar con esta guía.
> - Los colores y el logo de Mr.Bike **sí** se midieron directamente del banner entregado (sección 2).

---

## 1. Diagnóstico de la web actual (`index.html`, `styles.css`, `script.js`)

| Problema | Detalle | Corrección |
|---|---|---|
| Color de marca incorrecto | Usa rojo `#E10600` y amarillo `#FFC400`. El banner de Mr.Bike usa naranja `#E25714`. | Reemplazar tokens (sección 2). |
| Logo inventado | SVG de bici dibujado a mano con texto "Mr.**Bikes**". El logo real es "MR BIKE" en cursiva pesada con rayas, más el ciclista en silueta. | Usar el logo real como archivo (sección 2.3). |
| Nombre | "Mr.Bikes" en todo el sitio. | La marca es **Mr.Bike** (sin "s"). |
| Bicicletas dibujadas en SVG genérico | Parecen juguetes y no transmiten producto real. | Fotos reales de producto sobre fondo limpio. |
| Catálogo inventado | "Trail Rider 29", "Velocity R1", etc. no existen. | Catálogo con las marcas reales del banner (sección 6). |
| Datos de contacto ficticios | "Tu dirección aquí", "+00 000 000 0000", "+500 bicis vendidas". | Dirección, WhatsApp y redes reales (sección 7). |
| Sin foto/hero real | Hero con SVG. | Hero a pantalla completa con fotografía de ruta, como el banner. |
| Emojis como iconos | 🚲📏💳🛡️ se ven distintos en cada sistema. | Iconos SVG de línea consistentes. |
| Fuentes del sistema | `system-ui` no da identidad deportiva. | Tipografía display condensada (sección 2.4). |
| Sin carrito ni flujo de compra | Solo botón "Cotizar" a un formulario. | Para una tienda con WhatsApp, el flujo correcto es "Consultar por WhatsApp" con mensaje prellenado (sección 4.4). |

---

## 2. Identidad de marca (medida del banner)

### 2.1 Colores

Medidos por muestreo de píxeles del banner (2000×737):

| Token | Hex | Uso |
|---|---|---|
| `--brand-orange` | **`#E25714`** | Color principal: botones, franjas, acentos, precios destacados. Es el naranja dominante del banner. |
| `--brand-orange-dark` | `#C0511F` | Hover/pressed (tono sombreado que aparece en las curvas del banner). |
| `--brand-orange-deep` | `#80341E` | Bordes, sombras cálidas, fondos de énfasis oscuros. |
| `--ink` | `#111419` | Texto y fondos oscuros (negro azulado medido en las ruedas/fondo). |
| `--black` | `#000000` | Logo, silueta del ciclista. |
| `--white` | `#FFFFFF` | Texto sobre naranja y sobre oscuro. |
| `--sky` | `#7CBEE8` | Solo fotografía; puede usarse en degradados suaves de hero. |

Reglas:
- El naranja `#E25714` con texto blanco da contraste ≈ 3.6:1. **Pasa solo para texto grande (≥ 18.66 px bold / 24 px)**. Para texto pequeño sobre naranja, usar `--ink` (contraste ≈ 5.4:1) o poner el texto pequeño sobre fondo blanco/oscuro.
- Proporción de uso sugerida: 60 % blanco/gris claro, 25 % negro/ink, 15 % naranja. El naranja es acento, no fondo de página completa.
- Eliminar rojo y amarillo del sistema.

### 2.2 Escala neutra

| Token | Hex |
|---|---|
| `--gray-50` | `#F6F6F4` |
| `--gray-100` | `#EDEDEA` |
| `--gray-300` | `#CFCFCA` |
| `--gray-500` | `#6B6F76` |
| `--gray-700` | `#2A2D33` |
| `--gray-900` | `#111419` |

Semánticos: éxito `#1F8F5F`, error `#C62828`, aviso `#E25714` (reutiliza marca).

### 2.3 Logo

Elementos del logo real (visibles en el banner):
1. **Wordmark** "MR" + "BIKE": tipografía extra-bold, cursiva, con rayas horizontales en la "M". "MR" en blanco, "BIKE" en negro cuando va sobre naranja.
2. **Silueta del ciclista** de MTB con casco, en negro, sobre el wordmark.
3. Sublínea **"IMPORTACIONES"** en mayúsculas con tracking amplio (≈ 0.25 em).

Uso:
- **Archivo del logo:** exportar del diseño original como SVG (preferido) y PNG transparente. Guardar en `assets/logo/` como `mrbike-logo-color.svg`, `mrbike-logo-white.svg` y `mrbike-logo-black.svg`. **No redibujarlo en código**: el logo actual del sitio es una aproximación y por eso no coincide.
- Cabecera: versión horizontal (wordmark + "IMPORTACIONES" oculto bajo 480 px), altura 40 px escritorio / 32 px móvil.
- Zona de respeto: alto de la "M" a cada lado. Tamaño mínimo: 28 px de alto.
- Sobre foto o naranja: versión blanca/negra según contraste. Nunca recolorear a otros tonos.
- Favicon: la silueta del ciclista o "MR" sobre cuadrado `#E25714`.

### 2.4 Tipografía

El banner usa una sans condensada muy pesada, en mayúsculas, con ligera sombra (estilo deportivo). Equivalentes libres de Google Fonts:

| Rol | Fuente | Pesos | Notas |
|---|---|---|---|
| Display (H1, H2, nav, botones, precios) | **Barlow Condensed** | 600, 700, 800 | Mayúsculas, `letter-spacing: .02em`. Cursiva 800 opcional solo en titulares de campaña para evocar el logo. |
| Texto | **Inter** | 400, 500, 600 | Cuerpo, fichas técnicas, formularios. |
| Datos técnicos | Inter con `font-variant-numeric: tabular-nums` | 500 | Para alinear precios y pesos. |

Escala (móvil → escritorio, con `clamp`):

| Token | Tamaño | Uso |
|---|---|---|
| `--fs-hero` | `clamp(2.75rem, 8vw, 6rem)` | H1 del hero |
| `--fs-h2` | `clamp(2rem, 4.5vw, 3.25rem)` | Títulos de sección |
| `--fs-h3` | `clamp(1.25rem, 2vw, 1.5rem)` | Nombre de bici |
| `--fs-body` | `1rem` (16 px) | Texto |
| `--fs-small` | `.875rem` | Metadatos |
| `--fs-eyebrow` | `.75rem`, uppercase, tracking `.2em` | Etiquetas de sección |

### 2.5 Espaciado, radios, sombras

- Espaciado base 4 px: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
- Contenedor: `min(1280px, 100% - 48px)`; padding de sección 96 px escritorio / 56 px móvil.
- Radios: `--r-sm: 4px` (botones, chips: aspecto técnico), `--r-md: 8px` (tarjetas), `--r-pill: 999px` solo para badges.
- Sombras: `--sh-1: 0 1px 2px rgba(17,20,25,.08)`, `--sh-2: 0 12px 32px rgba(17,20,25,.14)`.

### 2.6 Elemento gráfico de marca: la curva

El banner organiza todo con **curvas diagonales naranja** que cortan la foto (esquina inferior izquierda y superior derecha) y tiras irregulares tipo pincel detrás del teléfono y la dirección. Trasladarlo así:
- Separadores de sección con `clip-path` o SVG curvo en naranja entre el hero y el siguiente bloque.
- Bloque de contacto con borde izquierdo recortado en diagonal.
- No usar las rayas a 45° de la web actual.

---

## 3. Patrones de diseño de referencia (marcas premium de bicicletas)

*[patrón]* — comportamientos comunes en Cannondale, Specialized, Trek y similares; contrastar con las webs reales.

| Área | Patrón | Cómo aplicarlo en Mr.Bike |
|---|---|---|
| Cabecera | Barra fija, logo a la izquierda, categorías en mayúsculas, iconos de búsqueda/cuenta/carrito a la derecha. Mega-menú al hacer hover con columnas por categoría y una imagen destacada. | Cabecera ink `#111419` con categorías: Bicicletas, Componentes, Taller, Marcas, Contacto. Mega-menú de "Bicicletas" con Montaña / Ruta / Urbanas / Eléctricas / Niños. Botón WhatsApp fijo. |
| Hero | Foto o video a pantalla completa, titular grande en mayúsculas, 1–2 botones, texto alineado abajo-izquierda sobre degradado oscuro. | Foto de ruta (como el banner), titular "Bicicletas · Componentes · Taller", curva naranja inferior. |
| Barra de categorías | Fila de tarjetas/iconos grandes (Montaña, Ruta, Gravel, Urbana, E-bike) con imagen y flecha. | Fila de 5 tarjetas 4:5 con imagen, nombre y "Ver todas". |
| Tarjeta de producto | Imagen sobre fondo gris claro, **badge** (Nuevo / Oferta), nombre en mayúsculas, línea de especificación clave, **swatches de color**, precio. Al hover cambia a segunda vista o sube con sombra. | Sección 4.2. |
| Filtros | Barra lateral o chips: categoría, marca, talla de rodado, rango de precio. Contador de resultados. | Chips horizontales + selector de marca y precio; contador "12 bicicletas". |
| Ficha de producto | Galería grande a la izquierda, a la derecha nombre, precio, color, **guía de tallas**, botón principal. Debajo: tabs de Especificaciones / Geometría. | Sección 4.5. |
| Comparador | Selección de 2–3 bicis y tabla lado a lado. | Opcional en fase 2. |
| Franja de beneficios | 3–4 iconos con texto corto (envío, garantía, financiamiento, taller). | Mismos iconos SVG de línea, en `--gray-50`. |
| Editorial | Bloques alternados foto/texto, con titular y enlace subrayado. | "Taller" y "Marcas" con ese formato. |
| Footer | Columnas de enlaces, newsletter, redes, selector de país/idioma. | Columnas + redes `@mrbikeec` + mapa. |

---

## 4. Componentes

### 4.1 Botones

| Variante | Estilo | Cuándo |
|---|---|---|
| Primario | Fondo `#E25714`, texto `--ink` o blanco ≥ 18 px bold, radio 4 px, mayúsculas Barlow Condensed 700, `letter-spacing:.06em`, padding `14px 28px`. | Una acción principal por bloque ("Ver bicicletas", "Consultar"). |
| Secundario | Borde 2 px `--ink`, fondo transparente. Hover: fondo `--ink`, texto blanco. | Acción alterna. |
| Sobre foto | Borde 2 px blanco, hover relleno blanco con texto `--ink`. | Hero. |
| WhatsApp | Verde `#25D366` solo en el icono; el botón sigue la marca. | Consultar por bicicleta. |
| Enlace | Texto + flecha `→`, subrayado animado de izquierda a derecha. | "Ver todas". |

Estados: hover `#C0511F` y `translateY(-1px)`; active `translateY(0)`; focus-visible anillo 3 px `--ink` + 2 px blanco; disabled 40 % opacidad; loading con spinner 16 px y texto "Enviando…".

### 4.2 Tarjeta de producto

Estructura (de arriba hacia abajo):
1. Imagen 4:3, fondo `--gray-50`, `object-fit: contain`, padding 16 px.
2. Badge superior izquierda: "Nueva" (naranja) / "Oferta" (negro). Radio 4 px, 11 px uppercase.
3. Marca (eyebrow, gris) + **nombre** (Barlow Condensed 700, mayúsculas).
4. Línea de especificación: `Aluminio · Shimano Altus 2×9 · Rodado 29`.
5. Swatches de color (círculos 14 px). Al hover sobre un swatch cambia la imagen.
6. Fila inferior: precio (Barlow 700, 24 px) + botón "Consultar".

Estados:
- Hover: `translateY(-4px)`, `--sh-2`, imagen `scale(1.04)` en 400 ms, aparece un botón "Vista rápida" desde abajo.
- Foco de teclado: mismo que hover + anillo.
- Sin stock: imagen al 60 %, badge "Agotado", botón "Avisarme".

### 4.3 Chips de filtro y navegación

Chip 36 px de alto, radio 4 px, borde 1 px `--gray-300`. Activo: fondo `--ink`, texto blanco. Hover: borde `#E25714`. Soportar teclado con flechas (role `tablist`).

### 4.4 CTA de WhatsApp

Número real: **0990866442** → enlace `https://wa.me/593990866442?text=<mensaje>`.
Mensaje prellenado por producto: `Hola Mr.Bike, me interesa la {marca} {modelo} (rodado {rodado}). ¿Está disponible?`
Botón flotante fijo abajo-derecha, 56 px, naranja con icono blanco; en escritorio muestra la etiqueta "Escríbenos" al hacer hover.

### 4.5 Ficha de producto

- Galería: imagen principal + 4 miniaturas; zoom al hover en escritorio, swipe en móvil.
- Columna derecha: marca, nombre, precio, selector de color, **guía de tallas**, botón primario "Consultar por WhatsApp", secundario "Ver en tienda".
- Tabs: **Especificaciones** (tabla de dos columnas: Cuadro, Horquilla, Transmisión, Frenos, Ruedas, Peso) y **Geometría** (opcional).

### 4.6 Tabla de especificaciones

Dos columnas, etiqueta gris en mayúsculas pequeñas, valor en Inter 500; filas separadas por 1 px `--gray-100`. En móvil se apila.

### 4.7 Formularios

Campos 48 px de alto, borde 1 px `--gray-300`, focus borde `#E25714` + sombra `0 0 0 3px rgba(226,87,20,.25)`. Errores en texto bajo el campo, con `aria-describedby`.

---

## 5. Motion

*[patrón]* — valores típicos de sitios de bicicletas, ajustados a Mr.Bike.

| Elemento | Animación | Duración / easing |
|---|---|---|
| Botones | color + `translateY(-1px)` | 150 ms `ease-out` |
| Tarjeta | elevación + zoom de imagen | 250 ms / 400 ms `cubic-bezier(.2,.7,.2,1)` |
| Mega-menú | fade + `translateY(8px → 0)`; retardo de cierre 120 ms para evitar parpadeos | 200 ms |
| Hero | Imagen con zoom lento `scale(1.08 → 1)` al cargar; titular entra por líneas con `translateY(24px)` y opacidad | 900 ms, escalonado 80 ms |
| Revelado al scroll | `IntersectionObserver`: opacidad 0→1, `translateY(24px→0)`, escalonado por tarjeta 60 ms | 500 ms |
| Contadores | Cuenta hasta el valor al entrar en viewport | 1200 ms |
| Filtros | Tarjetas salen con fade y las nuevas entran escalonadas | 250 ms |
| Curva naranja | Entra desplazándose desde fuera del viewport una sola vez | 700 ms |
| Carrusel | Scroll horizontal con `scroll-snap-type: x mandatory`, flechas y puntos | nativo |

Tokens: `--ease: cubic-bezier(.2,.7,.2,1)`, `--t-fast: 150ms`, `--t-med: 250ms`, `--t-slow: 500ms`.

Obligatorio: respetar `prefers-reduced-motion: reduce` (desactivar parallax, zoom y revelado; dejar solo cambios de color).

---

## 6. Catálogo con datos reales

### 6.1 Marcas de Mr.Bike (del banner)

X-PRO, Franco's, Venzo, GW, Shimano, Tomcat, Hawk, ECE, Vairo, Eagle. El catálogo debe organizarse por estas marcas, **no** por Cannondale ni Specialized (que son solo referencia de diseño).

> **Pendiente del cliente:** lista real de modelos, precios, tallas y fotos por marca. Esta guía no puede inventarlos. Se recomienda un archivo `data/bicicletas.json` con el esquema de 6.3.

### 6.2 Componentes reales para las fichas

Grupos de transmisión Shimano reales, con la cantidad de velocidades por línea *[conocimiento técnico general; confirmar en cada modelo]*:

| Uso | Grupo | Velocidades |
|---|---|---|
| MTB entrada | Tourney / Altus | 7 / 9 (Altus M2000: 9) |
| MTB intermedio | Acera / Alivio | 9 |
| MTB medio | Deore | 10 o 12 (M4100 / M6100) |
| Ruta entrada | Claris / Sora | 8 / 9 |
| Ruta medio | Tiagra / 105 | 10 / 11 o 12 |

Medidas reales habituales: rodados MTB 26", 27.5", 29"; ruta 700c; niños 12", 16", 20", 24". Cuadros: aluminio 6061, acero, carbono. Frenos: V-brake, disco mecánico, disco hidráulico. Suspensión de MTB de entrada: 80–100 mm.

### 6.3 Esquema de datos

```json
{
  "id": "xpro-ejemplo-29",
  "marca": "X-PRO",
  "modelo": "[por confirmar]",
  "categoria": "montaña",
  "rodado": "29",
  "precio_usd": null,
  "estado": "nueva",
  "colores": [{ "nombre": "Gris", "hex": "#9AA0A8", "foto": "assets/bikes/..." }],
  "tallas": ["S", "M", "L"],
  "specs": {
    "cuadro": "Aluminio",
    "horquilla": "Suspensión, 100 mm",
    "transmision": "Shimano Altus 2×9",
    "frenos": "Disco hidráulico",
    "ruedas": "Aro doble pared, 29\"",
    "peso_kg": null
  },
  "foto_principal": "assets/bikes/..."
}
```

### 6.4 Ejemplos reales de referencia (solo para ver qué nivel de detalle mostrar)

Estas **no son productos de Mr.Bike**; sirven de modelo para el nivel de detalle de una ficha.

| Modelo | Datos | Fuente |
|---|---|---|
| Cannondale SuperSix EVO 2 SMU | Cuadro y horquilla de carbono Gen 5, ruedas DT Swiss ERC LOG 45, Shimano Ultegra Di2 12 velocidades, manillar Vision Trimax Carbon Aero, potencia Cannondale C1 Conceal, cubiertas Schwalbe One TLR 700×28c. *[verificado]* | [cannondale.com/es-es](https://www.cannondale.com/es-es/bikes/road/race/supersix-evo/supersix-evo-2-smu) |
| Specialized Rockhopper (2025) | Cuadro de aluminio con tubos butted e hidroformados, horquilla de 100 mm, transmisión 2×9 Altus en el modelo base y 1×10 Deore en Comp, frenos hidráulicos Shimano, ≈ 13,9 kg. Los datos de horquilla varían según la tienda. *[verificado parcialmente]* | [99spokes](https://99spokes.com/en-ES/bikes/specialized/2025/rockhopper) |
| Garantía Cannondale | Garantía limitada de por vida en cuadro, 1 año en componentes Cannondale. *[verificado]* | [cannondale.com](https://www.cannondale.com/es-es/bikes/road/race/supersix-evo/supersix-evo-2-smu) |

Conclusión de patrón: las fichas reales listan **cuadro, horquilla, transmisión, ruedas, cubiertas, manillar/potencia y peso**. Mr.Bike debe mostrar al menos cuadro, horquilla, transmisión, frenos, ruedas y rodado.

---

## 7. Datos de contacto reales (del banner)

| Dato | Valor |
|---|---|
| Servicios | Bicicletas · Componentes · Taller |
| WhatsApp | 0990866442 |
| Dirección | Av. Amazonas y Azuay, Quito – Ecuador |
| Instagram | @mrbikeec |
| TikTok | mrbikeec |
| Facebook | mrbikeec |
| Moneda | USD (Ecuador) |

No incluir cifras como "+500 bicis vendidas" ni horarios mientras el cliente no los confirme.

---

## 8. Estructura de página propuesta

1. Cabecera fija con mega-menú y botón WhatsApp.
2. Hero con foto, titular "Bicicletas · Componentes · Taller" y curva naranja.
3. Barra de marcas (logos en escala de grises → color al hover; carrusel en móvil).
4. Categorías (5 tarjetas).
5. Destacados (carrusel de tarjetas de producto).
6. Catálogo con filtros.
7. Componentes y repuestos.
8. Taller (foto + lista de servicios + botón "Reservar por WhatsApp").
9. Mapa y contacto con dirección real.
10. Footer con redes.

## 9. Accesibilidad y rendimiento

- Contraste: ver regla del naranja (2.1). Foco visible siempre.
- Imágenes WebP/AVIF, `loading="lazy"` salvo el hero, `width`/`height` definidos para evitar saltos.
- Alt descriptivo en cada foto de bicicleta (marca, modelo, color).
- Navegación completa con teclado, incluido el mega-menú (`aria-expanded`, Escape cierra).
- Objetivo: LCP < 2.5 s en 4G.

## 10. Tokens CSS (punto de partida)

```css
:root{
  --brand-orange:#E25714; --brand-orange-dark:#C0511F; --brand-orange-deep:#80341E;
  --ink:#111419; --black:#000; --white:#fff;
  --gray-50:#F6F6F4; --gray-100:#EDEDEA; --gray-300:#CFCFCA; --gray-500:#6B6F76; --gray-700:#2A2D33;
  --ok:#1F8F5F; --err:#C62828;

  --font-display:"Barlow Condensed",system-ui,sans-serif;
  --font-body:"Inter",system-ui,sans-serif;

  --r-sm:4px; --r-md:8px; --r-pill:999px;
  --sh-1:0 1px 2px rgba(17,20,25,.08); --sh-2:0 12px 32px rgba(17,20,25,.14);

  --ease:cubic-bezier(.2,.7,.2,1);
  --t-fast:150ms; --t-med:250ms; --t-slow:500ms;
}
```

## 11. Próximos pasos

1. Obtener el logo en vector y fotos reales de las bicicletas.
2. Obtener la lista de modelos, precios, tallas y especificaciones por marca.
3. Abrir Cannondale y Specialized con DevTools y validar la sección 3 (hex, fuentes, medidas).
4. Reescribir `styles.css`, `index.html` y `script.js` con estos tokens y componentes.
