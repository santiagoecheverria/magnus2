# Guía Power Automate para Principiantes - Paso a Paso

## 🎯 Objetivo
Configurar un sistema que guarde automáticamente los pre-registros de Magnus en un archivo Excel cada vez que alguien complete el formulario.

---

## 📋 ANTES DE EMPEZAR - Checklist

Antes de comenzar, asegúrate de tener:

- [ ] Una cuenta de Microsoft (Outlook, Hotmail, o cuenta de trabajo)
- [ ] El archivo Excel guardado en OneDrive (nube de Microsoft)
- [ ] 15-20 minutos de tiempo

---

## 🔧 PASO 1: Preparar el Archivo Excel

### 1.1 Crear el archivo Excel
1. Abre Excel en tu computadora (o Excel Online en el navegador)
2. Crea un archivo nuevo en blanco
3. Guarda el archivo con nombre: `Pre-registros-Magnus.xlsx`

### 1.2 Crear la tabla con las columnas
El archivo necesita una **TABLA** con estas columnas exactas:

| Columna A | Columna B | Columna C | Columna D | Columna E | Columna F | Columna G | Columna H | Columna I | Columna J | Columna K | Columna L |
|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|
| Fecha Registro | Nombre | Apellido | Email | Teléfono | Dirección | Comuna | Rol | Tipo Propiedad | Metros Construidos | Metros Totales | Fuente |

**IMPORTANTE:** La primera fila debe ser los encabezados (títulos de columnas).

### 1.3 Convertir a tabla
1. Selecciona todas las celdas con datos (A1:L1)
2. Ve a la pestaña **"Insertar"** en el menú de Excel
3. Haz clic en **"Tabla"** (icono de cuadrícula)
4. Aparecerá una ventana - asegúrate de que "Mi tabla tiene encabezados" esté marcado
5. Haz clic en **"Aceptar"**

### 1.4 Nombrar la tabla (IMPORTANTE)
1. Haz clic en cualquier celda de la tabla
2. Ve a la pestaña **"Diseño de tabla"** (aparece arriba cuando seleccionas la tabla)
3. En el lado izquierdo verás "Nombre de la tabla:" - cambia el nombre a: **`PreRegistros`**
4. Presiona Enter

### 1.5 Guardar en OneDrive
1. Ve a **Archivo > Guardar como**
2. Selecciona **OneDrive** (tu cuenta personal)
3. Guarda en la carpeta raíz (directamente en OneDrive, no en subcarpetas)
4. Cierra Excel

---

## 🌐 PASO 2: Entrar a Power Automate

### 2.1 Abrir Power Automate
1. Abre tu navegador (Chrome, Edge, Safari, etc.)
2. Ve a: **https://flow.microsoft.com**
3. Inicia sesión con la **MISMA cuenta de Microsoft** donde guardaste el Excel

### 2.2 Verificar que estás en la página correcta
Deberías ver una página con el título **"Power Automate"** y un botón naranja que dice **"Crear"** en el menú de la izquierda.

---

## ➕ PASO 3: Crear el Flujo Nuevo

### 3.1 Iniciar creación de flujo
1. Haz clic en el botón **"Crear"** (naranja, en el menú izquierdo)
2. Verás varias opciones - selecciona **"Flujo de nube automatizado"** (Automated cloud flow)

### 3.2 Nombrar el flujo
1. Aparecerá una ventana emergente
2. En el campo "Nombre del flujo" escribe: **`Guardar Pre-registros Magnus`**
3. Haz clic en **"Omitir"** (Skip) - el botón azul abajo

---

## ⚡ PASO 4: Configurar el Trigger (El "Disparador")

El trigger es lo que "dispara" o activa el flujo. En nuestro caso, será una llamada web desde la landing page.

### 4.1 Buscar el trigger
1. Verás un campo de búsqueda que dice "Buscar conectores y acciones"
2. Escribe: **`http request`**
3. Selecciona **"When a HTTP request is received"** (Cuando se recibe una solicitud HTTP)

