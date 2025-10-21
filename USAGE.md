# CV Generator - Usage Guide

## 🚀 Quick Start

The application is now running at **http://localhost:5173**

## 📋 Application Flow

### 1. Landing Page (/)
- **Hero Section**: "Start Here" button prominently displayed
- **Features**: Live preview, templates, export, share, version history
- **Pricing**: Three tiers (Free, Pro, Team)
- **Testimonials**: User reviews
- **FAQ**: Common questions answered

### 2. Templates Gallery (/templates)
- **Browse**: 9 professional templates
- **Filter**: By layout type (single column, two column, sidebar)
- **Search**: Find templates by name
- Click any template to start building your CV

### 3. Builder (/builder/:templateId)
- **Left Panel**: Form to enter your information
  - Personal info (name, email, phone, etc.)
  - Professional summary
  - Experience (add multiple with bullets)
  - Education
  - Skills (with proficiency levels)
  - Additional sections based on template
- **Right Panel**: Live preview of your CV
- **Top Bar**: Back button and Continue button
- Changes update in real-time!

### 4. Result (/result/:docId)
- **Preview**: Final CV in print-ready format
- **Actions**:
  - **Download PDF**: Available to everyone (guests see signup prompt but can still download)
  - **Share**: Requires login (shows auth dialog for guests)
  - **Save**: Requires login (shows auth dialog for guests)
- **Quick Actions**: Edit, Duplicate, Change Template

### 5. Dashboard (/dashboard) - Protected
- **Stats Cards**: Total CVs, Saved, Shared counts
- **Recent CVs**: List of your saved CVs with actions
- **Featured Templates**: Quick access to popular templates
- **Tips**: Helpful CV writing tips

### 6. Profile (/profile) - Protected
- **Profile Info**: Edit name, email, avatar
- **Preferences**: Theme, email notifications
- **Account Actions**: Export data, delete account (demo)

## 🔐 Authentication (Demo)

### Sign Up / Sign In
- Click "Sign In" button in header
- Enter any email and password
- Account is created automatically
- Data stored in browser's localStorage

### Guest vs Authenticated Users

**Guests Can:**
- Browse templates
- Create CVs
- Download PDFs (with signup encouragement)

**Guests Cannot:**
- Save CVs to account
- Share CVs online
- Access Dashboard
- Access Profile settings

**Authenticated Users Get:**
- Save unlimited CVs
- Share CVs with links
- Access to Dashboard
- Version history
- Profile management

## 🎨 Templates

### Available Templates (9)
1. **Classic** - Traditional single-column layout
2. **Modern Two-Column** - Professional with sidebar for skills
3. **Elegant Sidebar** - Left sidebar with colored background
4. **Minimal** - Clean and simple
5. **Creative** - Right sidebar layout
6. **Professional** - Formal two-column design
7. **Tech Focus** - Optimized for technical roles
8. **Executive** - For senior positions
9. **Academic** - Ideal for research and education

Each template supports different section combinations:
- Summary
- Experience
- Education
- Skills
- Projects
- Certifications
- Achievements
- Languages
- Interests

## 🛠️ Key Features

### Live Preview
- See changes instantly as you type
- Responsive to mobile and desktop
- Accurate representation of final PDF

### Form Builder
- Intuitive form interface
- Add/remove entries dynamically
- Date pickers for experience/education
- Bullet points for achievements
- Skill level indicators

### PDF Export
- High-quality PDF generation
- A4 page size optimized
- Print-ready formatting
- Maintains colors and styling

### State Management
- All data persisted in localStorage
- No data loss on refresh
- Multiple CVs can be saved
- Quick switching between CVs

## 🎯 Testing the Application

### As a Guest:
1. Go to http://localhost:5173
2. Click "Start Here" from hero or header
3. Select a template
4. Fill in your information
5. Watch the live preview update
6. Click "Continue" to see final result
7. Download PDF (you'll see a signup prompt but can still download)
8. Try to Share or Save (you'll be asked to sign up)

### As an Authenticated User:
1. Click "Sign In" in header
2. Enter any email/password (e.g., `test@example.com` / `password123`)
3. Create a CV following steps above
4. Click "Save" on result page
5. Go to Dashboard to see your saved CV
6. Click "Share" to get a shareable link
7. Edit your profile in Profile page
8. Create multiple CVs and manage them

## 📱 Responsive Design

The application is fully responsive:
- **Mobile**: Single column, toggle between form and preview
- **Tablet**: Optimized layouts
- **Desktop**: Side-by-side form and preview

## ♿ Accessibility

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly

## 🖨️ Printing

The CV preview is print-ready:
- Use browser's print function (Ctrl/Cmd + P)
- Or download as PDF
- A4 size optimized
- Print styles hide UI chrome

## 📦 Tech Stack Highlights

- **React 18** with hooks
- **TypeScript** for type safety
- **Vite** for fast development
- **TailwindCSS** for styling
- **Zustand** for simple state management
- **React Router v6** for routing
- **Radix UI** for accessible components
- **html-to-image + jsPDF** for PDF generation

## 🐛 Known Limitations (Demo)

- Authentication is fake (any credentials work)
- No real backend/database
- Share links are fake URLs
- Template thumbnails are placeholders
- No actual email notifications
- Delete account is disabled

## 💡 Tips

1. **Fill all required fields** (marked with *) for best results
2. **Use bullet points** to highlight achievements
3. **Keep it concise** - 1-2 pages is ideal
4. **Proofread** before downloading
5. **Try different templates** to find your style
6. **Save your work** by creating an account

## 🎉 Enjoy!

Your CV Generator is ready to use. Create beautiful, professional CVs in minutes!

If you encounter any issues, check the browser console for errors or restart the development server.
