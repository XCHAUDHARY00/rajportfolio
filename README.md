# 🌟 Raj Chaudhary — Full-Stack Portfolio & CMS

> **High-Performance Portfolio & Headless CMS Built with FastAPI + React + AWS**  
> Featuring an **Apple-Style Clean Professional Light Mode (Default)** and a luxury **Deep Black (`#08080A`) Dark Mode** switchable via a 1-click toggle in the navbar.

---

## 🎨 Dual Theme System (Apple Light + Luxury Dark)

### ☀️ Apple Light Mode (Default)
- **Canvas:** Ultra-clean `#F5F5F7` (Apple standard light gray) with zero patchiness
- **Cards & Surfaces:** Pure White `#FFFFFF` with crisp 1px borders (`rgba(0, 0, 0, 0.06)`) and subtle ambient shadows (`shadow-apple-card`)
- **Typography:** `#1D1D1F` (Apple primary dark) and `#6E6E73` (Apple secondary gray)
- **Accents:** Iconic Apple Blue (`#0071E3`) and Matte Black pill buttons
- **Aesthetic:** Clean, minimalist, human, professional — no AI-generated gradients or muddy tones

### 🌙 Luxury Dark Mode (Activated via Navbar Toggle)
- **Canvas:** Deep Pitch Black (`#08080A`) with subtle radial ambient glow
- **Cards & Surfaces:** Frosted Glass Charcoal (`#111218`) with glowing borders
- **Accents:** Champagne Gold (`#E5B869`), Electric Cyan (`#38BDF8`), and Emerald active status

---

## 🚀 Key Features

1. **Apple-Grade Light Mode & Dark Mode Switcher ☀️/🌙**:
   - Seamless 1-click Sun/Moon toggle in the header.
   - Preserves user preference in `localStorage`.
2. **Multi-Image Project Carousels & Lightbox 🖼️**:
   - Upload **multiple screenshots/photos** per project in the Admin Panel.
   - Interactive slider with Next/Prev controls, pagination dots, and image counter (`1 / 4`).
   - Click any screenshot to open a full-screen high-resolution lightbox modal.
   - Delete individual screenshots with one click in the Admin Panel.
3. **Changeable Profile Photo (DP) 📸**:
   - Upload your professional picture directly from the Admin Panel; framed with a luxury backlight ambient aura and AKGEC CGPA badge.
4. **Changeable Resume PDF 📄**:
   - Upload new resume PDFs anytime; instant 1-click download button in the Hero section.
5. **Changeable CGPA & Bio 🎓**:
   - Pre-seeded with CGPA **7.86** from your resume. Real-time stats cards and education badges.
6. **LinkedIn-Style Experience & Internships 💼**:
   - Add internship and job experiences with company name, roles, duration, location, currently-working toggle, bullet points, company logos, and uploadable internship/experience letters.
   - Click "View Experience Letter" to inspect letters in a dedicated modal!
7. **Certifications & Badges 🏆**:
   - Pre-seeded with JPMorgan Chase & Co. Job Simulation, Infosys Springboard, Hacknovate 7.0.
   - Upload badge images and link verification credentials.
8. **Contact Form with AWS SES 📬**:
   - Native AWS email delivery without needing EmailJS, SendGrid, or any external API keys.

---

## 💻 Quick Start (Run Locally)

Run both Backend and Frontend with a single command:

```bash
cd /Users/rajchaudhary/rajportfolio
./dev.sh
```

- **Portfolio Site:** [http://localhost:5173](http://localhost:5173)
- **Admin Portal:** [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
- **API Docs (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)
