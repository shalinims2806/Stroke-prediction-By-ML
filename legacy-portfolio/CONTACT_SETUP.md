# Contact Form Setup Guide
> Google Sheets + Resend → Professional portfolio lead CRM

---

## How It Works

```
Visitor submits form
  → Next.js /api/contact (server-side: validates, rate limits, honeypot)
      → Google Apps Script → appends row to your Google Sheet
      → Resend → email notification to you + auto-reply to visitor
```

---

## Step 1 — Create Your Google Sheet

1. Go to **[sheets.google.com](https://sheets.google.com)** → **Blank spreadsheet**
2. Name it: `Portfolio Leads`
3. In **Row 1**, add these headers exactly:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Subject | Company | Country | Message | Status | Notes |

4. Select column **H** → **Data → Data validation → Dropdown**
   - Add items: `New Lead`, `Contacted`, `In Discussion`, `Closed`
5. Copy your **Spreadsheet ID** from the URL:
   `docs.google.com/spreadsheets/d/**[THIS_PART]**/edit`

---

## Step 2 — Google Apps Script

1. In your Sheet → **Extensions → Apps Script**
2. Delete all existing code, paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data  = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name      || '',
      data.email     || '',
      data.subject   || '',
      data.company   || '',
      data.country   || '',
      data.message   || '',
      'New Lead',
      ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Portfolio Lead API running.');
}
```

3. **Save** (Ctrl+S)
4. Click **Deploy → New deployment**
5. Type: **Web app**
6. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. **Deploy → Authorize** (allow all Google permissions)
8. Copy the **Web app URL** → looks like:
   `https://script.google.com/macros/s/AKfyc.../exec`

> **Important:** Every time you edit the script, click **Deploy → Manage deployments → Edit → New version** to update the live URL.

---

## Step 3 — Resend (Free Email Service)

1. Go to **[resend.com](https://resend.com)** → Sign up (free tier: 100 emails/day)
2. **API Keys → Create API Key** → name it `Portfolio`
3. Copy the key (starts with `re_`)
4. *(Optional for production)* Verify your own domain for professional `from` address

---

## Step 4 — Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
# Your Google Apps Script web app URL
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec

# Resend API key
RESEND_API_KEY=re_YOUR_KEY_HERE

# Sending address — use onboarding@resend.dev for testing
# For production: verify your domain in Resend and use your own email
EMAIL_FROM=onboarding@resend.dev

# Where lead notifications are sent (your email)
EMAIL_TO=shalinims2806@gmail.com
```

> `.env.local` is in `.gitignore` — it will never be committed to GitHub.

---

## Step 5 — Test Locally

```bash
npm run dev
```

Open http://localhost:3000 → scroll to **Get In Touch** → fill the form → Submit.

Check:
- ✅ Your Google Sheet got a new row
- ✅ You received a notification email
- ✅ The sender received an auto-reply

---

## Step 6 — Deploy to Vercel

1. Push to GitHub
2. **vercel.com → Import → select repo → Deploy**
3. Go to **Project Settings → Environment Variables** → add:

| Name | Value |
|---|---|
| `GOOGLE_APPS_SCRIPT_URL` | your script URL |
| `RESEND_API_KEY` | `re_...` |
| `EMAIL_FROM` | `onboarding@resend.dev` |
| `EMAIL_TO` | `shalinims2806@gmail.com` |

4. **Redeploy** (Settings → Deployments → Redeploy)

---

## Security Features

| Feature | How it works |
|---|---|
| **Rate limiting** | Max 3 submissions per IP per hour (server-side in-memory) |
| **Honeypot field** | Hidden `website` input — bots fill it, humans don't → silent reject |
| **Server validation** | Name ≥2 chars, valid email regex, subject ≥3 chars, message ≥10 chars, all max lengths enforced |
| **Env vars** | API keys only on server — never exposed to client bundle |
| **Non-fatal failures** | Sheet write and email send failures don't break the form UX |

---

## Google Sheets as Mini CRM

| Column | Purpose |
|---|---|
| **Status (H)** | Update to `Contacted` / `In Discussion` / `Closed` as you follow up |
| **Notes (I)** | Add follow-up notes, dates, outcomes |
| Timestamp | All entries timestamped in ISO 8601 |

---

## Troubleshooting

**Form submits but nothing in Sheets?**
→ Re-deploy your Apps Script as a **new version** with access = Anyone
→ Verify `GOOGLE_APPS_SCRIPT_URL` is the `/exec` URL (not `/dev`)

**No emails arriving?**
→ Check `RESEND_API_KEY` in Vercel env vars is correct
→ Check spam folder
→ For production: verify a domain in Resend and update `EMAIL_FROM`

**Rate limit triggered?**
→ In-memory — resets on server restart (Vercel redeploy clears it)
→ Limits: 3 submissions per IP per hour

**CORS error in console?**
→ The form calls your own `/api/contact` — no CORS issues. Apps Script is called server-side.