### 4.2 Configurar el Schema JSON (IMPORTANTE)
1. Haz clic dentro del cuadro que dice **"Request Body JSON Schema"**
2. Borra cualquier texto que haya ahí
3. Pega EXACTAMENTE este código:

```json
{
  "type": "object",
  "properties": {
    "fechaRegistro": {
      "type": "string"
    },
    "nombre": {
      "type": "string"
    },
    "apellido": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "telefono": {
      "type": "string"
    },
    "direccion": {
      "type": "string"
    },
    "comuna": {
      "type": "string"
    },
    "rol": {
      "type": "string"
    },
    "tipoPropiedad": {
      "type": "string"
    },
    "metrosConstruidos": {
      "type": "string"
    },
    "metrosTotales": {
      "type": "string"
    },
    "fuente": {
      "type": "string"
    }
  }
}
```

4. Haz clic en **"+ Nuevo paso"** (el botón azul debajo)

---

## 📊 PASO 5: Configurar la Acción de Excel

Esta acción guardará los datos en tu archivo Excel.

### 5.1 Buscar la acción de Excel
1. En el nuevo paso, en el campo de búsqueda escribe: **`excel add row`**
2. Selecciona **"Add a row into a table"** (Agregar una fila en una tabla)
3. Si te pide iniciar sesión, haz clic en **"Iniciar sesión"** y usa tu cuenta de Microsoft

### 5.2 Configurar la ubicación del archivo
Verás varios campos que configurar:

**Campo: Location**
- Haz clic en el campo
- Selecciona: **"OneDrive for Business"**

**Campo: Document Library**
- Haz clic en el campo
- Selecciona: **"OneDrive"**

**Campo: File**
- Haz clic en el campo
- Aparecerá una lista de tus archivos en OneDrive
- Busca y selecciona: **`Pre-registros-Magnus.xlsx`**

**Campo: Table**
- Haz clic en el campo
- Selecciona: **`PreRegistros`** (el nombre que le dimos a la tabla en el Paso 1)

### 5.3 Mapear los campos (CONEXIÓN DE DATOS)

Ahora viene la parte más importante: conectar cada campo del formulario con la columna correspondiente del Excel.

Verás una lista de campos como:
- Fecha Registro
- Nombre
- Apellido
- Email
- etc.

Para CADA campo, haz lo siguiente:

#### Ejemplo para "Fecha Registro":
1. Haz clic en el campo **"Fecha Registro"**
2. Aparecerá una ventana emergente a la derecha que dice **"Contenido dinámico"**
3. Busca y haz clic en **`fechaRegistro`**
4. El campo se llenará automáticamente

#### Repite para TODOS los campos:

| Campo en Power Automate | Seleccionar en "Contenido dinámico" |
|------------------------|-------------------------------------|
| Fecha Registro | fechaRegistro |
| Nombre | nombre |
| Apellido | apellido |
| Email | email |
| Teléfono | telefono |
| Dirección | direccion |
| Comuna | comuna |
| Rol | rol |
| Tipo Propiedad | tipoPropiedad |
| Metros Construidos | metrosConstruidos |
| Metros Totales | metrosTotales |
| Fuente | fuente |

**Consejo:** Si no ves el contenido dinámico, haz clic en el campo y luego en el texto azul que dice **"Ver más"** o busca en la lista.

---

## 💾 PASO 6: Guardar el Flujo

### 6.1 Guardar
1. Arriba a la derecha verás un botón que dice **"Guardar"**
2. Haz clic en **"Guardar"**
3. Espera a que aparezca un mensaje verde que dice "Guardando..." y luego "Listo"

### 6.2 Obtener la URL del Webhook (MUY IMPORTANTE)
1. Haz clic en el **primer paso** ("When a HTTP request is received")
2. Se expandirá y verás un campo que dice **"HTTP POST URL"**
3. Haz clic en el **icono de copiar** (dos cuadrados) al lado de la URL
4. La URL se ha copiado a tu portapapeles

**La URL se ve algo así:**
```
https://prod-00.brazilsouth.logic.azure.com:443/workflows/abc123/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xyz789
```

