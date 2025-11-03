// Optional utility to forward a newly created lead to an external webhook
// (e.g., Google Apps Script Web App or Zapier) which can append the data to a Google Sheet.

export async function postLeadToWebhook(webhookUrl, lead) {
  if (!webhookUrl) return;

  try {
    // Allow an optional secret header to be sent for basic protection of the webhook endpoint
    const secret = process.env.SHEETS_WEBHOOK_SECRET;
    const headers = { 'Content-Type': 'application/json' };
    if (secret) headers['X-WEBHOOK-SECRET'] = secret;

    // Include secret also in the JSON body as `_secret` because some webhook receivers
    // (like Google Apps Script) don't expose request headers to the script.
    const bodyPayload = secret ? { lead, _secret: secret } : { lead };

    // Use global fetch available in modern Node.js
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyPayload)
    });

    if (!res.ok) {
      const text = await res.text().catch(() => 'no body');
      console.error(`sheetsWebhook: failed to post lead - ${res.status} ${res.statusText}: ${text}`);
    } else {
      console.log('sheetsWebhook: lead forwarded to webhook');
    }
  } catch (err) {
    console.error('sheetsWebhook: error forwarding lead to webhook', err);
  }
}
