# Indigon AI Film Gauntlet - Official Launch Version

Welcome to the official launch version of the **Indigon AI Film Gauntlet** Web Application, presented by **Vollywood®**. This mobile-first, luxurious, and highly responsive single-page portal is optimized for immediate attendee recruitment and secure partner capture.

---

## 🚀 1. How to Run Locally

You can spin up the application locally in under 60 seconds.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation
1. Move into the project directory:
   ```bash
   cd indigon-festival-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite high-performance development server:
   ```bash
   npm run dev
   ```
4. Open your browser to the local URL (typically `http://localhost:3000`).

---

## 📁 2. File Directory Structure

```text
indigon-festival-app/
├── package.json           # Vite, React 18, Lucide React, and Tailwind CSS configuration
├── vite.config.js         # Port and React compilation adapters
├── postcss.config.js      # PostCSS parser configuration
├── tailwind.config.js     # Tailored Indigo/Volt cinematic color tokens
├── index.html             # Main index template anchor page
├── .env.example           # Environment variables blueprints
├── .env                  # Live development configuration values
├── README.md              # Technical and launch documentation
└── src/
    ├── index.css          # Tailwind base elements & component overrides
    ├── main.jsx           # React bootstrapping entrypoint
    ├── App.jsx            # Single-Page App with native history-state route router
    └── services/
        └── api.js         # Submissions dispatcher & Mailchimp payload adapters
```

---

## 🗺️ 3. Configured Path Routes

This app leverages a high-fidelity native locationpathname reader. Direct entry, refresh, and popstate navigation are supported natively:

- **Home (`/`)**: Main brand value deck, logistical status indicators, and CTA actions.
- **Event Registration (`/register`)**: Captures free seating applications for the AI Media Training.
- **Sponsor Inquiry (`/sponsors`)**: Highlights partner tiers, presenting catalogs, and hosts the sponsor lead form.
- **VTC Pathway (`/vtc-path`)**: Summarizes digital-to-generative certification stages.
- **Privacy Notice (`/privacy`)**: Renders the complete, transparent data-usage terms block.
- **Secure Admin Portal (`/admin`)**: Restricted staffing operations console.

---

## 🔐 4. Secure Admin Gate & Password Guard

The admin portal is strictly excluded from public indicators, headers, footers, or mobile layouts.

### Authentication Pathways
To unlock database dashboards, staff must authenticate via:
1. **Password Key:** Matches the environment variable `VITE_ADMIN_PASSWORD` (defaults to `vollywood2026`).
2. **Authorized Guest Email:** Instant authentication loop for approved administrator `tonyholobyte@gmail.com`.

### Multi-Tab Database Reporting
Once unlocked, the panel lists actionable metrics:
- Attendance breakdown counts.
- Segmented charts for Preferred AI Categories, Experience Levels, and Devices.
- Filterable tables highlighting private Registrant details and Sponsor intent letters.

---

## 🔌 5. Mailchimp Integration Setup & Envs

This system contains pre-wired, dry-tested production adapters in `src/services/api.js`. It decouples browser processing from raw keys as a security requirement.

### A. Environment Variables Required (.env)
Define these secure keys in your serverless/hosting platform dashboard (Netlify, Vercel, or Firebase Functions env variables):

```env
# Staff Password Gateway (Client-accessible)
VITE_ADMIN_PASSWORD=vollywood2026

# Private Mailchimp API Secrets (Never checked into source files)
MAILCHIMP_API_KEY=your_private_api_key_here
MAILCHIMP_SERVER_PREFIX=us21
MAILCHIMP_AUDIENCE_ID=your_audience_list_id_here
```

### B. Segment Tags Triggered
Form structures append tags to trigger Mailchimp email automation:
- **Event Signup Form** tags contacts as `Indigon Event Signup`.
- **Sponsor Lead Form** tags contacts as `Indigon Sponsor Lead`.

---

## 🤝 6. Launch Git Branches Guideline

Because terminal code branches inside sandboxed containers cannot execute terminal Git commands directly:
1. Export this sandbox as a **ZIP** archive from the top dashboard, or click the **Push to GitHub** platform option.
2. Initialize or push the code directly to your branch:

```bash
git checkout -b feature/official-indigon-launch
git add indigon-festival-app/
git commit -m "feat: upgrade indigon app to official launch version v1.0"
git push origin feature/official-indigon-launch
```

> **Note:** Maintain the isolated directory scope inside the folder to avoid affecting other project directories or root settings.
