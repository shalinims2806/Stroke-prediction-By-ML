import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Apps Script redirect fix — same helper as main route
async function postToScript(url: string, data: object) {
  const body    = JSON.stringify(data)
  const headers = { 'Content-Type': 'text/plain;charset=utf-8' }

  let res = await fetch(url, { method: 'POST', headers, body, redirect: 'manual' })

  if (res.status >= 300 && res.status < 400) {
    const loc = res.headers.get('location')
    if (loc) res = await fetch(loc, { method: 'POST', headers, body, redirect: 'follow' })
  }

  const text = await res.text()
  try { return JSON.parse(text) } catch { return { raw: text } }
}

export async function GET() {
  const results: Record<string, unknown> = {}

  // ── 1. Environment variables ─────────────────────────────────────────────
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL
  const apiKey    = process.env.RESEND_API_KEY
  const emailFrom = process.env.EMAIL_FROM
  const emailTo   = process.env.EMAIL_TO

  results.env = {
    GOOGLE_APPS_SCRIPT_URL: scriptUrl
      ? `✓ loaded (${scriptUrl.length} chars, ends with ...${scriptUrl.slice(-6)})`
      : '✗ MISSING — not in .env.local or server not restarted',
    RESEND_API_KEY: apiKey
      ? `✓ loaded (starts with ${apiKey.slice(0, 6)}...)`
      : '✗ MISSING — not in .env.local or server not restarted',
    EMAIL_FROM: emailFrom ? `✓ ${emailFrom}` : '✗ MISSING (using default: onboarding@resend.dev)',
    EMAIL_TO:   emailTo   ? `✓ ${emailTo}`   : '✗ MISSING (using default: shalinims2806@gmail.com)',
  }

  // ── 2. Google Apps Script → Sheets ──────────────────────────────────────
  if (!scriptUrl) {
    results.googleSheets = '✗ SKIPPED — GOOGLE_APPS_SCRIPT_URL not set'
  } else {
    try {
      const resp = await postToScript(scriptUrl, {
        timestamp: new Date().toISOString(),
        name:      'DIAGNOSTIC TEST',
        email:     emailTo ?? 'shalinims2806@gmail.com',
        subject:   'Contact Form Diagnostic Test',
        company:   'System Test',
        country:   'Test',
        message:   'This row was written by the /api/contact-test diagnostic endpoint. Safe to delete.',
      })
      results.googleSheets = resp?.status === 'ok'
        ? '✓ success — row written to sheet'
        : `✗ error — Apps Script returned: ${JSON.stringify(resp)}`
    } catch (e: unknown) {
      results.googleSheets = `✗ network error — ${e instanceof Error ? e.message : String(e)}`
    }
  }

  // ── 3. Resend email ──────────────────────────────────────────────────────
  if (!apiKey) {
    results.email = '✗ SKIPPED — RESEND_API_KEY not set'
  } else {
    try {
      const resend = new Resend(apiKey)
      const from = emailFrom ?? 'onboarding@resend.dev'
      const to   = emailTo   ?? 'shalinims2806@gmail.com'
      const resp = await resend.emails.send({
        from,
        to,
        subject: '[Portfolio Diagnostic] Contact Form Test Email',
        html: `<div style="font-family:monospace;padding:20px;background:#050a1a;color:#00d4ff;">
          <h2>✅ Contact Form Diagnostic</h2>
          <p style="color:#94a3b8">This email confirms your Resend integration is working.</p>
          <p style="color:#64748b;font-size:12px">Sent from /api/contact-test at ${new Date().toISOString()}</p>
        </div>`,
      })
      results.email = resp.error
        ? `✗ Resend error — ${JSON.stringify(resp.error)}`
        : `✓ success — email sent, id: ${resp.data?.id}`
    } catch (e: unknown) {
      results.email = `✗ exception — ${e instanceof Error ? e.message : String(e)}`
    }
  }

  // ── 4. Overall status ────────────────────────────────────────────────────
  const allPass =
    typeof results.googleSheets === 'string' && results.googleSheets.startsWith('✓') &&
    typeof results.email        === 'string' && results.email.startsWith('✓')

  const anyFail =
    typeof results.googleSheets === 'string' && results.googleSheets.startsWith('✗') ||
    typeof results.email        === 'string' && results.email.startsWith('✗')

  results.status = allPass ? 'ok' : anyFail ? 'fail' : 'partial'
  results.checkedAt = new Date().toISOString()

  return NextResponse.json(results, { status: 200 })
}
