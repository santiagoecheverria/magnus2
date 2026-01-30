# Magnus Landing Page - Changelog V4

## 🚀 Nuevo Deploy
**URL:** https://ufpm2swtfski6.ok.kimi.link

---

## ✅ Cambios Realizados

### 1️⃣ Logo de Magnus Agrandado 30%

**Cambios:**
- Tamaño anterior: `h-8 md:h-10` (32px / 40px)
- Tamaño nuevo: `h-10 md:h-14` (40px / 56px)

**Archivo modificado:**
- `src/sections/Header.tsx`

---

### 2️⃣ Simulador Actualizado con Valores del Excel

**Valores actualizados según Excel:**

| Parámetro | Valor Anterior | Valor Nuevo |
|-----------|----------------|-------------|
| Tasación inicial | 10.000 UF | 3.000 UF |
| Pie inicial | 500 UF | 300 UF |
| Cuotas inicial | 120 meses | 100 meses |
| Fórmula Arriendo | 0.4167% | 0.5% |

**Cálculos validados con Excel (3.000 UF):**
- Valor Propiedad: $119.125.890
- Pie (10%): $19.854.315
- Liquidación Mensual: $277.960 (7 UF)
- Monto Arriendo: $595.629 (15 UF)
- **Pago Mensual Total: $873.590 (22 UF)**

**Archivo modificado:**
- `src/sections/Calculator.tsx`

---

### 3️⃣ Fotos Agrandadas 40%

**Foto 1 - Hero (Pareja feliz):**
- Tamaño anterior: `h-auto` (altura automática)
- Tamaño nuevo: `min-height: 560px`

**Foto 2 - Trust (Señor tranquilo):**
- Tamaño anterior: `h-auto` (altura automática)
- Tamaño nuevo: `min-height: 504px`

**Archivos modificados:**
- `src/sections/Hero.tsx`
- `src/sections/Trust.tsx`

---

### 4️⃣ Guía de Configuración Power Automate

Se creó documentación completa para configurar el flujo de Power Automate:

**Documento:** `POWER_AUTOMATE_SETUP.md`

**Contenido:**
1. Requisitos previos
2. Crear el flujo en Power Automate
3. Configurar el trigger HTTP
4. Configurar la acción de Excel
5. Mapear campos
6. Obtener URL del webhook
7. Probar el flujo
8. Solución de problemas comunes

**Schema JSON para el trigger:**
```json
{
  "fechaRegistro": "string",
  "nombre": "string",
  "apellido": "string",
  "email": "string",
  "telefono": "string",
  "direccion": "string",
  "comuna": "string",
  "rol": "string",
  "tipoPropiedad": "string",
  "metrosConstruidos": "string",
  "metrosTotales": "string",
  "fuente": "string"
}
```

**Campos enviados al Excel:**
| Campo | Descripción |
|-------|-------------|
| fechaRegistro | Fecha y hora ISO 8601 |
| nombre | Nombre del solicitante |
| apellido | Apellido del solicitante |
| email | Correo electrónico |
| telefono | Teléfono de contacto |
| direccion | Dirección de la propiedad |
| comuna | Comuna de la propiedad |
| rol | Rol de contribuciones |
| tipoPropiedad | Casa o Departamento |
| metrosConstruidos | Metros cuadrados construidos |
| metrosTotales | Metros cuadrados totales |
| fuente | "Landing Page Magnus" |

---

## 📊 Resumen de Archivos Modificados

| Archivo | Cambios |
|---------|---------|
| `src/sections/Header.tsx` | Logo: h-8→h-10, md:h-10→md:h-14 |
| `src/sections/Calculator.tsx` | Valores iniciales y fórmula arriendo |
| `src/sections/Hero.tsx` | Foto: min-height: 560px |
| `src/sections/Trust.tsx` | Foto: min-height: 504px |

---

## 📋 Próximos Pasos para Power Automate

1. Ir a https://flow.microsoft.com
2. Crear flujo "When a HTTP request is received"
3. Configurar schema JSON
4. Agregar acción "Add a row into a table" (Excel Online)
5. Mapear campos al Excel
6. Guardar y copiar URL del webhook
7. Actualizar URL en `RegistrationForm.tsx`
8. Recompilar y desplegar

---

**Fecha de actualización:** 30 de Enero, 2025  
**Versión:** 4.0  
**Estado:** ✅ Desplegado y funcionando
