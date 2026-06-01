'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, MapPin, Linkedin, Github, Phone,
  Send, CheckCircle, Loader2, AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import GlassCard from '@/components/ui/GlassCard'

interface ContactSectionProps { id?: string }

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  company: string
  country: string
  _hpf: string // honeypot — obscure name so browsers never autofill it
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const EMPTY_FORM: FormData = {
  name: '', email: '', subject: '', message: '',
  company: '', country: '', _hpf: '',
}

const contactItems = [
  { icon: Mail,     label: 'Email',    value: 'shalinims2806@gmail.com',    href: 'mailto:shalinims2806@gmail.com',     color: '#00d4ff', glow: 'cyan'   as const },
  { icon: Phone,    label: 'Phone',    value: '+91 9043571800',              href: 'tel:+919043571800',                  color: '#7c3aed', glow: 'purple' as const },
  { icon: MapPin,   label: 'Location', value: 'TamilNadu, India',            href: null,                                 color: '#ec4899', glow: 'pink'   as const },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/shalinim1228',href: 'https://linkedin.com/in/shalinim1228',color: '#f97316', glow: 'orange' as const },
  { icon: Github,   label: 'GitHub',   value: 'github.com/shalinim1228',     href: 'https://github.com/shalinim1228',    color: '#22c55e', glow: 'green'  as const },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}
