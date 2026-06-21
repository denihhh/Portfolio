# Danish Haikal's Portfolio

Welcome to the repository for my personal portfolio! This is a modern, responsive, and performance-optimized single-page application showcasing my skills, credentials, projects, and professional background.

**Live Portfolio:** [https://github.com/denihhh/Portfolio](https://github.com/denihhh/Portfolio)

---

## About Me
I am a final-year Computer Science undergraduate student at the **International Islamic University Malaysia (IIUM)** (graduating in 2026 with a **3.61 CGPA**), specializing in **Network Security**. I am passionate about engineering secure, scalable, and low-latency systems at the intersection of software development and cybersecurity.

- **Current Role:** Web Developer Intern at Mysoftcare Solution (March 2026 - September 2026)
- **Education:** Bachelor in Computer Science (Hons.) - IIUM
- **Credentials:** 
  - **CCNA** (Cisco Certified Network Associate) Certified
  - **ISTQB** Certified Tester Foundation Level (CTFL) Training

---

## Skills & Capabilities

### Systems & Backend
* **Languages & Frameworks:** Rust, Java, Python, Node.js, PHP, Laravel

### Network & Security
* **Core Skills:** Routing & Switching, Enterprise Security, Role-Based Access Control (RBAC), IDOR Mitigation, Wireshark packet analysis

### Frontend & Mobile
* **Languages & Frameworks:** TypeScript, React, Flutter, Dart, Tailwind CSS, Firebase

---

## Projects Showcased

### 1. **LightJoy** — Web-Based Cloud Gaming Architecture
* **Tech Stack:** Rust, TypeScript, Moonlight/Sunshine, WebRTC
* **Highlights:** 
  * Implemented strict Role-Based Access Control (RBAC) for secure and automated cloud session allocation.
  * Designed and built a custom, low-overhead interactive chat overlay.

### 2. **CollabQuest** — Group Project Monitoring Platform
* **Tech Stack:** Flutter, Dart, Firebase
* **Highlights:**
  * Engineered robust IDOR (Insecure Direct Object Reference) mitigation layers to protect user resources.
  * Implemented state-based soft deletes to preserve data integrity and historical logs.

### 3. **PointCare** — Smart Clinic Appointment Booking System
* **Tech Stack:** Laravel, Livewire, Tailwind CSS, PHP
* **Highlights:**
  * Developed real-time appointment scheduling to reduce patient wait times and optimize clinic workflows.
  * Built tailored role-based dashboards for patients, doctors, and clinic staff.

---

## Portfolio Tech Stack

The portfolio web application is designed with a focus on simplicity, responsiveness, and clean code:
- **Framework:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Email Delivery:** [@emailjs/browser](https://www.emailjs.com/) for reliable contact form submissions directly from the client.

---

## Local Development

Follow these steps to set up and run the portfolio locally:

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### ⚙️ Setup Instructions
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/denihhh/Portfolio.git
   cd Portfolio/my-portfolio
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root of the project with your EmailJS credentials (see `.env.example`):
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## Contact & Connect

Feel free to reach out to me for job opportunities, project collaboration, or technical discussions!

* **LinkedIn:** [Danish Haikal Mohammad](https://www.linkedin.com/in/danish-haikal-mohammad-06a4a1253/)
* **Email:** [haikaldanish0306@gmail.com](mailto:haikaldanish0306@gmail.com)
* **GitHub:** [@denihhh](https://github.com/denihhh)

