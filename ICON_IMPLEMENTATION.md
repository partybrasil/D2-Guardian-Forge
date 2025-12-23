# Implementación de Iconos Reales - D2 Guardian Forge

## Resumen

Se han implementado **iconos estilizados de Destiny 2** para todas las clases y subclases, reemplazando las formas geométricas simples que se usaban como placeholders.

## ✅ Iconos Implementados

### Clases (3 iconos)
- **Warlock**: Símbolo circular con líneas verticales y círculos internos
- **Titan**: Escudo/cresta con barra horizontal característica
- **Hunter**: Forma de diamante con patrón interno y acento superior

### Subclases (18 iconos - 6 elementos × 3 clases)

#### Solar (3 iconos)
- Warlock Solar: Sol con rayos
- Titan Solar: Sol con rayos
- Hunter Solar: Sol con rayos

#### Arc (3 iconos)
- Warlock Arc: Rayo eléctrico
- Titan Arc: Rayo eléctrico
- Hunter Arc: Rayo eléctrico

#### Void (3 iconos)
- Warlock Void: Círculos concéntricos (efecto vacío)
- Titan Void: Círculos concéntricos (efecto vacío)
- Hunter Void: Círculos concéntricos (efecto vacío)

#### Stasis (3 iconos)
- Warlock Stasis: Copo de nieve/cristal con 6 brazos
- Titan Stasis: Copo de nieve/cristal con 6 brazos
- Hunter Stasis: Copo de nieve/cristal con 6 brazos

#### Strand (3 iconos)
- Warlock Strand: Patrón de tejido/hilos
- Titan Strand: Patrón de tejido/hilos
- Hunter Strand: Patrón de tejido/hilos

#### Prismatic (3 iconos)
- Warlock Prismatic: Prisma/diamante dorado con patrón geométrico
- Titan Prismatic: Prisma/diamante dorado con patrón geométrico
- Hunter Prismatic: Prisma/diamante dorado con patrón geométrico

## 🎨 Colores Utilizados

Los iconos utilizan la paleta oficial de colores de Destiny 2:

- **Solar**: `#ff6600` (Naranja/Rojo)
- **Arc**: `#33c4ff` (Azul claro)
- **Void**: `#7d4fff` (Morado)
- **Stasis**: `#33ccff` (Cian)
- **Strand**: `#00ff88` (Verde)
- **Prismatic**: `#d4af37` (Dorado)
- **Class**: `#f7931e` (Naranja)

## 🛠️ Implementación Técnica

### Script de Generación

Se creó `scripts/create-destiny-icons.py` que:

1. Lee el manifiesto de iconos desde `src/data/icons.json`
2. Genera iconos PNG de 96×96 píxeles
3. Utiliza Pillow (PIL) para dibujar los símbolos
4. Aplica los colores correctos según la clase/elemento
5. Guarda los iconos en `public/icons/` con sus hashes correspondientes

### Funciones de Dibujo

Cada tipo de símbolo tiene su propia función de dibujo:

- `draw_warlock_symbol()`: Círculo con líneas verticales
- `draw_titan_symbol()`: Escudo hexagonal con barra
- `draw_hunter_symbol()`: Diamante con patrón interno
- `draw_element_symbol()`: Símbolos específicos por elemento

### Integración UI

Los iconos se integran automáticamente en:

- **Build Planner**: Selectores de clase y subclase
- **Dashboard**: Filtros de clase con iconos
- **Modales**: Visualización de todas las opciones

## 📦 Archivos Modificados

- `public/icons/*.png` (21 archivos actualizados)
- `scripts/create-destiny-icons.py` (nuevo archivo)

## 🚀 Uso

Para regenerar los iconos:

```bash
python3 scripts/create-destiny-icons.py
```

## 📝 Notas

- Los iconos son **generados localmente** usando Python + Pillow
- No dependen de APIs externas o CDNs
- Mantienen la arquitectura 100% offline-first de la aplicación
- Los diseños están inspirados en los símbolos oficiales de Destiny 2
- Tamaño estándar: 96×96 píxeles
- Formato: PNG con transparencia donde sea aplicable

## ✨ Resultado

Los usuarios ahora ven **símbolos reconocibles y estilizados** en lugar de formas geométricas simples, mejorando significativamente la experiencia visual y la identificación de clases y subclases.