const itemVariants = {
  hidden:   { opacity: 0, y: 18 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const inputBase =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm ' +
  'placeholder:text-[#64748b] focus:border-[#00d4ff]/50 focus:ring-2 focus:ring-[#00d4ff]/10 ' +
  'outline-none transition-all duration-300'

const labelCls =
  'block text-[10px] font-semibold text-[#94a3b8] mb-1.5 uppercase tracking-widest'

export default function ContactSection({ id = 'contact' }: ContactSectionProps) {
  const [form, setForm]       = useState<FormData>(EMPTY_FORM)
  const [status, setStatus]   = useState<Status>('idle')
  const [errorMsg, setError]  = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) return
    setStatus('loading')
    setError('')
    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok || json.error) {
        setError(json.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
      } else {
        setStatus('success')
        setForm(EMPTY_FORM)
      }
    } catch {
      setError('Network error. Please email me directly.')
      setStatus('error')
    }
  }

  return (
    <section id={id} className="py-24 bg-[#050a1a] relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(0,212,255,.05) 0%,transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(124,58,237,.05) 0%,transparent 70%)', filter: 'blur(60px)' }} />
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.025) 1px,transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Orbitron,sans-serif' }}>
            Get In{' '}
            <span style={{
              background: 'linear-gradient(135deg,#00d4ff,#7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Touch</span>
          </h2>
          <div className="flex justify-center mb-6">
            <motion.div className="h-1 rounded-full"
              style={{ background: 'linear-gradient(90deg,#00d4ff,#7c3aed,#ec4899)' }}
              initial={{ width: 0 }} whileInView={{ width: 96 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} />
          </div>
          <p className="text-[#94a3b8] max-w-xl mx-auto text-base"
            style={{ fontFamily: 'Inter,sans-serif' }}>
            Always open to new opportunities and collaborations. Let&apos;s build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* ── LEFT — Contact Info ────────────────────────────────────── */}
          <motion.div variants={containerVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: '-50px' }}
            className="flex flex-col gap-4">

            {/* Availability */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#22c55e]" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22c55e]" />
              </span>
              <span className="text-sm font-medium text-[#22c55e]"
                style={{ fontFamily: 'Inter,sans-serif' }}>
                Open to{' '}<span className="text-white font-semibold">Opportunities</span>
              </span>
            </motion.div>

            {/* Contact cards */}
            {contactItems.map((item) => {
              const Icon = item.icon
              const card = (
                <GlassCard hover={!!item.href} glowColor={item.glow} className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center rounded-full"
                      style={{ width: 44, height: 44, background: `${item.color}18`, border: `1px solid ${item.color}40` }}>
                      <Icon size={18} style={{ color: item.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5 text-[#64748b]"
                        style={{ fontFamily: 'Inter,sans-serif' }}>{item.label}</p>
                      <p className="text-sm text-white truncate"
                        style={{ fontFamily: 'Inter,sans-serif' }}>{item.value}</p>
                    </div>
                  </div>
                </GlassCard>
              )
              return (
                <motion.div key={item.label} variants={itemVariants}
                  whileHover={item.href ? { x: 4 } : {}} transition={{ duration: 0.2 }}>
                  {item.href
                    ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block">{card}</a>
                    : card}
                </motion.div>
              )
            })}

            {/* Social row */}
            <motion.div variants={itemVariants} className="flex gap-4 mt-2">
              {[
                { href: 'https://github.com/shalinim1228',    Icon: Github,   color: '#22c55e', label: 'GitHub' },
                { href: 'https://linkedin.com/in/shalinim1228',Icon: Linkedin, color: '#f97316', label: 'LinkedIn' },
                { href: 'mailto:shalinims2806@gmail.com',       Icon: Mail,     color: '#00d4ff', label: 'Email' },
              ].map(({ href, Icon, color, label }) => (
                <a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}>
                  <motion.div whileHover={{ scale: 1.12, y: -3 }} whileTap={{ scale: 0.94 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                    style={{ width: 52, height: 52 }}>
                    <Icon size={22} style={{ color }} />
                  </motion.div>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Contact Form ───────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}>

            <GlassCard hover={false} className="p-8 relative overflow-hidden">
              {/* Scan line animation on mount */}
              <motion.div className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/60 to-transparent pointer-events-none"
                initial={{ width: '0%', x: '-100%' }} animate={{ width: '100%', x: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.5 }} />

              {/* Form header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center rounded-lg"
                  style={{ width: 40, height: 40, background: 'linear-gradient(135deg,rgba(0,212,255,.2),rgba(124,58,237,.2))', border: '1px solid rgba(0,212,255,.3)' }}>
                  <Send size={18} style={{ color: '#00d4ff' }} />
                </div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Orbitron,sans-serif' }}>
                  Send a Message
                </h3>
              </div>
              <p className="text-sm text-[#94a3b8] mb-8" style={{ fontFamily: 'Inter,sans-serif' }}>
                I&apos;ll get back to you within 24 hours
              </p>

              {/* Success state */}
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.5, delay: 0.1 }}>
                      <CheckCircle size={56} style={{ color: '#22c55e' }} />
                    </motion.div>
                    <div>
                      <p className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron,sans-serif' }}>
                        Message Sent!
                      </p>
                      <p className="text-sm text-[#94a3b8]">I&apos;ll reply within 24 hours. Check your inbox for a confirmation.</p>
                    </div>
                    <button onClick={() => setStatus('idle')}
                      className="mt-2 text-xs text-[#64748b] hover:text-[#00d4ff] transition-colors underline underline-offset-2">
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-4"
                    initial={{ opacity: 1 }} exit={{ opacity: 0 }}>

                    {/* Honeypot — hidden from humans, bots fill this */}
                    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                      <input type="text" name="_hpf" tabIndex={-1} autoComplete="nope"
                        value={form._hpf} onChange={handleChange} />
                    </div>

                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="c-name" className={labelCls}>Name <span className="text-[#ec4899]">*</span></label>
                        <input id="c-name" type="text" name="name" required
                          value={form.name} onChange={handleChange}
                          placeholder="Your name" className={inputBase}
                          style={{ fontFamily: 'Inter,sans-serif' }} />
                      </div>
                      <div>
                        <label htmlFor="c-email" className={labelCls}>Email <span className="text-[#ec4899]">*</span></label>
                        <input id="c-email" type="email" name="email" required
                          value={form.email} onChange={handleChange}
                          placeholder="your@email.com" className={inputBase}
                          style={{ fontFamily: 'Inter,sans-serif' }} />
                      </div>
                    </div>

                    {/* Row 2: Company + Country (optional) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="c-company" className={labelCls}>Company <span className="text-[#64748b] normal-case tracking-normal text-[9px]">(optional)</span></label>
                        <input id="c-company" type="text" name="company"
                          value={form.company} onChange={handleChange}
                          placeholder="Your company" className={inputBase}
                          style={{ fontFamily: 'Inter,sans-serif' }} />
                      </div>
                      <div>
                        <label htmlFor="c-country" className={labelCls}>Country <span className="text-[#64748b] normal-case tracking-normal text-[9px]">(optional)</span></label>
                        <input id="c-country" type="text" name="country"
                          value={form.country} onChange={handleChange}
                          placeholder="Your country" className={inputBase}
                          style={{ fontFamily: 'Inter,sans-serif' }} />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="c-subject" className={labelCls}>Subject <span className="text-[#ec4899]">*</span></label>
                      <input id="c-subject" type="text" name="subject" required
                        value={form.subject} onChange={handleChange}
                        placeholder="What's this about?" className={inputBase}
                        style={{ fontFamily: 'Inter,sans-serif' }} />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="c-message" className={labelCls}>Message <span className="text-[#ec4899]">*</span></label>
                      <textarea id="c-message" name="message" required rows={5}
                        value={form.message} onChange={handleChange}
                        placeholder="Tell me about your project or opportunity..."
                        className={cn(inputBase, 'resize-none')}
                        style={{ fontFamily: 'Inter,sans-serif' }} />
                    </div>

                    {/* Error banner */}
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div key="err"
                          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                          <AlertCircle size={16} className="shrink-0" />
                          {errorMsg}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button type="submit"
                      disabled={status === 'loading'}
                      whileHover={status !== 'loading' ? { scale: 1.02, y: -1 } : {}}
                      whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        'mt-1 w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-300',
                        status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                      )}
                      style={{
                        background: status === 'error'
                          ? 'linear-gradient(135deg,rgba(239,68,68,.7),rgba(220,38,38,.7))'
                          : 'linear-gradient(135deg,#00d4ff,#7c3aed)',
                        boxShadow: status === 'loading' ? 'none' : '0 0 20px rgba(0,212,255,.25)',
                        fontFamily: 'Inter,sans-serif',
                      }}>
                      {status === 'loading' && <><Loader2 size={17} className="animate-spin" />Sending...</>}
                      {status === 'idle'    && <><Send size={17} />Send Message</>}
                      {status === 'error'   && <><Send size={17} />Try Again</>}
                    </motion.button>

                    <p className="text-center text-xs text-[#64748b]" style={{ fontFamily: 'Inter,sans-serif' }}>
                      Or reach me directly at{' '}
                      <a href="mailto:shalinims2806@gmail.com"
                        className="text-[#00d4ff] hover:underline transition-colors">
                        shalinims2806@gmail.com
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
