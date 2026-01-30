# Alternativa Simple: Google Sheets (Recomendado para Principiantes)

Si Power Automate te parece muy complicado, **Google Sheets es mucho más fácil** y hace exactamente lo mismo.

---

## 🎯 ¿Por qué Google Sheets es más fácil?

| Power Automate | Google Sheets |
|----------------|---------------|
| 8 pasos complejos | 3 pasos simples |
| Necesita configurar flujos | Solo compartir un link |
| Puede tener errores técnicos | Funciona inmediatamente |
| Requiere conocimientos técnicos | Cualquiera puede hacerlo |

---

## 🚀 Opción A: Google Forms + Sheets (La más fácil)

### Paso 1: Crear el Formulario de Google
1. Ve a https://forms.google.com
2. Haz clic en el **+** para crear un formulario nuevo
3. Título: **"Pre-registro Magnus"**

### Paso 2: Agregar las preguntas
Crea una pregunta para cada campo:

| Pregunta | Tipo de respuesta | Obligatoria |
|----------|-------------------|-------------|
| Nombre | Respuesta corta | ✅ Sí |
| Apellido | Respuesta corta | ✅ Sí |
| Email | Respuesta corta | ✅ Sí |
| Teléfono | Respuesta corta | ✅ Sí |
| Dirección de la propiedad | Respuesta corta | ✅ Sí |
| Comuna | Lista desplegable | ✅ Sí |
| Rol de contribuciones | Respuesta corta | ✅ Sí |
| Tipo de propiedad | Opción múltiple (Casa/Departamento) | ✅ Sí |
| Metros construidos | Respuesta corta | No |
| Metros totales | Respuesta corta | No |

### Paso 3: Configurar la lista de comunas
Para la pregunta "Comuna":
1. Selecciona tipo **"Lista desplegable"**
2. Agrega las comunas principales:
   - Las Condes
   - Providencia
   - Ñuñoa
   - Vitacura
   - La Reina
   - Santiago
   - (agrega las que necesites)

### Paso 4: Obtener el link del formulario
1. Arriba a la derecha haz clic en **"Enviar"**
2. Selecciona la pestaña **"Link"**
3. Haz clic en **"Copiar"**
4. El link se ve así: `https://forms.gle/XXXXXXXX`

### Paso 5: Los datos se guardan automáticamente
- Cada respuesta se guarda automáticamente en una hoja de Google Sheets
- Para verlos: Ve a **"Respuestas"** > **"Ver en Sheets"**

---

## 🚀 Opción B: Google Sheets directo con Apps Script

Si quieres que los datos vayan directamente a una hoja de cálculo sin formulario:

### Paso 1: Crear la hoja de Google Sheets
1. Ve a https://sheets.google.com
2. Crea una hoja nueva
3. Nombre: **"Pre-registros Magnus"**
4. En la primera fila, escribe los encabezados:
   - A1: Fecha
   - B1: Nombre
   - C1: Apellido
   - D1: Email
   - E1: Teléfono
   - F1: Dirección
   - G1: Comuna
   - H1: Rol
   - I1: Tipo Propiedad
   - J1: Metros Construidos
   - K1: Metros Totales

### Paso 2: Crear el script
1. En el menú de Sheets, ve a **"Extensiones"** > **"Apps Script"**
2. Borra todo el código que aparece
3. Pega este código:

```javascript
function doPost(e) {
  // Abrir la hoja activa
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Obtener los datos enviados
  var data = JSON.parse(e.postData.contents);
  
  // Agregar nueva fila
  sheet.appendRow([
    new Date(),                          // Fecha automática
    data.nombre,
    data.apellido,
    data.email,
    data.telefono,
    data.direccion,
    data.comuna,
    data.rol,
    data.tipoPropiedad,
    data.metrosConstruidos,
    data.metrosTotales
  ]);
  
  // Responder éxito
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

4. Haz clic en **"Guardar"** (icono de disco)
5. Nombra el proyecto: `Magnus-PreRegistros`

### Paso 3: Desplegar como aplicación web
1. Haz clic en **"Implementar"** (Deploy) > **"Nueva implementación"**
2. En "Tipo" selecciona: **"Aplicación web"**
3. Descripción: `API Pre-registros Magnus`
4. "Acceder como": **"Yo"**
5. "Quién tiene acceso": **"Cualquiera"**
6. Haz clic en **"Implementar"**
7. Te pedirá autorización - haz clic en **"Autorizar"** y sigue los pasos
8. Al final, copia la **"URL de la aplicación web"**

### Paso 4: Usar la URL en la landing page
La URL se ve así:
```
https://script.google.com/macros/s/XXXXXXXX/exec
```

Envía esta URL para actualizar el código.

---

## 📊 Comparación de Opciones

| Característica | Power Automate | Google Forms | Google Sheets + Script |
|----------------|----------------|--------------|------------------------|
| Dificultad | ⭐⭐⭐⭐ Difícil | ⭐ Fácil | ⭐⭐ Medio |
| Tiempo de setup | 20-30 min | 5 min | 15 min |
| Personalización | Alta | Media | Alta |
| Costo | Gratis (con Microsoft) | Gratis | Gratis |
| Fiabilidad | Alta | Muy alta | Alta |

---

## 💡 Mi Recomendación

**Para empezar rápido:** Usa **Google Forms** (Opción A)
- Es la más fácil
- Funciona inmediatamente
- Puedes ver los datos en tiempo real
- Puedes exportar a Excel cuando quieras

**Para personalización:** Usa **Google Sheets + Apps Script** (Opción B)
- Los datos van directo a tu hoja
- Puedes personalizar todo
- No hay formulario intermedio

---

## 🆘 ¿Necesitas ayuda con Google Sheets?

Si eliges Google Sheets y necesitas ayuda, puedo:
1. Crear el formulario de Google Forms por ti
2. Configurar el script de Apps Script
3. Probar que todo funcione

Solo dime qué opción prefieres y te ayudo paso a paso.

---

## ✅ Ventajas de Google Sheets sobre Power Automate

1. **Más fácil de configurar** - 3 pasos vs 8 pasos
2. **Menos errores** - Funciona a la primera
3. **Más intuitivo** - Interfaz familiar
4. **Acceso inmediato** - Los datos aparecen al instante
5. **Fácil de compartir** - Puedes dar acceso a tu equipo
6. **Exportable** - Puedes descargar a Excel cuando quieras

---

**¿Qué opción prefieres?**
- A) Google Forms (la más fácil)
- B) Google Sheets + Script (más personalizable)
- C) Power Automate (ya lo empecé, quiero terminarlo)
