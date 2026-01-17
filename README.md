# 📊 Lead Management Dashboard (CRM)

A full-stack **Lead Management Dashboard** built as part of a fresher hiring take-home assignment.
This project demonstrates backend API design, MongoDB integration, server-side data handling, and a responsive frontend UI.


## 🚀 Features

### 🔐 Authentication

* Simple login screen (mock authentication as allowed in the assignment)
* Redirects to dashboard on successful login

### 📋 Lead Management

* View leads in a paginated table
* Server-side search (name / email)
* Filter leads by status and source
* Sorting support
* Individual lead detail view

### 📊 Analytics

* Total leads count
* Converted leads count
* New leads count

### 📱 Responsive UI

* Fully responsive layout
* Mobile-friendly views using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB Atlas (Free Tier)
* Mongoose

---

## 📁 Project Structure

```
CRM/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   │   └── seedLeads.js
│   │   ├── app.js
│   │   └── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── index.html
```

---

## ⚙️ Setup Instructions (Local)

### 1️⃣ Clone the repository

```bash
git clone - https://github.com/Jonapra/CRM.git
cd CRM
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

#### 🔐 Environment Variables

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=mongodb+srv://AnkitPradhan:crmDb23@crm.rfe17kn.mongodb.net/leadsdb
PORT=5000
```

Start the backend server:

```bash
npm start
```

### 3️⃣ Seed Dummy Data (IMPORTANT)

This project includes a seeding script that inserts **500 dummy leads** into MongoDB using Faker.

```bash
node src/utils/seedLeads.js
```

⚠️ Run this **only once** to avoid duplicate records.

---

### 4️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🌐 API Endpoints

### Get all leads (search, filter, sort, pagination)

```
GET /api/leads
```

**Query Parameters:**

* `search` – search by name or email
* `status` – filter by lead status
* `source` – filter by lead source
* `page` – page number
* `limit` – records per page
* `sortBy` – field to sort by
* `sortOrder` – `asc` or `desc`

---
### Get single lead
```
GET /api/leads/:id
```
---

## 🔑 Demo Credentials

Authentication is mocked as permitted in the assignment.

Email: demo@crm.com
Password: demo123

(Any valid input will allow login)

---

## 🚀 Deployed URLs

* **Frontend:** ⬅️ REPLACE WITH YOUR VERCEL / NETLIFY LINK
* **Backend:** ⬅️ REPLACE WITH YOUR RENDER / RAILWAY LINK

---

## 📌 Assignment Requirements Coverage

✔ MongoDB Atlas with environment variables
✔ Backend APIs with search, filter, sort, pagination
✔ 500 dummy leads seeded
✔ Login screen (basic auth)
✔ Leads table with pagination
✔ Lead details view
✔ 3+ analytics metrics
✔ Mobile-responsive frontend
✔ Deployed using free hosting providers

---

## 👤 Author
Ankit Pradhan
Frontend / Web Developer


