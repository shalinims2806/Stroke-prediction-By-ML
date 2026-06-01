import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rate-limit'

interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
  company?: string
  country?: string
  _hpf?: string   // honeypot — renamed from 'website' to avoid browser autofill
}

function validate(data: ContactPayload): string | null {
  if (!data.name?.trim() || data.name.trim().length < 2)   return 'Name must be at least 2 characters.'
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Invalid email address.'
  if (!data.subject?.trim() || data.subject.trim().length < 3) return 'Subject must be at least 3 characters.'
  if (!data.message?.trim() || data.message.trim().length < 10) return 'Message must be at least 10 characters.'
  if (data.name.length > 100)    return 'Name is too long.'
  if (data.subject.length > 200) return 'Subject is too long.'
  if (data.message.length > 5000) return 'Message is too long.'
  return null
}

// Apps Script redirect fix: catch 302 and re-POST with body instead of following as GET
async function sendToSheet(url: string, data: object): Promise<{ ok: boolean; detail: string }> {
  const body    = JSON.stringify(data)
  const headers = { 'Content-Type': 'text/plain;charset=utf-8' }

  let res = await fetch(url, { method: 'POST', headers, body, redirect: 'manual' })
  console.log('[sheet] initial response status:', res.status)

  if (res.status >= 300 && res.status < 400) {
    const loc = res.headers.get('location')
    console.log('[sheet] following redirect to:', loc)
    if (loc) res = await fetch(loc, { method: 'POST', headers, body, redirect: 'follow' })
    console.log('[sheet] after redirect status:', res.status)
  }

  const text = await res.text()
  console.log('[sheet] raw response:', text)

  try {
    const json = JSON.parse(text)
    if (json.status === 'ok') return { ok: true, detail: 'row written' }
    return { ok: false, detail: `Apps Script error: ${json.message ?? text}` }
  } catch {
    return { ok: false, detail: `Unparseable response: ${text.slice(0, 200)}` }
  }
}

function notificationHtml(d: ContactPayload, ts: string): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
      <span style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px">${label}</span>
      <div style="color:#fff;font-size:15px;margin-top:4px">${value}</div>
    </td></tr>`

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#050a1a;font-family:Inter,Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:24px">
  <div style="background:linear-gradient(135deg,rgba(0,212,255,.12),rgba(124,58,237,.12));border:1px solid rgba(0,212,255,.3);border-radius:16px;padding:32px">
    <h1 style="color:#00d4ff;font-family:monospace;font-size:22px;text-align:center;letter-spacing:2px">⚡ NEW PORTFOLIO LEAD</h1>
    <p style="color:#64748b;font-size:12px;text-align:center;margin-top:4px">${ts}</p>
    <table style="width:100%;border-collapse:collapse;margin-top:20px">
      ${row('Name', d.name)}
      ${row('Email', `<a href="mailto:${d.email}" style="color:#00d4ff">${d.email}</a>`)}
      ${d.company ? row('Company', d.company) : ''}
      ${d.country ? row('Country', d.country) : ''}
      ${row('Subject', `<strong>${d.subject}</strong>`)}
      <tr><td style="padding:10px 0">
        <span style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px">Message</span>
        <div style="color:#94a3b8;font-size:14px;margin-top:8px;line-height:1.7;background:rgba(0,0,0,.3);padding:16px;border-radius:8px;border-left:3px solid #00d4ff">
          ${d.message.replace(/\n/g, '<br>')}
        </div>
      </td></tr>
    </table>
    <div style="margin-top:24px;text-align:center">
      <a href="mailto:${d.email}?subject=Re: ${encodeURIComponent(d.subject)}"
         style="display:inline-block;background:linear-gradient(135deg,#00d4ff,#7c3aed);color:#000;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none">
        Reply to ${d.name}
      </a>
    </div>
  </div>
</div></body></html>`
}

