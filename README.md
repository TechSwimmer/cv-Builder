# CV-BAKER: Full-Stack Resume Builder 🍞

> A responsive and interactive full-stack application that allows users to create, customize, and download professional CVs with ease.

**Live Demo:** https://resume-baker.netlify.app | **Source Code:** [GitHub Repository](https://github.com/TechSwimmer/cv-Builder)



## ✨ Highlights

*   **Dual-Panel Interface:** Real-time preview updates as you type in the form.
*   **Multi-Layout Templates:** Choose from multiple CV designs and customize styles.
*   **Secure User Accounts:** JWT-based authentication allows users to save multiple CVs.
*   **Guest Access:** Try the app immediately without registering.
*   **PDF Export:** Download your finished CV as a high-quality PDF directly from the browser.

## 🚀 Getting Started

### Prerequisites

*   Node.js (version X.Y.Z or higher)
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

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React, React Router DOM, CSS3, HTML5 |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose ODM |
| **Authentication** | JWT, bcrypt |
| **PDF Generation** | jsPDF, html2canvas |
| **Development & Build** | Vite, Git |

## 🏗️ Project Architecture

### Key Features & Implementation

*   **Real-Time Preview Sync:** Utilized React state management (useState, useEffect, useRef) to synchronize form inputs with the live preview panel instantly.
*   **Dynamic Styling Engine:** Developed a system that persists user style preferences (colors, fonts) in the database and applies them across different CV templates.
*   **Client-Side PDF Generation:** Implemented a reliable export feature using jsPDF and html2canvas, ensuring visual fidelity between the screen preview and the final PDF.

### Backend Overview

*   **RESTful API:** Designed with Express.js, featuring secure endpoints for user data and CV operations.
*   **Database Models:** Used Mongoose to structure user profiles, CV data, and styling preferences.
*   **Dual-Mode Auth:** Supports both persistent registered users and temporary guest sessions.

## 🧩 Repository Structure
cv-Builder/
├── client/ # React frontend application
│ ├── src/
│ ├── public/
│ └── vite.config.js
├── server/ # Node.js/Express backend API
│ ├── index.js
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ └── middleware/ # Auth middleware
├── package.json
└── README.md

text

## 📖 Usage Guide

1.  **As a Guest:** Click "Enter as Guest" on the homepage to start building a CV immediately. You can download your CV as PDF but cannot save progress.
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
NIKHIL PILLAI
**Your Name**
*   Portfolio: techdevnikhil.netlify.app
*   LinkedIn: [your-linkedin-profile]
*   GitHub: https://github.com/TechSwimmer

## 📄 License

This project is licensed under the [Your Chosen License] License - see the LICENSE file for details.
