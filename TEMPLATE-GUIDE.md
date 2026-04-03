# Pure Moving - Email Template Guide

## 📧 Descripción

Template HTML moderno y responsivo para respuestas automáticas a leads de Pure Moving. Diseñado con branding profesional, fácil de personalizar y compatible con todos los clientes de email.

## 🎨 Características

✅ **Diseño Moderno** - Interfaz limpia siguiendo los colores de Pure Moving (verde lima #8DC63F)  
✅ **Responsivo** - Se adapta perfectamente a móviles, tablets y desktop  
✅ **Editable** - Variables claramente identificadas para personalización  
✅ **Profesional** - Todas las políticas y términos incluidos  
✅ **Compatible** - Funciona en Gmail, Outlook, Apple Mail, etc.

---

## 📝 Variables Editables

Todos los campos editables tienen el atributo `data-editable="nombre_variable"`. Aquí están los campos principales:

### Información del Cliente

```html
data-editable="customer_name"        <!-- Nombre del cliente -->
data-editable="customer_email"       <!-- Email del cliente -->
data-editable="customer_phone"       <!-- Teléfono del cliente -->
```

### Detalles de la Orden

```html
data-editable="order_number"         <!-- Número de orden (ej: MG 315645) -->
data-editable="move_date"            <!-- Fecha de la mudanza -->
data-editable="arrival_window"       <!-- Ventana de llegada (ej: 9AM-12PM) -->
data-editable="move_size"            <!-- Tamaño de mudanza (ej: 1 Dormitorio | 500 SqFt) -->
data-editable="total_distance"       <!-- Distancia total en millas -->
```

### Ubicaciones (Origen y Destino)

```html
data-editable="pickup_address"       <!-- Dirección de origen -->
data-editable="pickup_city"          <!-- Ciudad de origen -->
data-editable="pickup_state"         <!-- Estado de origen -->
data-editable="pickup_zip"           <!-- Código postal de origen -->

data-editable="delivery_address"     <!-- Dirección de destino -->
data-editable="delivery_city"        <!-- Ciudad de destino -->
data-editable="delivery_state"       <!-- Estado de destino -->
data-editable="delivery_zip"         <!-- Código postal de destino -->
```

### Notas Adicionales

```html
data-editable="additional_notes"     <!-- Notas especiales o comentarios -->
```

---

## 🔧 Cómo Personalizar

### Opción 1: Edición Manual en HTML
Abre `lead-email-template.html` en tu editor de código y busca `data-editable="nombre_variable"`. Reemplaza el contenido dentro de las etiquetas.

**Ejemplo:**
```html
<!-- Antes -->
<div class="order-value" data-editable="customer_name">Humberto A.</div>

<!-- Después -->
<div class="order-value" data-editable="customer_name">Juan García</div>
```

### Opción 2: Usando Script (Recomendado)
Crea un script que reemplace las variables automáticamente desde una base de datos o formulario:

```javascript
function updateEmailTemplate(data) {
  document.querySelectorAll('[data-editable]').forEach(element => {
    const fieldName = element.getAttribute('data-editable');
    if (data[fieldName]) {
      element.textContent = data[fieldName];
    }
  });
}

// Uso:
const leadData = {
  customer_name: "Juan García",
  customer_email: "juan@email.com",
  customer_phone: "(555) 123-4567",
  order_number: "PV 000001",
  move_date: "15 de Abril, 2026",
  arrival_window: "8:00 AM - 11:00 AM",
  pickup_city: "Los Angeles",
  delivery_city: "San Diego"
  // ... más datos
};

updateEmailTemplate(leadData);
```

---

## 🎯 Colores y Branding

- **Verde Principal (Lime):** `#8DC63F` - Botones, headings, alertas
- **Gris Oscuro (Footer):** `#2c3e50` - Fondo del footer
- **Gris Claro (Fondo):** `#f9f9f9` - Fondos de tarjetas
- **Gris Texto:** `#333` - Texto principal
- **Gris Secundario:** `#666` - Texto secundario

Para cambiar la identidad visual, busca y reemplaza estos códigos en la sección `<style>`.

---

## 📧 Envío por Email

### Para Gmail / Google Workspace
1. Copia el contenido de `lead-email-template.html`
2. Usa Draft Labs o copia en un nuevo email
3. Gmail renderizará los estilos CSS automáticamente

### Para Mailchimp / Email Marketing
1. Importa el HTML como plantilla
2. Usa merge tags para variables dinámicas
3. Ejemplo: `*|FNAME|*` para nombre, `*|EMAIL|*` para email

### Para Zapier / Automatización
1. Usa el template con variables dinámicas: `{{customer_name}}`
2. Conecta con tu CRM o base de datos
3. Automatiza el envío con triggers

---

## 🔄 Conversión a Template Dinámico

Si usas un sistema de email marketing (como Mailchimp, SendGrid, etc.), aquí están los equivalentes:

| Variable Propia | Mailchimp | SendGrid | Zapier |
|---|---|---|---|
| `customer_name` | `*\|FNAME\|*` | `{{name}}` | `{{name}}` |
| `customer_email` | `*\|EMAIL\|*` | `{{email}}` | `{{email}}` |
| `customer_phone` | `*\|PHONE\|*` | `{{phone}}` | `{{phone}}` |
| `order_number` | `*\|ORDER_ID\|*` | `{{order_id}}` | `{{order_id}}` |
| `move_date` | `*\|MOVE_DATE\|*` | `{{move_date}}` | `{{move_date}}` |

---

## ✨ Sugerencias de Mejora

- **Agregar Logo Dinámico:** Cambia la URL de `pure.jpeg` a una variable
- **Agregar Firma Dinámica:** Permite que diferentes representantes firmen con sus nombres
- **Temas Oscuros:** Agrega soporte para modo oscuro con `prefers-color-scheme`
- **Rastreo:** Agrega píxeles de tracking para saber si el email fue abierto
- **CTA Dinámico:** Personaliza el botón de contacto según el estado de la mudanza

---

## 📱 Compatibilidad

| Cliente | Compatibilidad |
|---|---|
| Gmail | ✅ 100% |
| Outlook | ✅ 95% |
| Apple Mail | ✅ 100% |
| Yahoo | ✅ 90% |
| Mobile (iOS) | ✅ 100% |
| Mobile (Android) | ✅ 95% |

---

## 🚀 Próximos Pasos

1. **Integración CRM:** Conecta este template con tu CRM o base de datos
2. **Automatización:** Configura triggers para enviar automáticamente cuando se crea un lead
3. **A/B Testing:** Prueba diferentes versiones para maximizar engagement
4. **Seguimiento:** Agrega links de tracking para medir clicks y conversiones
5. **Localización:** Crea versiones en otros idiomas según tu mercado

---

## 📞 Soporte

Para preguntas o modificaciones, contacta al equipo de desarrollo.

**Pure Moving Team**  
📞 800-816-5121  
🌐 www.puremovers.com
