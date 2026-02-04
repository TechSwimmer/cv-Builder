# ResumeBaker: Full-Stack Resume Builder 🍞

> **Advanced Full-Stack Resume Builder with Custom PDF Rendering Engine**

**🔗 Live Demo: https://resume-baker.netlify.app**    

**🔗 Source Code: (GitHub repo link here)**    

*CV-BAKER is a modern, full-stack web application that allows users to create, customize, save, and export professional resumes with **pixel-accurate multi-page PDF output** — entirely in the browser.*

*Unlike most resume builders that rely on basic browser printing, CV-BAKER uses a **custom document rendering and pagination engine** to produce real A4-sized resumes with correct layout flow across pages.*

## ✨ Key Features

*   **Dual-Panel Interface:** *Edit your CV on the left and see a real-time preview on the right.*
*   **Multi-Layout Templates:** *Choose between multiple professional layouts with different visual and structural designs.*
*   **Custom PDF Rendering Engine** *CVs are rendered as real A4 pages with correct page breaks, column flow, and content locking.*
*   **Template-Safe Styling System** *Each layout supports its own colors, fonts, and section visibility.*
*   **Guest Mode** *Start creating a CV instantly without an account.*
*   **Secure User Accounts:** *JWT-based authentication allows users to save multiple CVs.*
*   **High quality PDF Export:** *Download your finished CV as a high-quality PDF directly from the browser.*


## 🏗️ Project Architecture

### Why This Project Is Different?
***Most resume builders simply rely on:***
> window.print() or basic HTML → PDF conversion
 
***Resume-Baker does not.*** 

**This project includes a custom front-end document layout engine that:**
* *Measures content height using off-screen DOM cloning*
* *Calculates A4 page boundaries*
* *Splits content into pages dynamically*
* *Handles two-column and single-column layouts*
* *Preserves headers and fixed blocks*
* *Keeps each logical entry intact across pages*

**In other words — this is real document layout logic, not just styling.**


### Core Engineering Challenges Solved

| Problem                          | Solution                                     |
| -------------------------------- | -------------------------------------------- |
| Multi-page resume overflow       | Custom pagination engine                     |
| Two-column layout flow           | Independent column height tracking           |
| Template switching               | Dynamic layout injection                     |
| PDF accuracy                     | DOM cloning + scaling + slicing              |
| Guest mode                       | Client-side state only                       |
| User CV persistence              | MongoDB + JWT                                | 


### Backend Overview

*   **RESTful API:** Designed with Express.js, featuring secure endpoints for user data and CV operations.
*   **Database Models:** Used Mongoose to structure user profiles, CV data, and styling preferences.
*   **Dual-Mode Auth:** Supports both persistent registered users and temporary guest sessions.


### Advanced PDF & Layout Engine

*CV-BAKER supports three different layout engines, each with its own pagination logic:*

| Layout	  |          Engine                     |
|-------------|-------------------------------------|
| Layout One  | Dual-column with fixed left sidebar |
| Layout Two  |	Dual-column flowing sections        |
| Layout Three|	Single-column block-based pagination|

**Each layout uses:**

* *DOM cloning*
* *Real height measurement*
* *Off-screen render containers*
* *Page-sized slicing*
* *Column-aware flow logic*

**This ensures:**

* *Projects don’t split in half*
* *Skills don’t disappear*
* *Headers don’t repeat incorrectly*
* *Multi-page resumes render correctly*


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


## 🧩 Repository Structure
```
cv-Builder/
├── client/               # React frontend
│   ├── src/
│   ├── components/
│   ├── layouts/          # CV layout engines
│   ├── pdf/              # Pagination + PDF logic
│   └── styles/
│
├── server/               # Node + Express API
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
│
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

## 👨‍💻 Author
**NIKHIL PILLAI**

*   Portfolio: https://techdevnikhil.netlify.app
*   LinkedIn: https://www.linkedin.com/in/techdevnikhil/
*   GitHub: https://github.com/TechSwimmer

## 📄 License

This project is licensed under the MIT license License - see the LICENSE file for details.