5. **Pega esta URL en un documento de Word o bloc de notas** - la necesitarás en el Paso 7

---

## 🔧 PASO 7: Actualizar el Código de la Landing Page

### 7.1 Enviar la URL a tu desarrollador
Envía la URL que copiaste en el paso anterior para que se actualice en el código.

### 7.2 O si tienes acceso al código:
1. Abre el archivo `src/sections/RegistrationForm.tsx`
2. Busca la línea que dice:
```typescript
const ONEDRIVE_WEBHOOK_URL = '...';
```
3. Reemplaza el contenido entre comillas con la URL que copiaste
4. Guarda el archivo

---

## 🧪 PASO 8: Probar que Funciona

### 8.1 Probar desde Power Automate
1. En tu flujo de Power Automate, arriba a la derecha haz clic en **"Probar"**
2. Selecciona **"Manualmente"**
3. Haz clic en **"Probar"**
4. Aparecerá una barra amarilla arriba - espera unos segundos

### 8.2 Enviar datos de prueba
1. Ve a tu landing page: https://ufpm2swtfski6.ok.kimi.link
2. Completa el formulario de pre-registro con datos de prueba:
   - Nombre: Juan
   - Apellido: Prueba
   - Email: juan.prueba@test.com
   - Teléfono: +56 9 9999 9999
   - Dirección: Av. Test 123
   - Comuna: Las Condes
   - Rol: 12345-1
   - Tipo: Casa
   - Metros: 100
3. Envía el formulario

### 8.3 Verificar en Power Automate
1. Vuelve a Power Automate
2. Deberías ver que el flujo se ejecutó (aparecerá una marca verde)
3. Si hay errores, aparecerá una X roja

### 8.4 Verificar en Excel
1. Abre tu archivo `Pre-registros-Magnus.xlsx` en OneDrive
2. Debería aparecer una nueva fila con los datos de prueba
3. ¡Felicidades! Todo está funcionando

---

## ❌ Solución de Problemas Comunes

### Problema: "No se encontró el archivo"
**Solución:**
- Asegúrate de que el archivo está en OneDrive (no en tu computadora local)
- El nombre del archivo debe ser exactamente: `Pre-registros-Magnus.xlsx`

### Problema: "No se encontró la tabla"
**Solución:**
- Abre el Excel y verifica que convertiste el rango a tabla (Paso 1.3)
- Verifica que el nombre de la tabla es exactamente: `PreRegistros` (sin espacios)

### Problema: "El flujo no se ejecuta"
**Solución:**
- Verifica que guardaste el flujo después de crearlo
- Asegúrate de que la URL del webhook está correctamente copiada al código

### Problema: "Los datos no aparecen en Excel"
**Solución:**
- Verifica que mapeaste TODOS los campos correctamente (Paso 5.3)
- Asegúrate de que los nombres de las columnas en Excel coinciden exactamente

---

## 📞 ¿Necesitas más ayuda?

Si tienes problemas, puedes:
1. Revisar la documentación oficial: https://docs.microsoft.com/power-automate
2. Buscar tutoriales en YouTube: "Power Automate Excel tutorial español"
3. Contactar soporte de Microsoft 365

---

## ✅ Checklist Final

Antes de dar por terminado, verifica:

- [ ] El archivo Excel está en OneDrive
- [ ] El archivo tiene una tabla llamada "PreRegistros"
- [ ] La tabla tiene las 12 columnas correctas
- [ ] El flujo en Power Automate está guardado
- [ ] Tienes copiada la URL del webhook
- [ ] La URL está actualizada en el código
- [ ] Hiciste una prueba exitosa

---

**¡Listo! Ahora cada pre-registro se guardará automáticamente en tu Excel.**

---

## 🎥 Video Tutorial Recomendado

Si prefieres ver un video, busca en YouTube:
- **"Power Automate guardar datos en Excel paso a paso"**
- **"Power Automate HTTP request tutorial"**

---

**Documento creado:** 30 de Enero, 2025  
**Versión:** Para principiantes
