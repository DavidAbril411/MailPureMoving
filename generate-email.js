/**
 * Pure Moving - Email Template Generator
 * Genera emails personalizados a partir de datos de leads
 *
 * Uso:
 * const generator = new EmailTemplateGenerator();
 * const html = generator.generateFromLead(leadData);
 */

class EmailTemplateGenerator {
  constructor(templatePath = './lead-email-template.html') {
    this.templatePath = templatePath;
  }

  /**
   * Genera HTML personalizado a partir de datos del lead
   * @param {Object} leadData - Datos del cliente
   * @returns {string} - HTML renderizado
   */
  generateFromLead(leadData) {
    const fs = require('fs');
    let html = fs.readFileSync(this.templatePath, 'utf-8');

    // Reemplazar cada variable editable
    Object.entries(leadData).forEach(([key, value]) => {
      const regex = new RegExp(
        `data-editable="${key}">[^<]*<`,
        'g'
      );
      const replacement = `data-editable="${key}">${this.escapeHtml(value)}<`;
      html = html.replace(regex, replacement);
    });

    return html;
  }

  /**
   * Genera HTML sin atributos data-editable (para envío final)
   * @param {Object} leadData - Datos del cliente
   * @returns {string} - HTML limpio
   */
  generateClean(leadData) {
    const html = this.generateFromLead(leadData);
    return html.replace(/\s*data-editable="[^"]*"/g, '');
  }

  /**
   * Valida que todos los campos requeridos estén presentes
   * @param {Object} leadData - Datos del cliente
   * @throws {Error} - Si faltan campos requeridos
   */
  validateLead(leadData) {
    const required = [
      'customer_name',
      'customer_email',
      'customer_phone',
      'order_number',
      'move_date',
      'arrival_window',
      'move_size',
      'pickup_city',
      'pickup_state',
      'pickup_zip',
      'delivery_city',
      'delivery_state',
      'delivery_zip'
    ];

    const missing = required.filter(field => !leadData[field]);
    if (missing.length > 0) {
      throw new Error(`Campos faltantes: ${missing.join(', ')}`);
    }
  }

  /**
   * Escapa caracteres HTML especiales
   * @param {string} text - Texto a escapar
   * @returns {string} - Texto escapado
   */
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, char => map[char]);
  }

  /**
   * Formatea fechas en formato legible
   * @param {Date|string} date - Fecha a formatear
   * @returns {string} - Fecha formateada
   */
  formatDate(date) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(date).toLocaleDateString('es-ES', options);
  }

  /**
   * Formatea números de teléfono
   * @param {string} phone - Teléfono sin formato
   * @returns {string} - Teléfono formateado
   */
  formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  }

  /**
   * Crea un lead con datos completos
   * @param {Object} partialData - Datos parciales del lead
   * @returns {Object} - Datos completos con valores por defecto
   */
  createCompleteLead(partialData) {
    const defaults = {
      customer_name: 'Cliente',
      customer_email: 'cliente@email.com',
      customer_phone: '(000) 000-0000',
      order_number: 'XXXX',
      move_date: 'Pendiente de confirmar',
      arrival_window: 'No establecida',
      move_size: 'A definir',
      total_distance: '0 millas',
      pickup_address: '',
      pickup_city: 'Irwindale',
      pickup_state: 'California',
      pickup_zip: '91702',
      delivery_address: '',
      delivery_city: 'Irwindale',
      delivery_state: 'California',
      delivery_zip: '91702',
      additional_notes: 'Sin notas adicionales'
    };

    return { ...defaults, ...partialData };
  }
}

// ==================== EJEMPLOS DE USO ====================

// Ejemplo 1: Lead de ejemplo
function ejemplo1() {
  const generator = new EmailTemplateGenerator();

  const leadData = {
    customer_name: 'Juan García López',
    customer_email: 'juan.garcia@email.com',
    customer_phone: '(555) 123-4567',
    order_number: 'PV 000001',
    move_date: '15 de Abril, 2026',
    arrival_window: '8:00 AM - 12:00 PM',
    move_size: '2 Dormitorios | 1,200 SqFt',
    total_distance: '45 millas',
    pickup_address: '123 Main Street',
    pickup_city: 'Los Angeles',
    pickup_state: 'California',
    pickup_zip: '90001',
    delivery_address: '456 Oak Avenue',
    delivery_city: 'San Diego',
    delivery_state: 'California',
    delivery_zip: '92101',
    additional_notes: 'Cliente VIP - Tienen mascotas en el lugar'
  };

  const html = generator.generateClean(leadData);
  // Guardar en archivo
  const fs = require('fs');
  fs.writeFileSync('./email-juan-garcia.html', html);
  console.log('✅ Email generado: email-juan-garcia.html');
}

// Ejemplo 2: Validación de lead
function ejemplo2() {
  const generator = new EmailTemplateGenerator();

  const leadIncompleto = {
    customer_name: 'María Rodríguez'
    // Faltan otros campos
  };

  try {
    generator.validateLead(leadIncompleto);
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

// Ejemplo 3: Uso con datos de base de datos
function ejemplo3() {
  const generator = new EmailTemplateGenerator();

  // Simular datos de una base de datos
  const leadsFromDB = [
    {
      customer_name: 'Carlos Mendez',
      customer_email: 'carlos@email.com',
      customer_phone: '(555) 987-6543',
      order_number: 'PV 000002',
      move_date: '20 de Abril, 2026',
      arrival_window: '1:00 PM - 5:00 PM',
      move_size: '1 Dormitorio | 800 SqFt',
      total_distance: '0 millas',
      pickup_city: 'Los Angeles',
      pickup_state: 'California',
      pickup_zip: '90002',
      delivery_city: 'Los Angeles',
      delivery_state: 'California',
      delivery_zip: '90010',
      additional_notes: 'Mudanza local'
    },
    {
      customer_name: 'Sofia Rodriguez',
      customer_email: 'sofia@email.com',
      customer_phone: '(555) 234-5678',
      order_number: 'PV 000003',
      move_date: '25 de Abril, 2026',
      arrival_window: '10:00 AM - 3:00 PM',
      move_size: '3 Dormitorios | 1,800 SqFt',
      total_distance: '120 millas',
      pickup_city: 'Los Angeles',
      pickup_state: 'California',
      pickup_zip: '90003',
      delivery_city: 'San Francisco',
      delivery_state: 'California',
      delivery_zip: '94102',
      additional_notes: 'Cliente con artículos frágiles'
    }
  ];

  const fs = require('fs');
  leadsFromDB.forEach((lead, index) => {
    const html = generator.generateClean(lead);
    fs.writeFileSync(`./email-lead-${index + 1}.html`, html);
    console.log(`✅ Email ${index + 1} generado para ${lead.customer_name}`);
  });
}

// ==================== EXPORTAR PARA USO EN OTROS MÓDULOS ====================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EmailTemplateGenerator;
}

// ==================== EJECUTAR EJEMPLOS ====================
// Descomenta para ejecutar
// ejemplo1();
// ejemplo2();
// ejemplo3();
