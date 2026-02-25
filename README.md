# ResumeBaker: Full-Stack Resume Builder 🍞

> **Advanced full-stack resume builder with real-time preview, multiple layouts, AI-assisted resume import, and PDF export.**

**🔗 Live Demo: https://resume-baker.netlify.app**    

**🔗 Source Code: https://github.com/TechSwimmer/cv-Builder**    

*ResumeBaker is a modern, full-stack web application that allows users to create, customize, save, and export professional resumes with **pixel-accurate multi-page PDF output** — entirely in the browser.*

*Unlike most resume builders that rely on basic browser printing, ResumeBaker uses a **custom document rendering and pagination engine** to produce real A4-sized resumes with correct layout flow across pages.*

## ✨ Key Features

*   **AI resume import** *import from PDF (extract + normalize into form data)*
*   **Dual-Panel Interface:** *Edit your CV on the left and see a real-time preview on the right.*
*   **Multi-Layout Templates:** *Choose between multiple professional layouts with different visual and structural designs.*
*   **Custom PDF Rendering Engine** *CVs are rendered as real A4 pages with correct page breaks, column flow, and content locking.*
*   **Template-Safe Styling System** *Each layout supports its own colors, fonts, and section visibility.*
*   **Guest Mode** *Start creating a CV instantly without an account.*
*   **Secure User Accounts:** *JWT-based authentication allows users to save multiple CVs.*
*   **High quality PDF Export:** *Download your finished CV as a high-quality PDF directly from the browser.*


## 🏗️ Project Architecture

### Why This Project Is Different?

***Most resume builders stop at plain form-to-template rendering.***
***ResumeBaker adds:*** 

* *ResumeBaker adds:*
* *Calculates A4 page boundaries*
* *Layout-aware section rendering (education, experience, projects, skills, etc.)*
* *PDF export pipeline integrated into the builder flow*
* *AI-assisted resume import and normalization into the app’s form schema*
* *Keeps each logical entry intact across pages*


### Core Engineering Challenges Solved

| Problem                  |Solution                                      |
| -------------------------|----------------------------------------------|
| Structured CV editing    | Section-based form model + reusableblocks    |
| Layout switching         | Dynamic layout selection (3 templates)       |
| PDF output consistency   | Dedicated PDF layout components per template |
| AI resume ingestion      | PDF text extraction + JSON normalization     |
| Guest + user workflows   |  Guest path + JWT auth for save CVs          |
| User CV persistence      | MongoDB + JWT                                | 


### Backend Overview

*   **RESTful API:** *REST API with Express for auth, CV operations, and AI import.*
*   **Database Models:** *Mongoose models for users and CV data.*
*   **Auth:**  *JWT-based authentication for registered users.*
*   **Rate limiting/ AI usage:** *Middleware for auth checks, rate limiting, and AI usage controls.*


### PDF & Layout Engine

*ResumeBaker includes three layout variants:*

| Layout	  |          Engine                              |
|-------------|----------------------------------------------|
| Layout One  | Two-column with stronger left profile column |
| Layout Two  |	Two-column balanced content flow             |
| Layout Three|	Single-column block-first structure         |

**Each layout uses:**

* *Preview component(s) for in-app editing feedback*
* *PDF component(s) for downloadable output*
* *Style controls (font/theme-driven rendering)*


## 🛠️ Tech Stack

This project is built with the **MERN** stack and other key libraries:

| Category       | Technologies                           |
| -------------- | ---------------------------------------|
| Frontend       | React, React Router, CSS               |
| Backend        | Node.js, Express                       |
| Database       | MongoDB + Mongoose                     |
| Authentication | JWT + bcrypt                           |
| AI/Parsing     | OpenAI API, pdfjs-dist                 |
| PDF Generation | @react-pdf/renderer, jsPDF, html2canvas |
| Dev Tools      | Vite, Git                              |


## 🧩 Repository Structure
```
cv-maker/
├── src/                  # React frontend
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── api.js
│   └── App.jsx
├── server/               # Node + Express API
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
├── package.json
└── README.md
```


---


## 🚀 Getting Started

### Prerequisites

*   Node.js (version 22.11.0 or higher)
*   MongoDB (for local development)

### Installation & Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/TechSwimmer/cv-Builder.git
    cd cv-maker
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**

    *   Create `server/.env` file
    ```bash
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    OPENAI_API_KEY=your_openai_api_key
    AI_DEV_MODE=false
    AI_DEV_MODE_DELAY_MS=10000
    ```

    *   Create `src/.env` file
    ```bash
    VITE_API_URL=http://localhost:5000
    ```

4.  **Run the application**
    ```bash
    # In one terminal run the frontend
    cd src
    npm run dev
    ```
    *   Frontend will be served on `http://localhost:5173` (or another port).

     ```bash
    # In another terminal run the bacend
    cd server
    node index.js
    ```
    *   Backend API will be running on `http://localhost:3001`.


## 📖 Usage Guide

1.  **As a Guest:** 
    * Click "Enter as Guest" on the homepage to start building a CV immediately. You can download your CV as PDF but cannot save progress.
    * Use AI resume import with configured limits.
2.  **As a Registered User:**
    *   Register/Log in to your account.
    *   Access your dashboard to view and manage all created CVs.
    *   Use the "Create New CV" button to start a new resume.
    *   Fill out the form sections on the left, customize styles and layouts, and save your work.
    *   Download or continue editing your CVs anytime.
    *   Use AI resume import with configured limits



## 🚧 Future Enhancements

*   [ ] **Mobile-Responsive Design** (In Progress)
*   [ ] ATS (Applicant Tracking System) Optimization Scoring
*   [ ] Collaborative Editing and Sharing Features
*   [ ] Template Marketplace with User Submissions
*   [ ] Email verification for account authenticity


## 👨‍💻 Author

**NIKHIL PILLAI**
*   Portfolio: https://techdevnikhil.netlify.app
*   LinkedIn: https://www.linkedin.com/in/techdevnikhil/
*   GitHub: https://github.com/TechSwimmer

## 📄 License

This project is licensed under the MIT license License - see the LICENSE file for details.
