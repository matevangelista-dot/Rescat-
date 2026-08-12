// Netlify Function — actúa de backend seguro entre la app y la API de Anthropic.
// La API key vive acá (variable de entorno en Netlify), nunca en el HTML del cliente.

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  let prompt;
  try {
    const body = JSON.parse(event.body || '{}');
    prompt = body.prompt;
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Body inválido' }) };
  }

  if (!prompt) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Falta el prompt' }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Falta
