/**
 * Bognár Katalin Photography — Kapcsolati űrlap backend
 * Google Apps Script Web App
 *
 * TELEPÍTÉS:
 * 1. script.google.com → New project → illeszd be ezt a kódot
 * 2. Deploy → New deployment → Type: Web app
 *      - Execute as: Me (office@katalinbognar.com)
 *      - Who has access: Anyone
 * 3. Másold ki a kapott /exec URL-t, és illeszd be a weboldalon a
 *    data-endpoint="..." helyére (3 fájl: hu/foglalas, de/anfrage, en/enquiry).
 * 4. Az első futtatáskor engedélyezd a Gmail/MailApp jogosultságot.
 */

// ——— BEÁLLÍTÁSOK ———
const RECIPIENT_EMAIL = 'office@katalinbognar.com';   // ide érkeznek a megkeresések
const SEND_AUTOREPLY  = true;                          // automatikus visszaigazolás a látogatónak
const GOOGLE_SHEET_ID = '';                            // opcionális: Sheet ID a naplózáshoz, üres = kikapcsolva

// ——— Belépési pont ———
function doPost(e) {
  const out = ContentService.createTextOutput();
  out.setMimeType(ContentService.MimeType.JSON);
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return out.setContent(JSON.stringify({ ok: false, error: 'Missing post data' }));
    }

    const data = JSON.parse(e.postData.contents);

    // Honeypot — ha ki van töltve, csendben elnyeljük (bot)
    if (data.website) {
      return out.setContent(JSON.stringify({ ok: true, spam: true }));
    }

    // Kötelező mezők
    const required = ['name', 'email', 'preferredLanguage', 'service', 'location', 'message', 'gdpr'];
    const missing = required.filter(function (k) { return !String(data[k] || '').trim(); });
    if (missing.length) {
      return out.setContent(JSON.stringify({ ok: false, error: 'Missing fields', fields: missing }));
    }

    // Alapszintű e-mail-validáció
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(data.email).trim())) {
      return out.setContent(JSON.stringify({ ok: false, error: 'Invalid email' }));
    }

    // Minden mező megtisztítása + hosszkorlát
    const c = {};
    Object.keys(data).forEach(function (k) {
      c[k] = escapeHtml(String(data[k] == null ? '' : data[k]).slice(0, 4000));
    });

    // ——— Értesítő e-mail a fotósnak ———
    const subject = 'Új megkeresés — Bognár Katalin Photography — ' + (c.service || '');
    const body = [
      '<h2>Új megkeresés a weboldalról</h2>',
      row('Név', c.name),
      row('E-mail', c.email),
      row('Telefon', c.phone),
      row('Nyelv', c.preferredLanguage),
      row('Szolgáltatás', c.service),
      row('Helyszín', c.location),
      row('Kívánt időpont', c.preferredDate),
      '<p><strong>Üzenet:</strong><br>' + String(c.message).replace(/\n/g, '<br>') + '</p>',
      '<hr>',
      row('GDPR elfogadva', c.gdpr),
      row('Hozzájárulás ideje', c.consentTimestamp),
      row('Forrásoldal', c.sourcePage),
      row('Időbélyeg', c.timestamp)
    ].join('');

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: subject,
      htmlBody: body,
      replyTo: String(data.email).trim(),
      name: 'Bognár Katalin Photography'
    });

    // ——— Automatikus visszaigazolás a látogatónak ———
    if (SEND_AUTOREPLY) {
      const lang = String(data.preferredLanguage || '').toLowerCase();
      const ar = autoReply(lang, c.name);
      MailApp.sendEmail({
        to: String(data.email).trim(),
        subject: ar.subject,
        htmlBody: ar.body,
        name: 'Bognár Katalin Photography',
        replyTo: RECIPIENT_EMAIL
      });
    }

    // ——— Opcionális naplózás Google Sheetbe ———
    if (GOOGLE_SHEET_ID) {
      const sheet = SpreadsheetApp.openById(GOOGLE_SHEET_ID).getSheets()[0];
      sheet.appendRow([
        new Date(), data.name, data.email, data.phone || '',
        data.preferredLanguage, data.service, data.location,
        data.preferredDate || '', data.message,
        data.sourcePage || '', data.consentTimestamp || ''
      ]);
    }

    return out.setContent(JSON.stringify({ ok: true }));
  } catch (err) {
    return out.setContent(JSON.stringify({ ok: false, error: String(err) }));
  }
}

// Egyszerű állapot-ellenőrzés böngészőből
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'Bognár Katalin Photography contact endpoint' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ——— Segédfüggvények ———
function row(label, value) {
  return '<p><strong>' + label + ':</strong> ' + (value || '—') + '</p>';
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, function (ch) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[ch];
  });
}

function autoReply(lang, name) {
  const safeName = name || '';
  if (lang.indexOf('de') === 0) {
    return {
      subject: 'Vielen Dank für Ihre Anfrage — Bognár Katalin Photography',
      body: '<p>Hallo ' + safeName + ',</p>' +
        '<p>vielen Dank für Ihre Nachricht. Ich melde mich in der Regel innerhalb von 48 Stunden bei Ihnen.</p>' +
        '<p>Bitte prüfen Sie ggf. auch Ihren Spam-Ordner.</p>' +
        '<p>Herzliche Grüße<br>Bognár Katalin<br>www.katalinbognar.com</p>'
    };
  }
  if (lang.indexOf('en') === 0) {
    return {
      subject: 'Thank you for your enquiry — Bognár Katalin Photography',
      body: '<p>Hi ' + safeName + ',</p>' +
        '<p>thank you for your message. I usually reply within 48 hours.</p>' +
        '<p>Please also check your spam folder just in case.</p>' +
        '<p>Warm regards,<br>Katalin Bognár<br>www.katalinbognar.com</p>'
    };
  }
  return {
    subject: 'Köszönöm a megkeresésed — Bognár Katalin Photography',
    body: '<p>Szia ' + safeName + ',</p>' +
      '<p>köszönöm az üzenetedet. Általában 48 órán belül válaszolok.</p>' +
      '<p>Kérlek, ellenőrizd a spam mappát is, ha nem érkezne meg a válasz.</p>' +
      '<p>Üdvözlettel,<br>Bognár Katalin<br>www.katalinbognar.com</p>'
  };
}
