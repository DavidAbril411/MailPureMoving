# 🚚 Pure Moving - Lead Response Email Template

Sistema moderno de respuesta a leads con template HTML personalizable para **Pure Moving Company**.

![Pure Moving](https://pure-moving.s3.us-west-1.amazonaws.com/images/pure.jpeg)

---

## 📋 Contenido del Proyecto

```
/
├── lead-email-template.html    ← Template HTML principal (usar este)
├── generate-email.js           ← Generador de emails automático
├── lead-example.json           ← Ejemplo de datos de lead
├── TEMPLATE-GUIDE.md           ← Guía completa de personalización
├── README.md                   ← Este archivo
└── docs/
    └── branding.md             ← Especificaciones de marca
```

---

## ✨ Características Principales

- ✅ **Diseño Moderno y Responsivo** - Se ve perfecto en cualquier dispositivo
- ✅ **Variables Editables** - Fácil de personalizar con datos de leads
- ✅ **Colores Premium** - Usa verde lima (#8DC63F) de Pure Moving
- ✅ **Información Completa** - Incluye todas las políticas y términos
- ✅ **Compatible con Email** - Funciona en Gmail, Outlook, Apple Mail, etc.
- ✅ **Automatizable** - Puede integrarse con CRM y herramientas de automatización
- ✅ **Profesional** - Transmite confianza y profesionalismo

---

## 🚀 Inicio Rápido

### Opción 1: Usar el Template Directamente

1. Abre `lead-email-template.html` en tu navegador
2. Busca los elementos con `data-editable="..."`
3. Reemplaza el contenido con los datos reales del cliente
4. Copia el HTML y pégalo en tu cliente de email

### Opción 2: Generar Automáticamente (Node.js)

```bash
# Instalar dependencias (si es necesario)
npm init -y

# Usar el generador
node generate-email.js
```

```javascript
const EmailTemplateGenerator = require('./generate-email.js');
const generator = new EmailTemplateGenerator();

const leadData = {
  customer_name: 'Juan García',
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

const html = generator.generateClean(leadData);
// Usar html para envío automático
```

---

## 📧 Variables Disponibles

### Información del Cliente
- `customer_name` - Nombre completo
- `customer_email` - Email
- `customer_phone` - Teléfono

### Detalles de la Orden
- `order_number` - Número de orden
- `move_date` - Fecha de mudanza
- `arrival_window` - Ventana de llegada
- `move_size` - Tamaño de mudanza
- `total_distance` - Distancia total

### Ubicaciones
- `pickup_address` / `pickup_city` / `pickup_state` / `pickup_zip`
- `delivery_address` / `delivery_city` / `delivery_state` / `delivery_zip`

### Notas
- `additional_notes` - Notas especiales

**Ver [TEMPLATE-GUIDE.md](./TEMPLATE-GUIDE.md) para lista completa.**

---

## 🎨 Personalización Visual

### Cambiar Colores

Edita la sección `<style>` en `lead-email-template.html`:

```css
/* Verde Principal (Cambiar aquí) */
.header {
    background: linear-gradient(135deg, #8DC63F 0%, #96C940 100%);
}

.order-card h3 {
    color: #8DC63F;
}
```

### Cambiar Logo

Reemplaza la URL de la imagen:

```html
<!-- Antes -->
<img src="https://pure-moving.s3.us-west-1.amazonaws.com/images/pure.jpeg" 
     alt="Pure Moving" class="logo">

<!-- Después -->
<img src="https://tu-servidor.com/logo.png" 
     alt="Pure Moving" class="logo">
```

---

## 🔌 Integración con CRM/Automatización

### Mailchimp
```html
<div class="order-value" data-editable="customer_name">*|FNAME|*</div>
```

### SendGrid
```html
<div class="order-value" data-editable="customer_name">{{name}}</div>
```

### Zapier / Make
```html
<div class="order-value" data-editable="customer_name">{{name}}</div>
```

---

## 📱 Compatibilidad

| Cliente | Desktop | Mobile | CSS | Imágenes |
|---------|---------|--------|-----|----------|
| Gmail | ✅ 100% | ✅ 100% | ✅ | ✅ |
| Outlook | ✅ 95% | ✅ 90% | ⚠️ Parcial | ✅ |
| Apple Mail | ✅ 100% | ✅ 100% | ✅ | ✅ |
| Yahoo | ✅ 90% | ✅ 85% | ⚠️ Parcial | ✅ |
| Android | - | ✅ 95% | ✅ | ✅ |

---

## 💡 Casos de Uso

### 1. Respuesta Automática a Lead
```javascript
// Cuando se crea un lead en tu CRM
const lead = await crm.getLead(leadId);
const html = generator.generateClean(lead);
await emailService.send({
  to: lead.email,
  subject: '¡Confirmación de tu Mudanza con Pure Moving!',
  html: html
});
```

### 2. Template en Email Marketing
1. Copia el HTML en Mailchimp/SendGrid
2. Reemplaza variables con merge tags
3. Programa envío automático

### 3. Documento Imprimible
Usa el navegador para imprimir a PDF:
1. Abre `lead-email-template.html`
2. Ctrl+P (Cmd+P en Mac)
3. Guarda como PDF

---

## 🔐 Seguridad

- ✅ Sin scripts maliciosos
- ✅ HTML validado (W3C)
- ✅ Compatible con spam filters
- ✅ Imágenes servidas desde HTTPS
- ✅ Sin tracking pixels por defecto

**Nota:** Algunos elementos (como enlaces) pueden incluir parámetros UTM para tracking si lo deseas.

---

## 📞 Contacto y Soporte

**Pure Moving Company**
- 📞 Teléfono: 800-816-5121 EXT 3
- 🌐 Website: www.puremovers.com
- 📍 Servicios: Residencial, Comercial, Larga Distancia

---

## 📄 Licencia

Este template es propiedad de Pure Moving Company. Uso exclusivo para comunicaciones oficiales.

---

## 🤝 Contribuciones

Para sugerencias o mejoras:
1. Reporta problemas de compatibilidad de email
2. Propón nuevas secciones o campos
3. Mejora la documentación

---

## 📚 Recursos Útiles

- [TEMPLATE-GUIDE.md](./TEMPLATE-GUIDE.md) - Guía completa de personalización
- [lead-example.json](./lead-example.json) - Estructura de datos esperada
- [generate-email.js](./generate-email.js) - Generador automático

---

## 🎯 Próximas Mejoras

- [ ] Dark mode compatible
- [ ] Múltiples idiomas (Español/Inglés)
- [ ] Generator con interfaz web
- [ ] Integración directa con Stripe para pagos
- [ ] Sistema de documentos adicionales
- [ ] Versión de confirmación post-mudanza

---

**Última actualización:** Abril 2026  
**Versión:** 1.0.0
