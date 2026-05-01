# 🚀 APIvexa Backend -- Usage-Based API Billing Platform

## 📌 Introduction

APIvexa Backend is a scalable API gateway system that enables API key
authentication, usage tracking, and dynamic billing based on request
consumption.

------------------------------------------------------------------------

## 🎯 Features

-   JWT Authentication
-   API Key Generation
-   API Gateway Layer
-   Usage Tracking
-   Billing Engine

------------------------------------------------------------------------

## 🧱 Tech Stack

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT
-   Axios

------------------------------------------------------------------------

## ⚙️ How It Works

1.  User registers and logs in\
2.  User generates an API key\
3.  API requests go through the gateway\
4.  API key is validated\
5.  Requests are logged\
6.  Usage is tracked\
7.  Billing is calculated

------------------------------------------------------------------------

## 🔗 API Endpoints

### Auth

-   POST /api/auth/register
-   POST /api/auth/login

### API Keys

-   POST /api/keys/create

### Gateway

-   GET /api/gateway/pokemon/:name

### Usage

-   GET /api/usage

### Billing

-   GET /api/billing

------------------------------------------------------------------------

## 🧪 Example Flow

GET /api/gateway/pokemon/pikachu

Header: x-api-key: your_api_key

GET /api/usage

GET /api/billing

------------------------------------------------------------------------

## 🚀 Run Locally

npm install\
npm run dev

------------------------------------------------------------------------

## 🔐 Environment Variables

PORT=5000\
MONGO_URI=your_mongodb_connection\
JWT_SECRET=your_secret_key

------------------------------------------------------------------------

## 📁 Project Structure

backend/\
├── controllers/\
├── routes/\
├── middleware/\
├── models/\
├── config/\
├── server.js

------------------------------------------------------------------------

## 🧠 System Architecture

Flow:

1. User registers and logs in
2. JWT token is generated
3. User creates an API key
4. Client sends request with API key
5. Request goes through APIvexa Gateway
6. API key is validated
7. Request is processed
8. Usage is logged in database
9. Billing is calculated based on usage

------------------------------------------------------------------------

## 🌐 GitHub Repository

https://github.com/TheAkshatGupta/APIvexa-backend

------------------------------------------------------------------------

## 🧾 Conclusion

This project demonstrates a real-world SaaS backend system including API
gateway, usage tracking, and billing.
