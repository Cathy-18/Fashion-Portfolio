# Catherine Nixon – Luxury Fashion Portfolio

A sophisticated, modern Single Page Application (SPA) showcasing the visionary fashion illustrations and couture collections of Catherine Nixon. This portfolio integrates an elegant, minimalist frontend with a powerful backend for seamless gallery management.

## 🌟 Key Features

*   **Elegant Frontend Interface:** Designed with contemporary luxury in mind, featuring custom typography, a sweeping bronze/copper gradient, and textured glassmorphic overlaps to emphasize the artwork.
*   **Dynamic Gallery Categorization:** Browse through curated series including **Traditional**, **Modern**, and **Themed** collections.
*   **Fully Protected Admin Dashboard:** Secure login for content management, preventing unauthorized access and gracefully handling session timeouts.
*   **Live Artwork Management:** Administrators can easily upload, draft, title, and categorize new pieces directly into live collections.
*   **Cloudinary Integration:** Full multimedia hosting leveraging Cloudinary for rapid image delivery, optimization, and seamless backend tracking tags.

---

## 🛠️ Technology Stack

*   **Frontend Ecosystem:** 
    *   [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (Lightning-fast HMR and optimized builds)
    *   [Tailwind CSS v4](https://tailwindcss.com/) (Rapid, utility-first styling)
    *   `react-router-dom` (Smooth client-side routing)
    *   `lucide-react` (Crisp, consistent iconography)
    *   `motion` (Fluid transition and layout animations)
*   **Backend & API:** 
    *   [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) (Robust routing and logic handling)
    *   `multer` & `multer-storage-cloudinary` (Secure multipart/form-data image streaming to the cloud)
*   **Infrastructure & Security:**
    *   `bcryptjs` (Cryptographic admin credential hashing)
    *   Environment variable isolation via `.env`

---

## 🚀 Getting Started

To run this portfolio locally on your machine, follow these steps:

### 1. Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18.x or higher)
*   Git

### 2. Environment Variables
To connect the application to your secure backend services, you will need an active `.env` file in the root directory. Create a file named `.env` and configure the following credentials:
```env
# Cloudinary Keys (For image hosting)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Configurations (For dashboard access)
ADMIN_EMAIL=admin@luxuryp.com
ADMIN_PASSWORD_HASH=your_bcrypt_hashed_password
```

### 3. Installation
Clone the repository and install the necessary dependencies:
```bash
# Clone the repository
git clone https://github.com/Cathy-18/Fashion-Portfolio.git

# Navigate into the project folder
cd luxury-fashion-portfolio

# Install node dependencies
npm install
```

### 4. Running the Development Server
Start both the Express backend and the Vite frontend concurrently via our custom dev script:
```bash
npm run dev
```
The application will spin up at `http://localhost:3000`. Hot Module Replacement (HMR) is active, meaning any design tweaks will instantly reflect in your browser!

### 5. Production Build
When deploying to a production environment (like Render, Heroku, or Vercel), bundle the assets:
```bash
npm run build
```
Then, serve the bundled static assets using:
```bash
npm start
```

---

## 📸 Usage & Management

**Admin Dashboard Workflow:**
1. Navigate to `/admin` and log in with your credentials.
2. Click **New Project** to upload a design.
3. The uploaded artwork will default to a **DRAFT** state in the *Recent Activity* table.
4. Update its Name, Description, and use the Collection dropdown to assign it to *Traditional*, *Modern*, or *Themed*.
5. The piece is immediately live—click *View on site* to see it rendered beautifully for the public!

---
> *© 2026 Catherine Nixon Portfolio. Designed & Engineered for Excellence.*
