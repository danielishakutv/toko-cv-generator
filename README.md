# CV Generator

A modern, frontend-only CV/Resume Generator built with React, TypeScript, Vite, TailwindCSS, and Zustand.

## Features

- 🎨 **9+ Professional Templates** - Choose from various layouts and styles
- 👁️ **Live Preview** - See your changes in real-time
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ♿ **Accessible** - Built with ARIA attributes and semantic HTML
- 💾 **Local Storage** - Save and manage multiple CVs
- 📤 **Export to PDF** - Download print-ready CVs
- 🔗 **Shareable Links** - Share your CV online (demo)
- 🎯 **ATS-Friendly** - All templates are optimized for applicant tracking systems

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** for fast development
- **TailwindCSS** for styling
- **Zustand** for state management
- **React Router v6** for routing
- **Radix UI** for accessible components
- **html-to-image** + **jsPDF** for PDF generation
- **Lucide React** for icons

## Getting Started

### Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Run Development Server

\`\`\`bash
npm run dev
\`\`\`

The app will be available at `http://localhost:5173`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── templates/      # CV template renderers
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/              # Page components
│   ├── Landing.tsx
│   ├── Templates.tsx
│   ├── Builder.tsx
│   ├── Result.tsx
│   ├── Profile.tsx
│   └── Dashboard.tsx
├── stores/             # Zustand state stores
│   ├── auth.ts
│   └── cv.ts
├── lib/                # Utility functions
│   ├── utils.ts
│   ├── pdf.ts
│   └── format.ts
├── data/               # Demo data
│   └── demoDocs.ts
├── App.tsx
├── main.tsx
└── index.css
\`\`\`

## Features Overview

### Pages

1. **Landing (/)** - Hero section with features, pricing, testimonials, and FAQ
2. **Templates (/templates)** - Filterable gallery of CV templates
3. **Builder (/builder/:templateId)** - Form with live preview to create/edit CVs
4. **Result (/result/:docId)** - Final CV with download, share, and save options
5. **Dashboard (/dashboard)** - Manage saved CVs (protected)
6. **Profile (/profile)** - User settings and preferences (protected)

### Key Features

- **Fake Authentication** - Demo login/signup system using Zustand
- **Guest Access** - Guests can create and download CVs
- **Save & Share** - Requires authentication (prompts signup)
- **Responsive Builder** - Form on left, live preview on right
- **Print-Ready** - Optimized CSS for A4 printing
- **Demo Data** - Pre-populated example CVs

## Authentication

This is a **frontend-only** demo app with simulated authentication:

- Any email/password combination will "sign you in"
- User data is stored in localStorage
- Guests can download CVs but need to sign up to save/share

## Notes

- All templates use placeholder thumbnails (would be replaced with actual screenshots in production)
- PDF generation uses html-to-image library for client-side rendering
- Share links are fake URLs for demo purposes
- No backend required - everything runs in the browser

## License

MIT

## Author

Built with ❤️ for job seekers worldwide
