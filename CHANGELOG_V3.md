# Magnus Landing Page - Changelog V3

## 🚀 Nuevo Deploy
**URL:** https://ufpm2swtfski6.ok.kimi.link

---

## ✅ Cambios Realizados

### 1. Actualización de Plazo: 15 años → 20 años

Se actualizaron todos los textos del sitio que mencionaban "hasta 15 años" para reflejar el nuevo plazo máximo de **20 años**:

**Archivos modificados:**
- `src/sections/Hero.tsx` - Subtítulo principal
- `src/sections/Benefits.tsx` - Descripción de beneficio "Ingreso mensual fijo"
- `src/blog/posts.ts` - Artículo "Rico en ladrillos pero pobre en efectivo"

**Textos actualizados:**
- "Recibe ingresos mensuales fijos por hasta 20 años con tu propiedad"
- "Recibe pagos mensuales estables por hasta 20 años"
- "Tú decides el plazo (5, 10, 15, 20 años o más)"

---

### 2. Cotizador Web - Fórmula Actualizada

Se corrigió la fórmula del **Monto por Arriendo** según el Excel proporcionado:

**Fórmula anterior:**
```javascript
const arriendoEstimado = valorPropiedadPesos * 0.004; // 0.4%
```

**Fórmula nueva:**
```javascript
const arriendoEstimado = valorPropiedadPesos * 0.0041666667; // 0.4167%
```

**Ejemplo con valores del Excel:**
- Tasación: 10.000 UF ($397.086.300)
- Liquidación Mensual: $1.314.356 (33,1 UF)
- Monto Arriendo: $1.654.526 (41,67 UF) ← **Corregido**
- Pago Mensual Total: $2.968.882 (74,77 UF)

**Archivo modificado:**
- `src/sections/Calculator.tsx`

---

### 3. Integración con OneDrive Excel para Pre-registros

Se implementó la funcionalidad para guardar los pre-registros directamente en el documento Excel de OneDrive.

**Cómo funciona:**
1. El usuario completa el formulario de pre-registro (2 pasos)
2. Al hacer clic en "Completar pre-registro", los datos se envían a un webhook de Microsoft Power Automate
3. Power Automate recibe los datos y los guarda en el Excel de OneDrive compartido

**Configuración requerida en Power Automate:**
```
URL del Webhook: https://prod-00.brazilsouth.logic.azure.com:443/workflows/7dab95ec1ec36bf7/triggers/manual/paths/invoke
```

**Datos enviados al Excel:**
| Campo | Descripción |
|-------|-------------|
| fechaRegistro | Fecha y hora del registro (ISO 8601) |
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

**Archivo modificado:**
- `src/sections/RegistrationForm.tsx`

**Mejoras en el formulario:**
- Estado de carga con spinner mientras se envían los datos
- Manejo de errores con mensaje al usuario
- Botón deshabilitado durante el envío

---

## 📋 Configuración del Power Automate (OneDrive)

Para que la integración funcione correctamente, debes configurar un flujo en Microsoft Power Automate:

### Pasos:
1. Ve a https://flow.microsoft.com
2. Crea un nuevo flujo tipo "Automated cloud flow"
3. Trigger: "When a HTTP request is received"
4. Agrega la acción "Add a row into a table" de Excel Online (OneDrive)
5. Selecciona el archivo Excel compartido
6. Mapea los campos del JSON recibido a las columnas del Excel
7. Guarda el flujo y copia la URL del webhook
8. Actualiza la constante `ONEDRIVE_WEBHOOK_URL` en `RegistrationForm.tsx`

### Schema JSON para el trigger:
```json
{
  "type": "object",
  "properties": {
    "fechaRegistro": {"type": "string"},
    "nombre": {"type": "string"},
    "apellido": {"type": "string"},
    "email": {"type": "string"},
    "telefono": {"type": "string"},
    "direccion": {"type": "string"},
    "comuna": {"type": "string"},
    "rol": {"type": "string"},
    "tipoPropiedad": {"type": "string"},
    "metrosConstruidos": {"type": "string"},
    "metrosTotales": {"type": "string"},
    "fuente": {"type": "string"}
  }
}
```

---

## 📊 Resumen de Archivos Modificados

| Archivo | Cambios |
|---------|---------|
| `src/sections/Hero.tsx` | "15 años" → "20 años" |
| `src/sections/Benefits.tsx` | "15 años" → "20 años" |
| `src/sections/Calculator.tsx` | Fórmula arriendo: 0.004 → 0.0041666667 |
| `src/sections/RegistrationForm.tsx` | Integración OneDrive + estados de carga |
| `src/blog/posts.ts` | "15 años" → "20 años" en artículo |

---

## 🎯 Valores del Cotizador (Validados con Excel)

| Concepto | Valor con 10.000 UF |
|----------|---------------------|
| Valor UF | $39.708,63 |
| Valor Propiedad | $397.086.300 |
| Pie (10%) | $19.854.315 |
| Cuotas | 120 meses (10 años) |
| Liquidación Mensual | $1.314.356 (33,1 UF) |
| Monto Arriendo | $1.654.526 (41,67 UF) |
| **Pago Mensual Total** | **$2.968.882 (74,77 UF)** |

---

**Fecha de actualización:** 30 de Enero, 2025  
**Versión:** 3.0  
**Estado:** ✅ Desplegado y funcionando
