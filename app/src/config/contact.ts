/**
 * Datos de contacto oficiales de Magnus.
 * Fuente única de verdad: cualquier cambio de teléfono o email se hace acá.
 */

/** Número en formato E.164, sin espacios (para href tel:) */
export const CONTACT_PHONE_E164 = '+56951442264';

/** Número formateado para mostrar en pantalla */
export const CONTACT_PHONE_DISPLAY = '+56 9 5144 2264';

/** href listo para usar en un enlace de llamada */
export const CONTACT_PHONE_HREF = `tel:${CONTACT_PHONE_E164}`;

/** Enlace de WhatsApp (wa.me usa el número sin "+") */
export const CONTACT_WHATSAPP_HREF = `https://wa.me/${CONTACT_PHONE_E164.replace('+', '')}`;

export const CONTACT_EMAIL = 'hola@soymagnus.com';
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;
