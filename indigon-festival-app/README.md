# Indigon AI Film Gauntlet Web App Prototype

Indeed mobile-first, luxurious, responsive, and completely functional single-page Web application prototype for the **Indigon AI Film Gauntlet** (presented by **Vollywood®**). 

This project matches the structural integrity of the companion **Android/Jetpack Compose Kotlin Application**, providing an elegant alternative layout designed to easily host on subdomains like `indigon.vollywood.org`.

---

## 🚀 1. How to Run Locally

You can spin up this web application locally in under 60 seconds.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Installation
1. Move into the project directory:
   ```bash
   cd indigon-festival-app
   ```
2. Install all development dependencies configured in `package.json`:
   ```bash
   npm install
   ```
3. Start the high-performance Vite local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local hosting url (typically `http://localhost:3000`).

---

## 📁 2. Created File Directory Structure

The structure has been designed following simple, highly modular layouts:

```text
indigon-festival-app/
├── package.json           # Vite, React, Lucide, and Tailwind CSS directives
├── vite.config.js         # Port configurations & react plugin adapters
├── postcss.config.js      # PostCSS parser setting
├── tailwind.config.js     # Tailored Indigo/Volt color design tokens
├── index.html             # Viewport initialization and template anchor page
├── README.md              # Documentation manual
└── src/
    ├── index.css          # Tailwind base/component layout styles
    ├── main.jsx           # Mounting react code to root element
    ├── App.jsx            # Dynamic single-page navigation layout with forms and views
    └── services/
        └── api.js         # Reactive Data Local Engine with API Connection Blueprints
```

---

## 🗄️ 3. Registration Status & Local Storage State

- **Current State Strategy:** This application is **100% Client-Side Persistent**. All successfully submitted forms (for registrations and sponsor inquiries) are written to and retrieved from browser-level **`localStorage`**. 
- **Persistence:** This ensures that refreshing the web tab, navigating between sub-pages, or testing registrations will **never** lose your entries.
- **Pre-Seeded Data:** On first runtime, the local engine seeds mock records so that testing the **Admin Dashboard** is high-fidelity and expressive immediately.

---

## 🔐 4. Authorized Admin Access Panel

An administrative viewing console has been implemented right inside the application topbar (represented by the **Lock icon**). 
- **Default Password:** `admin` or `vollywood2026`.
- **Features:** Allows checking real-time tables of registrations, tracking participant requirements (such as brought device, preferred AI categories, contact details), viewing custom sponsor tickets, and emptying session caches during iteration.

---

## 🔌 5. Production Connection Blueprints (Future Backends)

The API service file `/src/services/api.js` has been explicitly designed with production-ready code comments acting as clear placeholders for standard integrations:

### A. Migrating to Google Sheets (Free/Low Cost)
You can append registrations instantly to a spreadsheet using a simple **Google Apps Script** endpoint:
1. Open a Google Sheet and click **Extensions > Apps Script**.
2. Paste a basic append Row doPost script.
3. Deploy it as a **Web App** (accessible to "Anyone").
4. Uncomment the App Script block inside `api.js` and paste your secure Script URL.

### B. Migrating to Firebase (Pro Database solution)
To synchronize inputs directly with **Cloud Firestore**:
1. Configure a Firebase project.
2. Initialize Firebase Web SDK inside `api.js`.
3. Swap `localStorage` calls with standard Firestore collection adding hooks (`addDoc`, `collection`).

---

## 🤝 6. Safe Git Branches Note (AI Studio Environment)
As git terminal commands are strictly restricted inside our container build boundaries due to secure sandboxing, terminal execution of git branches cannot be run directly via code hooks. 
However, **exporting this repository as a ZIP** or **using the Push to GitHub button** from the top controls inside AI Studio allows you to easily push this entire `indigon-festival-app` workspace directly to your `Holobyte/binaryleaf` branch `feature/indigon-festival-app` safely.
