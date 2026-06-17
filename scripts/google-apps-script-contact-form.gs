
const RECIPIENT_EMAIL = 'RECIPIENT_EMAIL';
const GOOGLE_SHEET_ID = 'GOOGLE_SHEET_ID';

function doPost(e) {
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return response.setContent(JSON.stringify({ ok: false, error: 'Missing post data' }));
    }
    const data = JSON.parse(e.postData.contents);
    if (data.website) {
      return response.setContent(JSON.stringify({ ok: true, spam: true }));
    }
    const required = ['name', 'email', 'preferredLanguage', 'service', 'location', 'message', 'gdpr'];
    const missing = required.filter(function (key) { return !String(data[key] || '').trim(); });
    if (missing.length) {
      return response.setContent(JSON.stringify({ ok: false, error: 'Missing fields', fields: missing }));
    }
    const clean = {};
    Object.keys(data).forEach(function (key) { clean[key] = escapeHtml(String(data[key] || '').slice(0, 4000)); });
    const subject = 'New enquiry — Bognár Katalin Photography — ' + clean.service;
    const body = [
      '<h2>New website enquiry</h2>',
      '<p><strong>Name:</strong> ' + clean.name + '</p>',
      '<p><strong>Email:</strong> ' + clean.email + '</p>',
      '<p><strong>Phone:</strong> ' + clean.phone + '</p>',
      '<p><strong>Preferred language:</strong> ' + clean.preferredLanguage + '</p>',
      '<p><strong>Service:</strong> ' + clean.service + '</p>',
      '<p><strong>Location:</strong> ' + clean.location + '</p>',
      '<p><strong>Preferred date:</strong> ' + clean.preferredDate + '</p>',
      '<p><strong>Message:</strong><br>' + clean.message.replace(/\n/g, '<br>') + '</p>',
      '<hr>',
      '<p><strong>GDPR accepted:</strong> ' + clean.gdpr + '</p>',
      '<p><strong>Consent timestamp:</strong> ' + clean.consentTimestamp + '</p>',
      '<p><strong>Source page:</strong> ' + clean.sourcePage + '</p>',
      '<p><strong>Timestamp:</strong> ' + clean.timestamp + '</p>'
    ].join('');
    if (RECIPIENT_EMAIL && RECIPIENT_EMAIL.indexOf('RECIPIENT_EMAIL') === -1) {
      MailApp.sendEmail({ to: RECIPIENT_EMAIL, subject: subject, htmlBody: body, replyTo: clean.email });
    }
    if (GOOGLE_SHEET_ID && GOOGLE_SHEET_ID.indexOf('GOOGLE_SHEET_ID') === -1) {
      const sheet = SpreadsheetApp.openById(GOOGLE_SHEET_ID).getSheets()[0];
      sheet.appendRow([new Date(), data.name, data.email, data.phone || '', data.preferredLanguage, data.service, data.location, data.preferredDate || '', data.message, data.sourcePage || '', data.consentTimestamp || '']);
    }
    return response.setContent(JSON.stringify({ ok: true }));
  } catch (err) {
    return response.setContent(JSON.stringify({ ok: false, error: String(err) }));
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, service: 'Bognár Katalin Photography contact endpoint' })).setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, function (char) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char];
  });
}
