# 🎀 Girly things

## No tan girly, sí tan cosas

Landing page moderna y premium para el megáfono cultural definitivo. Diseño brutalista suave con dark mode y estética Gen Z/Cyberpunk.

---

## 🎨 Características del Diseño

### Identidad Visual
- **Estilo**: Brutalista suave / Dark mode moderno
- **Objetivo**: Análisis cultural profundo sin filtros básicos
- **Público**: Gen Z que busca contenido inteligente

### Paleta de Colores
- **Fondo**: Negro profundo (#0D0D0D)
- **Superficie**: Gris oscuro (#1A1A1A)
- **Texto**: Blanco hueso (#F5F5F5)
- **Acento Principal**: Acid Pink (#FF005C)
- **Acento Secundario**: Electric Purple (#6D28D9)

### Tipografía
- **Títulos**: Poppins (700-900) - Impacto y modernidad
- **Cuerpo**: Lato (300-700) - Lectura cómoda

---

## ✨ Funcionalidades Implementadas

### Interacciones Premium
- ✅ Navbar con glassmorphism y scroll effect
- ✅ Animaciones de entrada con Intersection Observer
- ✅ Contador animado de estadísticas
- ✅ Parallax effect en hero
- ✅ Formulario con validación en tiempo real
- ✅ Micro-animaciones y hover effects
- ✅ Scroll reveal para secciones
- ✅ Efectos de gradiente dinámicos
- ✅ Easter egg con confetti (Konami Code)

### Optimizaciones
- ✅ SEO optimizado con meta tags
- ✅ Diseño 100% responsive
- ✅ Performance optimizado
- ✅ Accesibilidad (ARIA labels, focus states)
- ✅ Prefers-reduced-motion support

---

## 🚀 Cómo Usar

### Opción 1: Servidor Local Simple
```bash
# Navegar a la carpeta
cd "e:\Proyectos de apps webs y juegos\girly-things"

# Iniciar servidor Python
python -m http.server 8000
```

Luego abre: `http://localhost:8000`

### Opción 2: Live Server (VS Code)
1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

---

## 📁 Estructura de Archivos

```
girly-things/
├── index.html      # Estructura HTML semántica
├── styles.css      # Estilos premium con variables CSS
├── script.js       # Interacciones y animaciones
└── README.md       # Este archivo
```

---

## 🎯 Secciones Principales

### 1. Hero
- Título impactante con animación de reveal
- CTA principal a Newsletter Secreta
- Background con gradientes animados
- Scroll indicator

### 2. Pilares (Qué Hacemos)
- Grid responsive de 3 columnas
- Cards con hover effects premium
- Iconos grandes centrados
- Gradientes en bordes al hover

### 3. Sobre Nosotros
- Layout flex con imagen decorativa
- Estadísticas animadas con contadores
- Efectos de sombra con accent color
- Botón outline style

### 4. Testimonios
- Cards estilo redes sociales
- Avatares con gradient background
- Quotes estilizadas
- Border accent en rosa

### 5. Newsletter (Contacto VIP)
- Formulario con validación
- Lista de beneficios exclusivos
- Diseño de dos columnas
- Mensaje de éxito animado

### 6. Footer
- Enlaces a redes sociales
- Diseño minimalista
- Social icons con hover effects

---

## 🛠️ Personalización

### Cambiar Colores
Edita las variables en `styles.css`:

```css
:root {
    --accent-pink: #FF005C;      /* Color principal */
    --accent-purple: #6D28D9;     /* Color secundario */
    --bg-color: #0D0D0D;          /* Fondo */
}
```

### Conectar Formulario
En `script.js`, línea ~120, reemplaza el `setTimeout` simulado con tu API:

```javascript
// Ejemplo con Fetch API
const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
});
```

### Añadir Google Analytics
Agrega antes del cierre de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU-ID');
</script>
```

---

## 🎨 Mejoras Implementadas vs Original

### Visual
- ✨ Gradientes dinámicos en lugar de colores planos
- ✨ Glassmorphism en navbar
- ✨ Efectos de sombra con glow
- ✨ Animaciones suaves con timing personalizado
- ✨ Mejor imagen en About con overlay decorativo

### Funcional
- ✨ Validación de formulario en tiempo real
- ✨ Contadores animados de estadísticas
- ✨ Scroll reveal con Intersection Observer
- ✨ Parallax en hero section
- ✨ Easter egg interactivo

### UX/UI
- ✨ Microinteracciones en botones
- ✨ Estados de hover más ricos
- ✨ Feedback visual en formulario
- ✨ Animaciones de carga
- ✨ Mejor jerarquía tipográfica

---

## 🌐 Compatibilidad

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS/Android)

---

## 📝 Próximos Pasos Sugeridos

1. **Backend Integration**
   - Conectar formulario a Mailchimp/SendGrid
   - Implementar base de datos de suscriptores

2. **Content Management**
   - Añadir sección de blog/artículos
   - Implementar CMS (Strapi, Contentful)

3. **Analytics**
   - Google Analytics 4
   - Hotjar para heatmaps
   - Conversión tracking

4. **Performance**
   - Lazy loading de imágenes
   - CDN para assets
   - PWA implementation

5. **Expansión**
   - Página de archivo de artículos
   - Sistema de categorías
   - Búsqueda integrada

---

## 💌 Contacto

**Email**: hola@girlythings.com  
**Ubicación**: Buenos Aires, Argentina

---

**Hecho con 💜 y mucho ☕**

*"No tan girly, sí tan cosas"*
