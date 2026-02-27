# Ideas de Diseño — Tecnicor Brief Interactivo

## Contexto del Proyecto
Aplicación web donde el cliente completa un brief de proyecto en 8 etapas tipo "piso de baldosas". Cada baldosa es una sección temática del cuestionario. Al finalizar, se genera un PDF profesional con toda la información.

---

<response>
<text>

## Idea 1 — "Cyber Grid" (Dark Tech Brutalism)

**Design Movement**: Cyberpunk Brutalism + Dark Tech

**Core Principles**:
1. Rejilla de baldosas con perspectiva isométrica sutil — el "piso" se siente tridimensional
2. Contraste extremo entre fondo negro y acentos cian/neón
3. Tipografía monoespaciada para números/etiquetas, sans-serif bold para títulos
4. Progresión visual clara: baldosas "apagadas" vs "encendidas" (completadas)

**Color Philosophy**:
Negro profundo (#0a0a0f) como base absoluta. Cian brillante (#00E5FF) como color de acción y progreso — evoca pantallas de terminal, tecnología de punta. Verde neón (#00FF88) como confirmación/éxito. El contraste extremo no es solo estético: comunica precisión y profesionalismo técnico.

**Layout Paradigm**:
Piso de 8 baldosas en disposición 4×2 con perspectiva CSS 3D sutil. Las baldosas tienen un efecto de "elevación" al hover. El formulario activo se despliega desde la baldosa seleccionada hacia arriba, como una pantalla holográfica emergente.

**Signature Elements**:
1. Líneas de escaneo (scan lines) sutiles en el fondo
2. Bordes con efecto "glow" cian en elementos activos
3. Numeración de baldosas en estilo terminal (01, 02, 03...)

**Interaction Philosophy**:
Cada baldosa se "activa" con un clic y emite un pulso de luz. La transición entre baldosas usa un efecto de "carga" tipo barra de progreso. Al completar todas, las baldosas se "funden" en una animación de transformación hacia el PDF.

**Animation**:
- Entrada: baldosas caen desde arriba con stagger delay
- Hover: elevación 3D + glow border
- Completado: baldosa cambia de color oscuro a cian brillante con pulso
- Transición final: todas las baldosas colapsan al centro formando el PDF

**Typography System**:
- Display: Space Grotesk Bold (títulos de sección)
- Body: Inter Regular (preguntas y respuestas)
- Labels/números: JetBrains Mono (numeración, etiquetas técnicas)

</text>
<probability>0.08</probability>
</response>

<response>
<text>

## Idea 2 — "Neon Mosaic" (Glassmorphism Dark)

**Design Movement**: Glassmorphism + Neon Brutalism

**Core Principles**:
1. Tarjetas de vidrio esmerilado sobre fondo oscuro con gradientes de profundidad
2. Baldosas como "losas de cristal" que reflejan luz neón
3. Jerarquía visual por luminosidad: lo más brillante = lo más importante
4. Formularios flotantes con blur backdrop

**Color Philosophy**:
Fondo con gradiente radial de negro a azul marino profundo (#0a0a1a → #0d1b2a). Cian (#00E5FF) y verde (#00FF88) como luces neón que "iluminan" desde dentro de las tarjetas de vidrio. El glassmorphism crea capas de profundidad que hacen la interfaz sentirse como un panel de control futurista.

**Layout Paradigm**:
Grid 4×2 de baldosas de vidrio con backdrop-blur. Cada baldosa tiene un gradiente interno sutil. El formulario activo se expande lateralmente ocupando 2/3 de la pantalla mientras las demás baldosas se minimizan.

**Signature Elements**:
1. Bordes con gradiente cian-verde en baldosas activas
2. Partículas flotantes sutiles en el fondo
3. Indicadores de progreso tipo "puntos de luz" en la parte superior

**Interaction Philosophy**:
Interfaz fluida y elegante. Las transiciones son suaves (ease-in-out 400ms). El usuario siente que está navegando un panel de control sofisticado.

**Animation**:
- Entrada: fade-in con blur que se aclara
- Hover: brillo interno aumenta + sombra exterior
- Completado: relleno gradual de color desde el centro
- Final: morphing animado hacia pantalla de éxito

**Typography System**:
- Display: Sora ExtraBold (títulos principales)
- Body: Nunito Regular (texto de preguntas)
- Accent: Space Mono (números y códigos)

</text>
<probability>0.07</probability>
</response>

<response>
<text>

## Idea 3 — "Terminal Floor" (Retro-Tech Dark) ← SELECCIONADA

**Design Movement**: Retro-Tech Brutalism + Modern Dark UI

**Core Principles**:
1. El "piso de baldosas" es literal: una cuadrícula de tiles que se iluminan al completarse, como un tablero de control industrial
2. Estética de terminal/consola mezclada con diseño moderno — raw pero sofisticado
3. Cada baldosa tiene su propio "estado" visual claramente diferenciado: bloqueada, activa, completada
4. Progresión lineal obligatoria — el cliente no puede saltarse pasos

**Color Philosophy**:
Negro carbón (#0a0a0f) como base. Cian eléctrico (#00E5FF) como el color de "energía activa" — las baldosas completadas brillan en cian. Ámbar/amarillo (#F59E0B) como color de "en progreso". Gris oscuro (#1e1e2e) para baldosas bloqueadas. Esta paleta replica exactamente el branding de Tecnicor mientras añade semántica de estado.

**Layout Paradigm**:
Pantalla dividida: izquierda muestra el piso de baldosas (mapa de progreso persistente), derecha muestra el formulario activo de la baldosa seleccionada. En mobile: vista única que alterna entre mapa y formulario. Las baldosas no son cuadradas perfectas sino rectangulares con proporción 16:9 para dar más espacio visual.

**Signature Elements**:
1. Línea de progreso horizontal en la parte superior que avanza con cada baldosa completada
2. Icono temático único en cada baldosa (ej: paleta para colores, tipografía T para fuentes, etc.)
3. Número de baldosa en esquina superior izquierda en estilo monoespaciado

**Interaction Philosophy**:
El cliente DEBE completar cada baldosa en orden. Las baldosas futuras están visibles pero bloqueadas (con candado). Al completar una, se desbloquea la siguiente con una animación satisfactoria. La sensación es de "desbloquear logros" — gamificación sutil.

**Animation**:
- Entrada inicial: las 8 baldosas aparecen con stagger de 100ms cada una
- Hover en baldosa activa: borde cian pulsante + ligera elevación
- Completado: flash de luz cian + check mark que aparece + baldosa cambia a cian sólido
- Desbloqueo de siguiente: animación de "candado abriéndose"
- Transición final: todas las baldosas giran 180° revelando el PDF generado

**Typography System**:
- Display: Space Grotesk 800 (títulos de sección en baldosas)
- Body: Inter 400/500 (preguntas del formulario)
- Monospace: JetBrains Mono (numeración, estados, etiquetas técnicas)
- Jerarquía: Display 2xl para títulos, base para preguntas, sm para helper text

</text>
<probability>0.09</probability>
</response>

---

## Decisión Final: Idea 3 — "Terminal Floor"

Se elige esta filosofía por:
- Alineación perfecta con el branding oscuro de Tecnicor
- La metáfora del "piso de baldosas" se implementa de forma literal y funcional
- La gamificación (desbloqueo progresivo) hace el proceso más amigable para el cliente
- La división de pantalla (mapa + formulario) es más usable que un flujo de una sola columna
