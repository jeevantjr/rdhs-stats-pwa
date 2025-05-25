# 🏥 RDHS Statistics Dashboard (PWA)

A modern, responsive, and offline-capable **Progressive Web Application (PWA)** designed for the **Regional Director of Health Services (RDHS), Trincomalee**, to visualize, monitor, and manage vital public health statistics interactively and intuitively.

🌐 **Live Site**: [https://jeevantjr.github.io/rdhs-stats-pwa/](https://jeevantjr.github.io/rdhs-stats-pwa/)

---

## 🚀 Key Features

- **📱 Progressive Web App**  
  Installable on mobile and desktop devices with offline functionality using service workers and caching strategies.

- **📊 Real-Time Health Statistics**  
  Visual representation of health trends with dynamic graphs and clean tabular views, built using **Chart.js**.

- **🏥 Institutional Data & Clinic Schedules**  
  Displays outpatient schedules and clinic services at hospitals and PMCU facilities throughout the Trincomalee district.

- **📋 Interactive MOH & Hospital Cadre Data**  
  Access workforce distribution by cadre, institution, and MOH divisions with downloadable PDF summaries.

- **📅 Monthly Statistics**  
  Focused dashboards for **dengue cases**, **outdoor and indoor patients**, **bed occupancy**, and more.

- **🎓 Health Education**  
  Education materials such as "Feed Your Baby" and others to promote preventive health practices.

- **📂 Downloadable Resources**  
  Health service summaries, reports, and cadre PDFs readily available.

- **⚡ Fast, Lightweight & Intuitive UI**  
  Optimized for performance and ease-of-use across all devices with **Bootstrap** styling.

---

## 🧭 Navigation Overview

### 📌 Main Sections:
- **Dashboard Overview**  
  Health service statistics across divisions and districts.

- **CardDetails**  
  - MOH Cadre Details  
  - Hospital Cadre Details  
  - Summary Reports (PDF)

- **Statistics**  
  - Communicable Diseases  
  - Maternal Deaths  
  - Health Personnel  
  - Registered & Unprotected Births  
  - Hospital Stats: Beds, Inward/Outdoor Visits, Dengue

- **Institutions**  
  - Outpatient Schedules by Hospital  
  - Special Clinics

- **Health Education**  
  - Baby Feeding Education  
  - Additional modules in progress

- **MonthlyStatistics**  
  - Dengue Stats & Outbreak Monitoring

---

## 🛠️ Technology Stack

- **HTML4/5**, **CSS3**, **JavaScript (Vanilla JS)**
- **Chart.js** for rendering graphs
- **Bootstrap 4** for responsive layout
- **Progressive Web App (PWA)** capabilities with Service Worker & App Manifest
- **GitHub Pages** for fast and free hosting

---

## ⚙️ PWA Capabilities

- **Offline Support**  
  With a customized service worker and pre-cached routes for all major pages, users can navigate even with limited connectivity.

- **App Install Prompt**  
  Supports Add-to-Home-Screen functionality across Android, iOS, and desktops.

- **Automatic Caching**  
  Key assets and pages cached for instant access and fast load times.

---

## 📦 Developer Installation

To run the project locally for development:

```bash
git clone https://github.com/jeevantjr/rdhs-stats-pwa.git
cd rdhs-stats-pwa
# Open index.html in your preferred browser
```

To serve using a local server:

```bash
# Using Python
python -m http.server 8000

# Or use Node.js
npm install -g serve
serve .
```

---

## 👨‍💻 Developer

> Under the vision of **‘Transforming Public Health through Digital Innovation’**, this platform was developed and is actively maintained by:

**Dr. T. Jeevaraaj**  
MBBS, MCGP, MSc in Biomedical Informatics  
Medical Officer – Health Information  
Regional Director of Health Services, Trincomalee  
🔗 GitHub: [https://github.com/jeevantjr](https://github.com/jeevantjr)

---

## 📩 Feedback & Collaboration

We welcome feedback, suggestions, and collaborations to expand this tool’s reach and impact.  
Please reach out via GitHub Issues or through the RDHS Office, Trincomalee.

---

## 📃 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
