# CareSync

CareSync is a full-stack healthcare web application that enables users to browse doctors, book appointments, and manage their healthcare interactions efficiently.

This project demonstrates a complete MERN-style architecture with authentication, REST APIs, and a responsive frontend.

---

## Features

* User authentication (Register / Login)
* Browse available doctors
* Book appointments with doctors
* View user-specific appointments
* Cancel appointments
* Full-stack integration (frontend + backend)

---

## Tech Stack

### Frontend

* React.js
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

---

## Project Structure

CareSync/
│── backend/        # Node.js + Express backend (API, DB, routes)
│── caresync/       # React frontend (main UI)
│── src/            # Additional frontend files (root-level React)
│── public/         # Static assets
│── package.json
│── README.md
│── .gitignore

Note: The project currently contains frontend code in both the root and the `caresync/` folder.

---

## Installation and Setup

### 1. Clone the repository

git clone https://github.com/1rohanrsinha-hue/CareSync.git

cd CareSync

---

### 2. Install dependencies

#### Backend

cd backend
npm install

#### Frontend (caresync)

cd ../caresync
npm install

---

### 3. Run the application

#### Start Backend

cd backend
npm start

#### Start Frontend

cd ../caresync
npm start

---

## Future Improvements

* Payment gateway integration
* Doctor availability scheduling system
* Notifications and reminders
* Improved UI/UX
* Deployment (AWS / Vercel / Render)

---

## Author

Rohan Sinha

---
