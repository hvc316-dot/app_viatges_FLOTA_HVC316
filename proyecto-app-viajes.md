# App de Gastos de Viaje — Documento de Referencia

## 1. Resumen
PWA (web app instalable) para llevar el control de gastos de cada viaje, con:
- Login (usuario y contraseña)
- Un viaje = un registro con lugar de recogida y entrega (ciudad, país) + enlace a Google Maps
- Fechas de recogida y entrega
- Presupuesto inicial que se va descontando con cada gasto
- Gastos por foto (OCR automático) o manuales
- Categorías: Traslados (avión, tren, bus, taxi, BlaBlaCar, ferry, otro) y Gastos (combustible, peaje, alimentación)
- Balance final: gastado vs. restante
- Sincronización con Google Sheets (una fila por gasto)

## 2. Arquitectura
```
[PWA - HTML/JS en el móvil]
        │  (fetch POST/GET)
        ▼
[Google Apps Script - Web App]
        │
        ▼
[Google Sheets - base de datos]
```
- La PWA vive en un solo archivo `index.html` (con JS/CSS embebido), se puede abrir y "Añadir a pantalla de inicio" en Android e iOS.
- El Apps Script se despliega como "Web App" con una URL propia; recibe JSON y escribe filas en Sheets.
- Los datos también se guardan en local (localStorage) para que funcione offline y luego sincronice.

## 3. Estructura de datos (Google Sheets)

**Hoja "Viajes"**
| id_viaje | usuario | ciudad_recogida | pais_recogida | ciudad_entrega | pais_entrega | fecha_recogida | fecha_entrega | presupuesto_inicial |

**Hoja "Gastos"**
| id_gasto | id_viaje | tipo (traslado/gasto) | categoria | subcategoria | importe | fecha | notas | foto_url |

- **Traslado → subcategoría:** avión, tren, bus, taxi, blablacar, ferry, otro
- **Gasto → subcategoría:** combustible, peaje, alimentación

**Hoja "Usuarios"**
| usuario | password_hash |

## 4. Pasos del proyecto
- [ ] Paso 1: Crear la hoja de Google Sheets con las 3 pestañas y columnas
- [ ] Paso 2: Crear el Apps Script (backend) y desplegarlo como Web App
- [ ] Paso 3: Construir la PWA — pantalla de login
- [ ] Paso 4: Construir la PWA — crear/listar viajes (recogida, entrega, fechas, presupuesto, mapa)
- [ ] Paso 5: Construir la PWA — apartado Traslados
- [ ] Paso 6: Construir la PWA — apartado Gastos + cámara/OCR
- [ ] Paso 7: Construir la PWA — balance (gastado / restante)
- [ ] Paso 8: Conectar PWA ↔ Apps Script (guardar y sincronizar)
- [ ] Paso 9: Probar en móvil real (Android/iPhone) y ajustar

## 5. Estado actual
Empezando por el **Paso 1**.
