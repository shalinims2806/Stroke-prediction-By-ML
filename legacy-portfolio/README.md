# Shalini M — AI-Themed Developer Portfolio

> Futuristic AI-themed interactive portfolio built with Next.js 15, Three.js, and Framer Motion.

**Live:** [shalinims2806.github.io](https://shalinims2806.github.io) &nbsp;|&nbsp;
**LinkedIn:** [linkedin.com/in/shalinim1228](https://linkedin.com/in/shalinim1228) &nbsp;|&nbsp;
**GitHub:** [github.com/shalinim1228](https://github.com/shalinim1228)

---

## Features

- **3D Animated Hero** — rotating torus knot, icosahedron, and spheres via raw Three.js
- **Particle Neural Network** — animated canvas background with connecting lines
- **Glassmorphism UI** — premium frosted-glass cards throughout
- **Smooth Scroll Animations** — Framer Motion scroll-triggered reveals on every section
- **Experience Timeline** — animated vertical timeline with 3 roles
- **Skills Showcase** — tabbed categories with floating tech badge cards
- **Project Cards** — 3D mouse-tilt effect on hover with filter system
- **Enterprise Projects** — SVG world map with animated location markers
- **Contact Form CRM** — submissions stored in Google Sheets + Resend email notifications
- **Mobile-first Responsive** — fully responsive across all screen sizes
- **SEO Optimized** — metadata, OpenGraph, Twitter cards

---

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| 3D | Three.js (raw imperative API) |
| Icons | Lucide React |
| Email | Resend |
| Lead Storage | Google Sheets via Apps Script |
| Deployment | Vercel |

---

## Portfolio Sections

1. **Hero** — 3D floating geometry, typing animation, CTA buttons
2. **About** — Profile summary, animated stats counters
3. **Skills** — Programming, Databases, Zoho & AI, Tools, Soft Skills
4. **Experience** — TekyDoct, Tap Academy, Race2Cloud timelines
5. **Projects** — ML, Full Stack, Zoho app showcase
6. **Enterprise** — International client projects with world map
7. **Certifications** — Java Full Stack, Zoho CRM, NPTEL, Python
8. **Education** — MCA and B.Sc Mathematics
9. **Contact** — Live form with Google Sheets CRM and email

---

## Local Setup

### Prerequisites
- Node.js 18.17+
- npm

### Installation

```bash
git clone https://github.com/shalinims2806/Portfolio.git
cd Portfolio
npm install
```

### Environment Variables

```bash
copy .env.local.example .env.local
```

Fill in `.env.local`:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
RESEND_API_KEY=re_YOUR_KEY
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=your@email.com
```

See [CONTACT_SETUP.md](CONTACT_SETUP.md) for full Google Sheets + email setup.

### Run

```bash
npm run dev        # Development
npm run build      # Production build
npm run start      # Run production build
```

---

## Deployment on Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import this repo
3. Add environment variables in **Settings → Environment Variables**
4. Click **Deploy**

Every push to `main` auto-deploys.

---

## Contact

**Shalini M** — Zoho Developer & Full Stack Engineer

- Email: [shalinims2806@gmail.com](mailto:shalinims2806@gmail.com)
- LinkedIn: [linkedin.com/in/shalinim1228](https://linkedin.com/in/shalinim1228)
- GitHub: [github.com/shalinim1228](https://github.com/shalinim1228)

---

*Built with Next.js 15, Three.js, Framer Motion, and a futuristic vision.*
