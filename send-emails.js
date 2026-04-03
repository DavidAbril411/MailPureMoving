#!/usr/bin/env node
/**
 * send-emails.js
 * Envía el template HTML a múltiples destinatarios usando MailerSend.
 *
 * Uso:
 *   MAILERSEND_API_TOKEN=tu_token node send-emails.js
 *
 * O con un archivo .env (requiere: npm install dotenv)
 *   node send-emails.js
 *
 * Destinatarios: edita recipients.json
 */

// Soporte opcional para .env
try { require('dotenv').config(); } catch {}

const EmailTemplateGenerator = require('./generate-email.js');
const fs   = require('fs');
const path = require('path');

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const API_TOKEN  = process.env.MAILERSEND_API_TOKEN;
const FROM_EMAIL = process.env.FROM_EMAIL    || 'noreply@abrilcodes.com';
const FROM_NAME  = process.env.FROM_NAME     || 'Pure Moving';
const SUBJECT    = process.env.EMAIL_SUBJECT || 'Your Move Confirmation – Pure Moving';
const RECIPIENTS_FILE = process.env.RECIPIENTS_FILE || './recipients.json';

if (!API_TOKEN) {
  console.error('❌  Falta MAILERSEND_API_TOKEN. Agrégalo como variable de entorno o en .env');
  process.exit(1);
}

// ─── MIME TYPES ──────────────────────────────────────────────────────────────
const MIME_TYPES = {
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
};

// ─── PREPARE INLINE ATTACHMENTS (CID) ────────────────────────────────────────
// Las imágenes se envían como adjuntos inline con un Content-ID.
// El HTML usa src="cid:<id>" en lugar de base64 embebido en el HTML,
// evitando que Gmail corte el mensaje por superar 102 KB.
function prepareInlineAttachments(html, templateDir) {
  const attachments = [];
  const cidMap = {};

  const processedHtml = html.replace(/src="([^"]+)"/g, (match, src) => {
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('cid:')) return match;

    const filePath = path.resolve(templateDir, src);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Imagen no encontrada, se omite: ${filePath}`);
      return match;
    }

    // Reusar el mismo CID si la misma imagen aparece varias veces
    if (!cidMap[src]) {
      const ext      = path.extname(filePath).toLowerCase();
      const mime     = MIME_TYPES[ext] || 'application/octet-stream';
      const filename = path.basename(filePath);
      const cid      = `img_${attachments.length}_${filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

      attachments.push({
        content:     fs.readFileSync(filePath).toString('base64'),
        filename,
        type:        mime,
        disposition: 'inline',
        id:          cid,
      });

      cidMap[src] = cid;
    }

    return `src="cid:${cidMap[src]}"`;
  });

  return { html: processedHtml, attachments };
}

// ─── ENVÍO VIA MAILERSEND REST API ───────────────────────────────────────────
async function sendEmail({ toEmail, toName, htmlBody, attachments }) {
  const payload = {
    from:        { email: FROM_EMAIL, name: FROM_NAME },
    to:          [{ email: toEmail, name: toName }],
    subject:     SUBJECT,
    html:        htmlBody,
    attachments,
  };

  const res = await fetch('https://api.mailersend.com/v1/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 202) return { ok: true };

  let detail = '';
  try { detail = JSON.stringify(await res.json()); } catch {}
  return { ok: false, status: res.status, detail };
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(RECIPIENTS_FILE)) {
    console.error(`❌  No se encontró ${RECIPIENTS_FILE}. Crea el archivo con la lista de destinatarios.`);
    process.exit(1);
  }

  const recipients = JSON.parse(fs.readFileSync(RECIPIENTS_FILE, 'utf-8'));
  console.log(`📬  Enviando a ${recipients.length} destinatario(s)...\n`);

  const generator    = new EmailTemplateGenerator();
  const templateDir  = path.dirname(path.resolve(generator.templatePath));

  for (const lead of recipients) {
    try {
      const completeLead = generator.createCompleteLead(lead);
      const rawHtml      = generator.generateClean(completeLead);
      const { html, attachments } = prepareInlineAttachments(rawHtml, templateDir);

      const result = await sendEmail({
        toEmail:     completeLead.customer_email,
        toName:      completeLead.customer_name,
        htmlBody:    html,
        attachments,
      });

      if (result.ok) {
        console.log(`✅  Enviado a ${completeLead.customer_name} <${completeLead.customer_email}>`);
      } else {
        console.error(`❌  Error al enviar a ${completeLead.customer_email}: HTTP ${result.status} – ${result.detail}`);
      }
    } catch (err) {
      console.error(`❌  Excepción para ${lead.customer_email || '?'}: ${err.message}`);
    }

    // Pausa breve para no saturar la API
    await new Promise(r => setTimeout(r, 300));
  }

  console.log('\n✔  Proceso completado.');
}

main();
