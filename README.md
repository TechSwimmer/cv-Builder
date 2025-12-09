# CV-BAKER: Full-Stack Resume Builder 🍞

> A modern, responsive, full-stack web application that enables users to **create, customize, save, edit, and download professional resumes** — all from the browser.

**🔗 Live Demo: https://resume-baker.netlify.app**    

**🔗 Source Code: (GitHub repo link here)**    


## ✨ Highlights

*   **Dual-Panel Interface:** Real-time preview updates as you type in the form.
*   **Multi-Layout Templates:** Choose from multiple CV designs and customize styles.
*   **Secure User Accounts:** JWT-based authentication allows users to save multiple CVs.
*   **Guest Access:** Try the app immediately without registering.
*   **PDF Export:** Download your finished CV as a high-quality PDF directly from the browser.

## 🚀 Getting Started

### Prerequisites

*   Node.js (version 22.11.0 or higher)
*   MongoDB (for local development)

### Installation & Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/TechSwimmer/cv-Builder.git
    cd cv-Builder
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    *   Create a `.env` file in the root directory.
    *   Add your environment variables (e.g., `JWT_SECRET`, `MONGODB_URI`).

4.  **Run the application**
    ```bash
    # Run both frontend and backend concurrently
    npm run dev
    ```
    *   Frontend will be served on `http://localhost:5173` (or another port).
    *   Backend API will be running on `http://localhost:3001`.

## 🛠️ Tech Stack

This project is built with the **MERN** stack and other key libraries:

| Category       | Technologies             |
| -------------- | ------------------------ |
| Frontend       | React, React Router, CSS |
| Backend        | Node.js, Express         |
| Database       | MongoDB + Mongoose       |
| Authentication | JWT + bcrypt             |
| PDF Generation | jsPDF, html2canvas       |
| Dev Tools      | Vite, Git                |


## 🏗️ Project Architecture

### Key Features & Implementation

| Feature                       | Description                              |
| ----------------------------- | ---------------------------------------- |
| 🧠 Dual-Panel Interface       | Real-time preview updates as users type  |
| 🧩 Multi-Template CV Layouts  | Choose from multiple clean templates     |
| 🎨 Style Customization Engine | Edit colors, fonts, section visibility   |
| 👤 JWT Secure Accounts        | Save & manage multiple CVs               |
| 👀 Guest Mode                 | Try the tool without signing up          |
| 📄 PDF Export                 | Download pixel-accurate resume instantly |
| 💾 Auto Save                  | (If implemented / optional)              |


### Core Engineering decisions

| Problem                          | Solution                                     |
| -------------------------------- | -------------------------------------------- |
| Preserve styling per-template    | Store customStyles in DB                     |
| Large PDF content rendering      | Used html2canvas + resolution scaling        |
| Multi-layout switching           | Dynamic component injection via cloneElement |
| Guest sessions without DB signup | Local state + no backend write               |



### Backend Overview

*   **RESTful API:** Designed with Express.js, featuring secure endpoints for user data and CV operations.
*   **Database Models:** Used Mongoose to structure user profiles, CV data, and styling preferences.
*   **Dual-Mode Auth:** Supports both persistent registered users and temporary guest sessions.

## 🧩 Repository Structure
```
cv-Builder/
├── client/               # React frontend application
│ ├── src/
│ ├── public/
│ └── vite.config.js
├── server/               # Node.js/Express backend API
│ ├── index.js
│ ├── models/ 
│ ├── routes/ 
│ └── middleware/         
├── package.json 
└── README.md
```

## 📖 Usage Guide

1.  **As a Guest:** 
    * Click "Enter as Guest" on the homepage to start building a CV immediately. You can download your CV as PDF but cannot save progress.
2.  **As a Registered User:**
    *   Register/Log in to your account.
    *   Access your dashboard to view and manage all created CVs.
    *   Use the "Create New CV" button to start a new resume.
    *   Fill out the form sections on the left, customize styles and layouts, and save your work.
    *   Download or continue editing your CVs anytime.

## 🚧 Future Enhancements

*   [ ] **Mobile-Responsive Design** (In Progress)
*   [ ] ATS (Applicant Tracking System) Optimization Scoring
*   [ ] Collaborative Editing and Sharing Features
*   [ ] Template Marketplace with User Submissions

---

## 👨‍💻 Author
**NIKHIL PILLAI**

*   Portfolio: https://techdevnikhil.netlify.app
*   LinkedIn: https://www.linkedin.com/in/techdevnikhil/
*   GitHub: https://github.com/TechSwimmer

## 📄 License

This project is licensed under the MIT license License - see the LICENSE file for details.
