# 🎨 DEMO-Project-Template

<div align="center">

![Project Banner](assets/images/demo-banner.png)

**Constructor Interactivo de DEMOS y Badges para GitHub README (Plantilla)**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Demo-32B8C6?style=for-the-badge)](https://demo-user.github.io/demo-project-template/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Ready-success?style=for-the-badge&logo=github)](https://pages.github.com/)
[![License MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![No Backend](https://img.shields.io/badge/Backend-None-blue?style=for-the-badge)](https://github.com)
[![Offline Capable](https://img.shields.io/badge/Offline-Capable-orange?style=for-the-badge)](https://github.com)

**[✨ Demo Online](#-demo-online) • [🚀 Inicio Rápido](#-inicio-rápido) • [📖 Documentación](#-documentación) • [🤝 Contribuir](#-contribuir)**

</div>

---

## 🌟 ¿Qué es DEMO-Project-Template?

**DEMO-Project-Template** es una aplicación web **100% client-side** (sin backend) pensada como plantilla para proyectos que necesiten una interfaz visual para construir badges, componentes o elementos de DEMO para sus repositorios GitHub. Todo el contenido, datos y ejemplos incluidos en este archivo son **simulados** y se deben adaptar al proyecto real.

### ✨ Características Destacadas (DEMO)

🎯 **Interfaz Drag & Drop** simulada para organizar elementos  
📦 **N Templates DEMO** predefinidos listos para personalizar  
🎨 **Iconos de ejemplo** con rutas ficticias y datos simulados  
🔍 **Búsqueda de elementos** a modo demostración  
🖱️ **Click o Arrastrar** sobre elementos de prueba en el canvas  
🌈 **Personalización Total (DEMO)** de colores, estilos y textos  
⚡ **Generación Instantánea (DEMO)** de código de ejemplo  
📋 **Export Multiformato (DEMO)** Markdown, HTML, JSON, URLs  
💾 **Funciona Offline (DEMO)** tras la primera carga (si se implementa PWA)  
🌐 **GitHub Pages** lista para desplegar como ejemplo  
📱 **Progressive Web App (opcional)**  
🎭 **Modo Claro/Oscuro** de demostración

> Nota: Sustituye o ajusta todos los valores anteriores para que reflejen las capacidades reales de tu proyecto.

---

## 🚀 Inicio Rápido

### Opción 1: Usar Online (DEMO)

**Ejemplo de cómo se vería el proyecto desplegado en GitHub Pages:**

👉 **[https://demo-user.github.io/demo-project-template/](https://demo-user.github.io/demo-project-template/)**

> Reemplaza la URL por la de tu repositorio real.

---

### Opción 2: Descargar y Usar Localmente

#### Método A: Abrir Directamente (Ejemplo Simple)

```bash
# 1. Clonar el repositorio (actualiza la URL con la de tu proyecto)
git clone https://github.com/demo-user/demo-project-template.git
cd demo-project-template

# 2. Abrir index.html en tu navegador
# Simplemente doble click en index.html
# O arrastrar el archivo al navegador
```

#### Método B: Con Servidor Local (Recomendado)

```bash
# 1. Clonar el repositorio (actualiza la URL con la de tu proyecto)
git clone https://github.com/demo-user/demo-project-template.git
cd demo-project-template

# 2. Iniciar servidor HTTP simple (elige una opción)
# Opción Python 3:
python -m http.server 8000

# Opción Python 2:
python -m SimpleHTTPServer 8000

# Opción Node.js:
npx http-server -p 8000

# Opción PHP:
php -S localhost:8000

# 3. Abrir en navegador
# http://localhost:8000
```

**Ventajas de usar servidor local (DEMO):**
- ✅ Permite probar PWA/Service Worker (si lo implementas)  
- ✅ Evita problemas de CORS  
- ✅ Simula entorno de producción  
- ✅ Posibilita instalación como app (si aplica)

---

### Opción 3: Desplegar en Tu GitHub Pages (Plantilla)

```bash
# 1. Haz Fork de este repositorio en GitHub
# Click en "Fork" arriba a la derecha

# 2. Ve a Settings > Pages
# Source: Deploy from branch
# Branch: main (o el que uses)
# Folder: / (root)
# Save

# 3. Espera unos minutos
# Tu app estará en una URL similar a:
# https://TU-USUARIO.github.io/TU-REPO/
```

**Resultado esperado (DEMO):** tu propia instancia de la app corriendo en GitHub Pages.

---

## 📸 Capturas de Pantalla (DEMO)

> Sustituye las rutas y descripciones por tus propias capturas reales.

### 🎨 Interfaz Principal

<div align="center">
<img src="docs/screenshots/demo-main-interface.png" alt="Interfaz Principal DEMO" width="800"/>

*Vista principal de ejemplo con sidebar, canvas y panel de configuración (DEMO)*
</div>

---

### 🎯 Drag & Drop en Acción

<div align="center">
<img src="docs/screenshots/demo-drag-drop.png" alt="Drag and Drop DEMO" width="800"/>

*Demostración de arrastrar elementos DEMO desde el sidebar al canvas*
</div>

---

### 🎨 Personalización Avanzada (DEMO)

<div align="center">
<img src="docs/screenshots/demo-customization.png" alt="Panel de Personalización DEMO" width="800"/>

*Panel de personalización de ejemplo: colores, iconos, estilos y formatos (simulados)*
</div>

---

### 📤 Export Multiformato (DEMO)

<div align="center">
<img src="docs/screenshots/demo-export-modal.png" alt="Export Modal DEMO" width="600"/>

*Ejemplo de exportación a Markdown, HTML, JSON y URLs (contenido simulado)*
</div>

---

## 💡 Uso Básico (Plantilla)

> Todos los siguientes pasos usan datos de ejemplo. Adáptalos a tu lógica real.

### 1️⃣ Crear Elemento Individual DEMO

```
┌─────────────────────────────────────────────┐
│ 1. Busca "Demo-Item" en el sidebar        │
│ 2. Click o arrastra al canvas              │
│ 3. Personaliza en el panel derecho:        │
│    - Color: #4A90E2                        │
│    - Estilo: demo-style                    │
│    - Icono: demo-icon                      │
│ 4. Click "Copy Markdown"                   │
└─────────────────────────────────────────────┘
```

**Output DEMO:**
```markdown
![Demo-Item](https://img.shields.io/badge/Demo--Item-v1.0-4A90E2?style=for-the-badge&logo=demo-icon&logoColor=white)
```

---

### 2️⃣ Crear Colección de Elementos DEMO

```
┌─────────────────────────────────────────────┐
│ 1. Selecciona múltiples elementos demo:    │
│    - Demo-Language                          │
│    - Demo-Framework                         │
│    - Demo-Tool                              │
│    - Demo-Platform                          │
│ 2. Arrastra todos al canvas                │
│ 3. Auto-alinea con "Layout > Horizontal"   │
│ 4. Export > Batch > Markdown               │
└─────────────────────────────────────────────┘
```

**Output DEMO:**
```markdown
![Demo-Language](https://img.shields.io/badge/Demo--Language-1.0-007ACC?logo=demo-language&logoColor=white)
![Demo-Framework](https://img.shields.io/badge/Demo--Framework-2.0-61DAFB?logo=demo-framework&logoColor=black)
![Demo-Tool](https://img.shields.io/badge/Demo--Tool-0.9-FF6B6B?logo=demo-tool&logoColor=white)
![Demo-Platform](https://img.shields.io/badge/Demo--Platform-stable-8BC34A?logo=demo-platform&logoColor=white)
```

---

### 3️⃣ Elemento Custom desde Cero (DEMO)

```
┌─────────────────────────────────────────────┐
│ 1. Click "Custom Demo" en la toolbar      │
│ 2. Introduce datos de ejemplo:             │
│    Label: "Estado"                         │
│    Message: "En DEMO"                      │
│    Color: #10B981 (verde demo)             │
│    Style: for-the-badge                    │
│ 3. Buscar icono demo: "check-demo"         │
│ 4. Guardar como favorito (opcional)        │
└─────────────────────────────────────────────┘
```

**Output DEMO:**
```markdown
![Estado](https://img.shields.io/badge/Estado-En%20DEMO-10B981?style=for-the-badge&logo=check-demo&logoColor=white)
```

---

## 🎨 Categorías de Templates (DEMO)

> Usa esta tabla como plantilla y ajusta cantidades y ejemplos a tu proyecto.

| Categoría        | Cantidad (DEMO) | Ejemplos DEMO                                      |
|------------------|-----------------|----------------------------------------------------|
| 🔤 Lenguajes     | ~20             | DemoScript, ExampleLang, ProtoCode                 |
| 🎯 Frameworks    | ~15             | DemoReact, SampleVue, ProtoAngular                 |
| 🛠️ Herramientas | ~30             | DemoDocker, MockGit, SampleEditor                  |
| ☁️ Plataformas   | ~10             | DemoHub, CloudSample, ProtoCloud                   |
| 🔄 CI/CD         | ~8              | DemoActions, SampleCI, MockPipelines              |
| 📊 Status        | ~12             | Build-Demo, Tests-Demo, Coverage-Demo              |
| 💬 Social        | ~10             | SampleSocial, DemoChat, ProtoMedia                 |
| 📈 Métricas      | ~10             | Stars-Demo, Issues-Demo, Contributors-Demo         |

---

## 🎭 Estilos Disponibles (DEMO)

> Ejemplo de estilos; adapta nombres, descripciones y previews a tu caso.

<table>
<tr>
<th>Estilo</th>
<th>Preview DEMO</th>
<th>Uso sugerido</th>
</tr>
<tr>
<td><code>flat</code></td>
<td><img src="https://img.shields.io/badge/Flat-DEMO-blue?style=flat" alt="Flat DEMO"></td>
<td>Estilo básico de ejemplo</td>
</tr>
<tr>
<td><code>flat-square</code></td>
<td><img src="https://img.shields.io/badge/Flat_Square-DEMO-blue?style=flat-square" alt="Flat Square DEMO"></td>
<td>Versión cuadrada para demos</td>
</tr>
<tr>
<td><code>for-the-badge</code></td>
<td><img src="https://img.shields.io/badge/For_the_Badge-DEMO-blue?style=for-the-badge" alt="For the Badge DEMO"></td>
<td>Ideal para resaltar información demo</td>
</tr>
<tr>
<td><code>plastic</code></td>
<td><img src="https://img.shields.io/badge/Plastic-DEMO-blue?style=plastic" alt="Plastic DEMO"></td>
<td>Ejemplo con efecto 3D</td>
</tr>
<tr>
<td><code>social</code></td>
<td><img src="https://img.shields.io/badge/Social-DEMO-blue?style=social" alt="Social DEMO"></td>
<td>Estilo tipo GitHub para demos</td>
</tr>
</table>

---

## 📋 Formatos de Export (DEMO)

### Markdown (Ejemplo)

```markdown
# Inline DEMO
![Demo-Item](https://img.shields.io/badge/Demo--Item-v1.0-4A90E2)

# Table DEMO
| Badge | Descripción |
|-------|-------------|
| ![Demo-Item](url-demo) | Ejemplo de badge demo |

# List DEMO
- ![Demo-Item](url-demo)
- ![Demo-Tool](url-demo)
```

### HTML (Ejemplo)

```html
<!-- Simple DEMO -->
<img src="https://img.shields.io/badge/Demo--Item-v1.0-4A90E2" alt="Demo-Item">

<!-- Con Link DEMO -->
<a href="https://example.com">
  <img src="https://img.shields.io/badge/Demo--Item-v1.0-4A90E2" alt="Demo-Item">
</a>
```

### JSON (Ejemplo)

```json
{
  "version": "demo-1.0",
  "generated": "YYYY-MM-DDTHH:MM:SSZ",
  "badges": [
    {
      "id": "demo-badge-1",
      "label": "Demo-Item",
      "message": "v1.0",
      "color": "4A90E2",
      "url": "https://img.shields.io/badge/Demo--Item-v1.0-4A90E2"
    }
  ]
}
```

### URLs (Plain DEMO)

```
https://img.shields.io/badge/Demo--Item-v1.0-4A90E2
https://img.shields.io/badge/Demo--Tool-0.9-FF6B6B
https://img.shields.io/badge/Demo--Platform-stable-8BC34A
```

---

## 🎯 Casos de Uso (DEMO)

### 📚 Proyecto Open Source (Ejemplo)

```markdown
# Awesome Demo Open Source Project

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Demo-Lang](https://img.shields.io/badge/Demo--Lang-1.0-3776AB?style=flat-square)
![Stars](https://img.shields.io/badge/Stars-123-%23f1c40f?style=flat-square)
![Issues](https://img.shields.io/badge/Issues-7-blue?style=flat-square)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)
```

---

### 💼 Proyecto Empresarial (Ejemplo)

```markdown
# Enterprise Demo Platform

![Build](https://img.shields.io/badge/Build-Passing-success?style=for-the-badge)
![Tests](https://img.shields.io/badge/Tests-98%25-success?style=for-the-badge)
![Coverage](https://img.shields.io/badge/Coverage-90%25-green?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-A-demo-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-0.1.0--demo-orange?style=for-the-badge)
```

---

### 🎓 Portfolio Personal (Ejemplo)

```markdown
# 👋 Hola, soy [Tu Nombre DEMO]

### 📫 Contáctame (DEMO)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-DEMO-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/demo-profile)
[![GitHub](https://img.shields.io/badge/GitHub-DEMO-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/demo-user)
[![Portfolio](https://img.shields.io/badge/Portfolio-DEMO-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://demo-portfolio.com)
[![Email](https://img.shields.io/badge/Email-DEMO-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:demo@email.com)

### 🛠️ Tech Stack DEMO

![DemoLang](https://img.shields.io/badge/DemoLang-1234AB?style=flat-square)
![DemoJS](https://img.shields.io/badge/DemoJS-F7DF1E?style=flat-square)
![DemoReact](https://img.shields.io/badge/DemoReact-61DAFB?style=flat-square)
![DemoNode](https://img.shields.io/badge/DemoNode-339933?style=flat-square)
![DemoDocker](https://img.shields.io/badge/DemoDocker-2496ED?style=flat-square)
```

---

## 🔧 Características Técnicas (Plantilla)

> Esta sección es un esqueleto. Rellena con la tecnología real de tu proyecto.

### 🌐 Arquitectura Client-Side (Ejemplo)

- **HTML5**: estructura semántica de la app DEMO  
- **CSS3**: Grid, Flexbox, temas claro/oscuro de muestra  
- **JavaScript ES6+**: módulos, gestión de estado, lógica de ejemplo  
- **Sin Backend (opcional)**: 100% client-side para DEMO  
- **Sin Base de Datos (opcional)**: uso de LocalStorage/IndexedDB si aplica

### 💾 Almacenamiento Local (Ejemplo)

- **LocalStorage**: preferencias, idioma DEMO, tema seleccionado  
- **IndexedDB**: colecciones grandes de datos de ejemplo  
- **SessionStorage**: estado temporal de vistas DEMO  
- **Service Worker**: cache offline (si se implementa PWA)

### 🚀 Performance (valores simulados)

- **First Contentful Paint**: ~1s (demo)  
- **Time to Interactive**: ~2s (demo)  
- **Lighthouse Score**: 90+ (objetivo sugerido)  
- **Bundle Size**: ~200KB (ejemplo)  
- **Offline Capable**: Sí/No (según implementación real)

### 📱 Progressive Web App (PWA) (Opcional)

- ✅ Instalable en escritorio y móvil (si se configura)  
- ✅ Funciona offline (si se cachea contenido)  
- ✅ Icono en home screen  
- ✅ Experiencia fullscreen (opcional)

---

## 📖 Documentación Completa (Plantilla)

### 📂 Estructura del Proyecto (Ejemplo)

```text
TU-PROYECTO/
├── index.html              # Punto de entrada
├── manifest.json           # PWA manifest (opcional)
├── sw.js                   # Service Worker (opcional)
├── css/
│   ├── main.css            # Estilos principales
│   ├── components.css      # Componentes
│   └── themes.css          # Temas claro/oscuro
├── js/
│   ├── app.js              # Inicialización
│   ├── modules/            # Módulos ES6
│   │   ├── DemoGenerator.js
│   │   ├── TemplateManager.js
│   │   ├── DragDropManager.js
│   │   ├── ExportManager.js
│   │   └── StorageManager.js
│   └── utils/              # Utilidades
├── data/
│   ├── templates/          # Templates JSON (demo)
│   │   ├── demo-languages.json
│   │   ├── demo-frameworks.json
│   │   └── ...
│   └── icons/              # Datos de iconos (demo)
├── assets/
│   └── images/             # Imágenes y logos demo
└── docs/                   # Documentación
```

### 🎨 Personalización (Plantilla)

#### Añadir Templates Custom DEMO

Ejemplo de estructura JSON para un template demo:

```json
[
  {
    "id": "demo-badge",
    "name": "Demo Badge",
    "category": "custom-demo",
    "label": "Demo",
    "message": "Badge",
    "color": "FF6B6B",
    "logo": "demo-logo",
    "logoColor": "white",
    "style": "for-the-badge",
    "description": "Badge de demostración",
    "tags": ["demo", "example"]
  }
]
```

#### Cambiar Configuración por Defecto (Ejemplo)

```javascript
export const CONFIG = {
  defaultTheme: 'auto', // 'light', 'dark', 'auto'
  defaultStyle: 'for-the-badge',
  defaultFormat: 'markdown',
  maxItems: 100 // renombra según tu lógica
};
```

---

## 🧪 Testing (Plantilla)

### Ejecutar Tests DEMO

```bash
# Abrir suite de tests en el navegador
open tests/index.html

# O con servidor local
python -m http.server 8000
# Visitar http://localhost:8000/tests/
```

### Tests Incluidos (Ejemplo)

- ✅ Unit tests: módulos individuales (demo)  
- ✅ Integration tests: flujos completos de ejemplo  
- ✅ E2E tests: escenarios de usuario simulados  
- ✅ Performance tests: métricas de rendimiento estimadas

---

## 🌍 Idiomas Soportados (DEMO)

- 🇪🇸 Español (ejemplo)  
- 🇬🇧 English (ejemplo)  
- 🇧🇷 Português (ejemplo)

> Ajusta la lista a los idiomas reales de tu proyecto.

---

## ⌨️ Atajos de Teclado (DEMO)

| Atajo           | Acción DEMO           |
|-----------------|----------------------|
| `Ctrl/Cmd + N`  | Nuevo elemento demo  |
| `Ctrl/Cmd + S`  | Guardar estado demo  |
| `Ctrl/Cmd + E`  | Exportar demo        |
| `Ctrl/Cmd + C`  | Copiar seleccionado  |
| `Ctrl/Cmd + Z`  | Deshacer             |
| `Ctrl/Cmd + Y`  | Rehacer              |
| `Delete`        | Eliminar elemento    |
| `Escape`        | Cerrar modal         |
| `Tab`           | Navegar campos       |
| `Enter`         | Confirmar acción     |

---

## 🤝 Contribuir (Plantilla)

¡Las contribuciones a tu proyecto real son bienvenidas! 🎉

### Cómo Contribuir (Ejemplo)

1. Haz **Fork** del repositorio  
2. Crea una rama: `git checkout -b feature/mi-mejora-demo`  
3. Haz commit de tus cambios: `git commit -m 'feat: mejora demo'`  
4. Haz push: `git push origin feature/mi-mejora-demo`  
5. Abre un Pull Request describiendo los cambios

### Áreas de Contribución (Ejemplo)

- 🎨 Templates y componentes demo  
- ✨ Nuevas funcionalidades reales  
- 🐛 Corrección de bugs  
- 📖 Mejora de documentación  
- 🧪 Tests adicionales  
- 🌍 Internacionalización

### Guías de Estilo (Ejemplo)

- **HTML**: semántico y accesible  
- **CSS**: metodología BEM u otra que definas  
- **JavaScript**: estándar de estilo (ESLint/Prettier)  
- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`...)

---

## 🐛 Reportar Bugs (Plantilla)

Usa la sección de *Issues* de tu repositorio para reportar errores.

**Incluye idealmente:**
- Descripción del problema  
- Pasos para reproducirlo  
- Comportamiento esperado vs actual  
- Capturas de pantalla (si aplica)  
- Navegador y versión  
- Sistema operativo

---

## 💡 Solicitar Features (Plantilla)

Para solicitar nuevas funcionalidades, abre un *issue* con etiqueta `feature-request` (o similar).

**Describe:**
- Funcionalidad deseada  
- Caso de uso  
- Beneficios  
- Mockups o ejemplos (opcional)

---

## 📜 Changelog (Opcional)

Enlaza aquí tu `CHANGELOG.md` si mantienes historial de cambios.

---

## 🗺️ Roadmap (Opcional)

Enlaza aquí tu `ROADMAP.md` o lista de tareas futuras.

### 🔮 Próximas Funcionalidades (DEMO)

- [ ] Mejora de interfaz demo  
- [ ] Nuevos componentes de ejemplo  
- [ ] Integraciones opcionales (APIs, servicios externos)  
- [ ] Modo avanzado de personalización  
- [ ] Sistema de colecciones compartibles  
- [ ] Sugerencias inteligentes (si aplica IA)

---

## 📄 Licencia (Plantilla)

Este proyecto (o tu versión basada en esta plantilla) puede estar bajo la licencia que prefieras (MIT, Apache-2.0, GPL-3.0, etc.). Asegúrate de actualizar este bloque.

```text
MIT License (EJEMPLO)

Copyright (c) YYYY Tu Nombre

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
...
```

---

## 🙏 Agradecimientos (Ejemplo)

- **[Shields.io](https://shields.io)** (si usas sus badges)  
- **[Simple Icons](https://simpleicons.org)** (si usas sus iconos)  
- **GitHub Pages** por el hosting estático  
- Comunidad y colaboradores de tu proyecto

---

## 🌟 Proyectos Similares / Inspiración (Opcional)

- [shields.io](https://shields.io)  
- [markdown-badges](https://github.com/ileriayo/markdown-badges)  
- Cualquier otro proyecto que haya servido como referencia

---

## 📊 Estadísticas del Proyecto (DEMO)

> Ejemplos de badges de estadística. Actualiza `TU-USUARIO` y `TU-REPO`.

![Repo Size](https://img.shields.io/github/repo-size/TU-USUARIO/TU-REPO?style=flat-square)
![Code Size](https://img.shields.io/github/languages/code-size/TU-USUARIO/TU-REPO?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/TU-USUARIO/TU-REPO?style=flat-square)
![Commit Activity](https://img.shields.io/github/commit-activity/m/TU-USUARIO/TU-REPO?style=flat-square)

---

## 📞 Soporte y Contacto (Plantilla)

- 📧 **Email**: tu-email-de-contacto@example.com  
- 💬 **Canal de chat**: enlace a Discord/Slack/Matrix (opcional)  
- 🐦 **Twitter/X**: enlace a la cuenta oficial (opcional)  
- 💼 **LinkedIn**: página o perfil relacionado con el proyecto (opcional)

---

## ⭐ Star History (Opcional)

Si tu proyecto es público, puedes usar el servicio `star-history` como en este ejemplo (reemplaza usuario y repo):

[![Star History Chart](https://api.star-history.com/svg?repos=TU-USUARIO/TU-REPO&type=Date)](https://star-history.com/#TU-USUARIO/TU-REPO&Date)

---

## 🏆 Showcases (Opcional)

### Proyectos que usan esta Plantilla

¿Tu proyecto usa esta plantilla? Añade un enlace o abre un issue en tu repositorio para mostrarlo aquí.

---

<div align="center">

### 🚀 Desplegado con GitHub Pages (DEMO)

**[Ver Demo Online →](https://demo-user.github.io/demo-project-template/)**

---

**[⬆️ Volver arriba](#-demo-project-template)**

---

Hecho con ❤️ como plantilla para proyectos DEMO

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-💚-green?style=for-the-badge)
![No Backend](https://img.shields.io/badge/No%20Backend-⚡-blue?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-orange?style=for-the-badge)

</div>
