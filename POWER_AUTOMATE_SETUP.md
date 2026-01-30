# Guía de Configuración: Power Automate + OneDrive Excel

Esta guía te explica paso a paso cómo configurar el flujo de Microsoft Power Automate para guardar automáticamente los pre-registros de Magnus en tu archivo Excel de OneDrive.

---

## 📋 Requisitos Previos

- Cuenta de Microsoft 365 (con acceso a Power Automate)
- Archivo Excel guardado en OneDrive
- URL del archivo Excel compartido

---

## 🚀 Paso 1: Crear el Flujo en Power Automate

### 1.1 Acceder a Power Automate
1. Ve a https://flow.microsoft.com
2. Inicia sesión con tu cuenta de Microsoft 365
3. Haz clic en **"Crear"** en el menú lateral

### 1.2 Seleccionar el Tipo de Flujo
1. Selecciona **"Flujo de nube automatizado"** (Automated cloud flow)
2. Dale un nombre al flujo: `Magnus - Guardar Pre-registros en Excel`
3. Haz clic en **"Omitir"** (Skip) para crear un flujo en blanco

---

## 🎯 Paso 2: Configurar el Trigger (Disparador)

### 2.1 Agregar el Trigger HTTP
1. Busca **"When a HTTP request is received"** en el buscador de conectores
2. Haz clic para seleccionarlo
3. Haz clic en **"Usar este conector"** (Use this connector)

### 2.2 Configurar el Schema JSON
En el campo **"Request Body JSON Schema"**, pega el siguiente código:

```json
{
  "type": "object",
  "properties": {
    "fechaRegistro": {
      "type": "string",
      "description": "Fecha y hora del registro"
    },
    "nombre": {
      "type": "string",
      "description": "Nombre del solicitante"
    },
    "apellido": {
      "type": "string",
      "description": "Apellido del solicitante"
    },
    "email": {
      "type": "string",
      "description": "Correo electrónico"
    },
    "telefono": {
      "type": "string",
      "description": "Teléfono de contacto"
    },
    "direccion": {
      "type": "string",
      "description": "Dirección de la propiedad"
    },
    "comuna": {
      "type": "string",
      "description": "Comuna de la propiedad"
    },
    "rol": {
      "type": "string",
      "description": "Rol de contribuciones"
    },
    "tipoPropiedad": {
      "type": "string",
      "description": "Casa o Departamento"
    },
    "metrosConstruidos": {
      "type": "string",
      "description": "Metros cuadrados construidos"
    },
    "metrosTotales": {
      "type": "string",
      "description": "Metros cuadrados totales"
    },
    "fuente": {
      "type": "string",
      "description": "Fuente del registro"
    }
  },
  "required": [
    "nombre",
    "apellido",
    "email",
    "telefono",
    "direccion",
    "comuna",
    "rol"
  ]
}
```

4. Haz clic en **"+ Nuevo paso"** (New step)

---

## 📊 Paso 3: Configurar la Acción de Excel

### 3.1 Agregar la Acción de Excel
1. Busca **"Excel Online (Business)"** o **"Excel Online (OneDrive)"**
2. Selecciona la acción **"Add a row into a table"** (Agregar una fila en una tabla)

### 3.2 Configurar la Ubicación del Archivo

**Parámetros a configurar:**

| Campo | Valor |
|-------|-------|
| **Location** | OneDrive for Business |
| **Document Library** | OneDrive |
| **File** | Selecciona tu archivo Excel de la lista |
| **Table** | Selecciona el nombre de la tabla en tu Excel |

### 3.3 Mapear los Campos

En la sección de columnas, haz clic en cada campo y selecciona el valor dinámico correspondiente del trigger:

| Columna en Excel | Valor Dinámico |
|------------------|----------------|
| Fecha Registro | `fechaRegistro` |
| Nombre | `nombre` |
| Apellido | `apellido` |
| Email | `email` |
| Teléfono | `telefono` |
| Dirección | `direccion` |
| Comuna | `comuna` |
| Rol | `rol` |
| Tipo Propiedad | `tipoPropiedad` |
| Metros Construidos | `metrosConstruidos` |
| Metros Totales | `metrosTotales` |
| Fuente | `fuente` |

