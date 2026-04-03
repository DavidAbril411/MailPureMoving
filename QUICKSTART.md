# 🚀 Quick Start Guide

Empieza a usar el template en **5 minutos**.

---

## 1️⃣ Ver el Template

Abre `lead-email-template.html` directamente en tu navegador:

```bash
# macOS
open lead-email-template.html

# Linux
xdg-open lead-email-template.html

# Windows
start lead-email-template.html
```

---

## 2️⃣ Personalizar con Datos Reales

### Método A: Edición Manual Rápida

Abre el archivo en tu editor favorito y busca `data-editable="customer_name"`:

```html
<!-- Busca esta línea -->
<div class="order-value" data-editable="customer_name">Humberto A.</div>

<!-- Cámbialo a -->
<div class="order-value" data-editable="customer_name">Juan García</div>
```

**Campos principales a cambiar:**
- `customer_name` → Nombre del cliente
- `customer_phone` → Teléfono
- `order_number` → Número de orden
- `move_date` → Fecha de mudanza
- Ubicaciones (origen y destino)

### Método B: Usar el Generador (Automático)

```javascript
// 1. Copiar este código en la consola del navegador o Node.js

const leadData = {
  customer_name: 'Juan García López',
  customer_email: 'juan@email.com',
  customer_phone: '(555) 123-4567',
  order_number: 'PV 000001',
  move_date: '15 de Abril, 2026',
  arrival_window: '8:00 AM - 12:00 PM',
  move_size: '2 Dormitorios | 1,200 SqFt',
  total_distance: '45 millas',
  pickup_city: 'Los Angeles',
  pickup_state: 'California',
  pickup_zip: '90001',
  delivery_city: 'San Diego',
  delivery_state: 'California',
  delivery_zip: '92101'
};

// 2. Reemplazar valores en el template
document.querySelectorAll('[data-editable]').forEach(el => {
  const fieldName = el.getAttribute('data-editable');
  if (leadData[fieldName]) {
    el.textContent = leadData[fieldName];
  }
});
```

---

## 3️⃣ Enviar el Email

### Gmail / Email Manual

1. Abre `lead-email-template.html` en el navegador
2. Presiona `Ctrl+A` o `Cmd+A` para seleccionar todo
3. Copia el contenido
4. Abre Gmail y escribe un nuevo email
5. Usa el botón "Más opciones" (⋮) → "Cambiar al modo HTML"
6. Pega el código HTML
7. Personaliza el asunto: "¡Confirmación de tu Mudanza con Pure Moving!"
8. Envía

### Automatización (Node.js)

```bash
# 1. Instala dependencias
npm install nodemailer

# 2. Crea un script (send-email.js)
const nodemailer = require('nodemailer');
const fs = require('fs');
const EmailTemplateGenerator = require('./generate-email.js');

const generator = new EmailTemplateGenerator();

const leadData = {
  customer_name: 'Juan García',
  customer_email: 'juan@email.com',
  // ... más datos
};

const emailHtml = generator.generateClean(leadData);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu-email@gmail.com',
    pass: 'tu-contraseña-app'
  }
});

transporter.sendMail({
  from: 'info@puremoving.com',
  to: leadData.customer_email,
  subject: '¡Confirmación de tu Mudanza con Pure Moving!',
  html: emailHtml
}, (err, info) => {
  if (err) console.log(err);
  else console.log('Email enviado:', info.response);
});
```

---

## 4️⃣ Personalizar Visual (Opcional)

### Cambiar el Color Verde

En `lead-email-template.html`, busca `#8DC63F` y reemplázalo:

```css
/* Verde actual */
background: linear-gradient(135deg, #8DC63F 0%, #96C940 100%);

/* Cambiar a otro color, ej: Azul */
background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
```

### Cambiar el Logo

Reemplaza la URL de la imagen:

```html
<img src="tu-nueva-url.png" alt="Pure Moving" class="logo">
```

---

## 5️⃣ Casos de Uso Comunes

### Caso 1: Respuesta a un Único Lead

```
1. Abre lead-email-template.html
2. Edita los datos manualmente
3. Copia y envía por Gmail
⏱️ Tiempo: 3 minutos
```

### Caso 2: Enviar a Múltiples Leads

```
1. Prepara una lista en JSON o CSV
2. Usa generate-email.js para generar HTMLs
3. Integra con tu CRM para envío automático
⏱️ Tiempo: Variable según volumen
```

### Caso 3: Integración con CRM

**Zapier:**
1. Crea un Zap: "Cuando se crea lead en [CRM]"
2. Acción: "Enviar email"
3. Cuerpo HTML: Copia el contenido de `lead-email-template.html`
4. Usa variables del CRM para merge tags
5. ¡Activar Zap!

**Mailchimp:**
1. Ve a Templates
2. "Create Template" → "Coded"
3. Importa el HTML de `lead-email-template.html`
4. Reemplaza variables con `*|MERGE_TAGS|*`
5. ¡Listo!

---

## 📋 Checklist para Envío

- [ ] Personalicé el nombre del cliente
- [ ] Actualicé el número de orden
- [ ] Establecí la fecha de mudanza
- [ ] Agregué las direcciones de origen y destino
- [ ] Verifiqué el teléfono y email
- [ ] Agregué notas especiales si es necesario
- [ ] Visualicé en el navegador y se ve bien
- [ ] Probé en Gmail/Outlook si es posible

---

## 🆘 Solución de Problemas

### El HTML se ve roto en Gmail

**Solución:** Gmail no renderiza algunos estilos CSS complejos. Esto es normal.
- Los colores principales funcionan
- La estructura se mantiene legible
- Los links funcionan correctamente

### Las imágenes no cargan

**Solución:** Verifica la URL de la imagen:
```html
<!-- ✅ Bien -->
<img src="https://pure-moving.s3.us-west-1.amazonaws.com/images/pure.jpeg">

<!-- ❌ Mal -->
<img src="./images/pure.jpeg"> <!-- URLs relativas no funcionan -->
```

### Las variables no se actualizan

**Solución:** Asegúrate de que el atributo `data-editable` coincida:
```html
<!-- Si quieres cambiar customer_name, busca EXACTAMENTE esto -->
data-editable="customer_name"
```

---

## 📚 Próximos Pasos

1. **Lee [README.md](./README.md)** para visión general completa
2. **Consulta [TEMPLATE-GUIDE.md](./TEMPLATE-GUIDE.md)** para todas las variables
3. **Usa [lead-example.json](./lead-example.json)** como referencia de estructura
4. **Personaliza [generate-email.js](./generate-email.js)** para tu CRM

---

## 💬 Preguntas Frecuentes

**P: ¿Puedo cambiar el color?**  
R: Sí, busca `#8DC63F` en el archivo y reemplázalo.

**P: ¿Funciona en teléfono?**  
R: Sí, es completamente responsivo.

**P: ¿Qué variables puedo cambiar?**  
R: Todas las que tengan `data-editable="..."`. Ver [TEMPLATE-GUIDE.md](./TEMPLATE-GUIDE.md).

**P: ¿Puedo agregar más campos?**  
R: Sí, replica la estructura de otros campos.

---

**¿Listo para empezar? 🚀** Abre `lead-email-template.html` ahora mismo en tu navegador.