export async function POST(req: NextRequest) {
  console.log('\n─────────────────────────────────────')
  console.log('[contact] POST received at', new Date().toISOString())

  try {
    // ── 1. Rate limit ──────────────────────────────────────────────────────
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    console.log('[contact] IP:', ip)

    const rl = rateLimit(ip, 5, 60 * 60 * 1000)  // 5 per hour for easier testing
    console.log('[contact] rate limit:', rl)
    if (!rl.success) {
      console.log('[contact] BLOCKED by rate limit')
      return NextResponse.json({ error: 'Too many requests. Please try again in an hour.' }, { status: 429 })
    }

    // ── 2. Parse body ──────────────────────────────────────────────────────
    const body: ContactPayload = await req.json()
    console.log('[contact] payload received:', {
      name:    body.name,
      email:   body.email,
      subject: body.subject,
      messageLen: body.message?.length,
      company: body.company,
      country: body.country,
      honeypot: body._hpf ? `FILLED:"${body._hpf}"` : 'empty (good)',
    })

    // ── 3. Honeypot check ─────────────────────────────────────────────────
    if (body._hpf && body._hpf.trim().length > 0) {
      console.log('[contact] HONEYPOT triggered — bot detected, returning fake success')
      return NextResponse.json({ success: true })
    }

    // ── 4. Validate ────────────────────────────────────────────────────────
    const validationError = validate(body)
    if (validationError) {
      console.log('[contact] VALIDATION FAILED:', validationError)
      return NextResponse.json({ error: validationError }, { status: 400 })
    }
    console.log('[contact] validation passed')

    // ── 5. Env var check ───────────────────────────────────────────────────
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL
    const apiKey    = process.env.RESEND_API_KEY
    const emailFrom = process.env.EMAIL_FROM ?? 'onboarding@resend.dev'
    const emailTo   = process.env.EMAIL_TO   ?? 'shalinims2806@gmail.com'

    console.log('[contact] env check:', {
      GOOGLE_APPS_SCRIPT_URL: scriptUrl ? `✓ (${scriptUrl.length} chars)` : '✗ MISSING',
      RESEND_API_KEY:         apiKey    ? `✓ (starts: ${apiKey.slice(0,6)})` : '✗ MISSING',
      EMAIL_FROM: emailFrom,
      EMAIL_TO:   emailTo,
    })

    const { name, email, subject, message, company = '', country = '' } = body
    const timestamp = new Date().toISOString()
    const sheetResult = { ok: false, detail: 'not attempted' }
    const emailResult = { ok: false, detail: 'not attempted' }

    // ── 6. Google Sheets ───────────────────────────────────────────────────
    if (!scriptUrl) {
      console.log('[contact] SHEET SKIPPED — GOOGLE_APPS_SCRIPT_URL missing')
      Object.assign(sheetResult, { ok: false, detail: 'env var missing' })
    } else {
      console.log('[contact] sending to sheet...')
      try {
        const r = await sendToSheet(scriptUrl, { timestamp, name, email, subject, company, country, message })
        Object.assign(sheetResult, r)
        console.log('[contact] sheet result:', r)
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e)
        console.error('[contact] sheet exception:', msg)
        Object.assign(sheetResult, { ok: false, detail: msg })
      }
    }

    // ── 7. Email notification ──────────────────────────────────────────────
    if (!apiKey) {
      console.log('[contact] EMAIL SKIPPED — RESEND_API_KEY missing')
      Object.assign(emailResult, { ok: false, detail: 'env var missing' })
    } else {
      console.log('[contact] sending email via Resend to:', emailTo)
      try {
        const resend = new Resend(apiKey)
        const resp = await resend.emails.send({
          from:    emailFrom,
          to:      emailTo,
          replyTo: email,
          subject: `[Portfolio Lead] ${subject} — ${name}`,
          html:    notificationHtml(body, timestamp),
        })
        if (resp.error) {
          console.error('[contact] Resend error:', resp.error)
          Object.assign(emailResult, { ok: false, detail: JSON.stringify(resp.error) })
        } else {
          console.log('[contact] email sent, id:', resp.data?.id)
          Object.assign(emailResult, { ok: true, detail: `id:${resp.data?.id}` })
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e)
        console.error('[contact] email exception:', msg)
        Object.assign(emailResult, { ok: false, detail: msg })
      }
    }

    // ── 8. Final response ──────────────────────────────────────────────────
    console.log('[contact] final results — sheet:', sheetResult, '| email:', emailResult)
    console.log('─────────────────────────────────────\n')

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      debug: {
        sheet: sheetResult.ok ? '✓' : `✗ ${sheetResult.detail}`,
        email: emailResult.ok ? '✓' : `✗ ${emailResult.detail}`,
      },
    })

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[contact] UNHANDLED ERROR:', msg)
    return NextResponse.json(
      { error: 'Something went wrong. Please email me directly at shalinims2806@gmail.com' },
      { status: 500 }
    )
  }
}