---

## 💾 Paso 4: Guardar y Obtener la URL del Webhook

### 4.1 Guardar el Flujo
1. Haz clic en **"Guardar"** (Save) en la parte superior
2. Espera a que se guarde el flujo

### 4.2 Obtener la URL del Webhook
1. Expande el trigger **"When a HTTP request is received"**
2. Verás un campo llamado **"HTTP POST URL"**
3. Copia esta URL completa

**Ejemplo de URL:**
```
https://prod-00.brazilsouth.logic.azure.com:443/workflows/XXXXX/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XXXXX
```

---

## 🔧 Paso 5: Actualizar el Código de la Landing Page

### 5.1 Actualizar la URL en el Código
1. Abre el archivo `src/sections/RegistrationForm.tsx`
2. Busca la constante `ONEDRIVE_WEBHOOK_URL`
3. Reemplaza la URL con la que copiaste de Power Automate

```typescript
const ONEDRIVE_WEBHOOK_URL = 'https://prod-00.brazilsouth.logic.azure.com:443/workflows/XXXXX/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XXXXX';
```

### 5.2 Recompilar y Desplegar
```bash
cd /mnt/okcomputer/output/app
npm run build
```

---

## 🧪 Paso 6: Probar el Flujo

### 6.1 Probar desde Power Automate
1. En el flujo de Power Automate, haz clic en **"Probar"** (Test)
2. Selecciona **"Manualmente"** (Manually)
3. Haz clic en **"Probar"**
4. Selecciona **"Ejecutar flujo"** (Run flow)

### 6.2 Enviar Datos de Prueba
Usa el siguiente JSON de prueba:

```json
{
  "fechaRegistro": "2025-01-30T10:00:00.000Z",
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@email.com",
  "telefono": "+56 9 1234 5678",
  "direccion": "Av. Providencia 1234",
  "comuna": "Providencia",
  "rol": "12345-1",
  "tipoPropiedad": "departamento",
  "metrosConstruidos": "120",
  "metrosTotales": "120",
  "fuente": "Landing Page Magnus"
}
```

### 6.3 Verificar en Excel
1. Abre tu archivo Excel en OneDrive
2. Verifica que la nueva fila se haya agregado correctamente

---

## 📸 Capturas de Pantalla de Referencia

### Estructura del Flujo Completo
```
[When a HTTP request is received]
         ↓
[Add a row into a table (Excel Online)]
```

### Ejemplo de Mapeo de Campos
```
Columna: Nombre → Valor: nombre (del trigger)
Columna: Email → Valor: email (del trigger)
...
```

---

## ⚠️ Solución de Problemas Comunes

### Error: "No se pudo encontrar el archivo"
- Verifica que el archivo Excel esté en OneDrive
- Asegúrate de que el archivo tenga una tabla creada (Insertar > Tabla)

### Error: "Schema validation failed"
- Verifica que el JSON enviado coincida exactamente con el schema definido
- Asegúrate de que todos los campos requeridos estén presentes

### Error: "403 Forbidden"
- Verifica que tu cuenta de Power Automate tenga permisos para acceder a OneDrive
- Asegúrate de que el archivo no esté bloqueado o en modo solo lectura

---

## 🔒 Seguridad Recomendada

1. **No compartas la URL del webhook** públicamente
2. **Considera agregar autenticación** usando API Keys
3. **Monitorea el uso** del flujo regularmente
4. **Configura alertas** para errores en el flujo

---

## 📞 Soporte

Si necesitas ayuda adicional:
- Documentación de Power Automate: https://docs.microsoft.com/power-automate
- Soporte de Microsoft 365: https://admin.microsoft.com

---

**Última actualización:** 30 de Enero, 2025
