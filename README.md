# 🚀 APIvexa – Usage-Based API Billing Platform

## 📌 Overview

APIvexa is a full-stack SaaS platform that simulates real-world API providers like Stripe or RapidAPI.
It includes API key authentication, dynamic gateway routing, usage tracking, and billing.

---

## ✨ Features

* 🔐 JWT Authentication (Login/Register)
* 🔑 API Key Generation & Revoke
* 🌐 Dynamic API Gateway
* 📊 Usage Tracking System
* 💰 Billing Engine (Free + Paid Tier)
* ⚡ Fallback System (Gateway never fails)
* 🖥️ Dashboard UI (React + Tailwind)

---

## 🧱 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT
* Axios

### Frontend

* React.js
* Tailwind CSS
* Vite

---

## 🧠 How It Works

1. User logs in and receives JWT token
2. User creates an API key
3. Requests go through API Gateway
4. API key is validated
5. Requests are logged in database
6. Usage is tracked
7. Billing is calculated

---

## 🌐 API Flow (Example)

```
POST /api/auth/login → Get Token  
POST /api/keys/create → Create API Key  
GET /api/gateway/:apiId/pokemon/pikachu  
GET /api/usage → Total Requests  
GET /api/billing → Billing Cost  
```

---

## 📊 Billing Logic

* First **5 requests FREE**
* After that:

```
₹0.01 per request
```

---

## 🖥️ Dashboard Preview

👉 Features shown in UI:

* Total Requests
* Billing Summary
* API Keys Management
* Create & Revoke Keys

---

## 📁 Project Structure

```
APIvexa/
 ├── backend/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── middleware/
 │   └── server.js
 │
 └── frontend/
     ├── src/
     ├── pages/
     └── App.jsx
```

---

## ⚙️ Setup Instructions

### 1. Clone Repo

```
git clone https://github.com/TheAkshatGupta/APIvexa.git
```

---

### 2. Backend Setup

```
cd backend
npm install
```

Create `.env`:

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
```

Run:

```
npm run dev
```

---

### 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🎯 Key Highlights

✔ Dynamic API Gateway
✔ Real-time Usage Tracking
✔ Billing Calculation
✔ Production-like SaaS System

---

## 🧾 Conclusion

APIvexa demonstrates a real-world architecture of an API billing platform including gateway, metering, and pricing engine.

---

## 👨‍💻 Author

Akshat Gupta
