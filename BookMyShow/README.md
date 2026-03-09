# BookMyShow - Online Movie Ticket Booking System

A full-stack MERN application for online movie ticket booking with role-based access control, Stripe payments, and email notifications.

## Live Demo
https://bookmyshow-vkbd.onrender.com/

## Features
- **User**: Browse movies, search, select shows, choose seats, pay via Stripe, view booking history
- **Partner**: Manage theatres and shows for approved theatres
- **Admin**: Manage movies, approve/block theatres
- **Security**: Bcrypt password hashing, JWT auth, rate limiting, helmet headers, NoSQL injection prevention
- **Password Reset**: OTP via email with 10-minute expiry

## Tech Stack
- **Frontend**: React 18, Redux Toolkit, Ant Design, React Router, Axios
- **Backend**: Node.js, Express, Mongoose, JWT, Stripe, Nodemailer
- **Database**: MongoDB Atlas
- **Deployment**: Render

## Quick Start

```bash
# Server
cd server && npm install
# Create .env (see PROJECT_REPORT.md for required variables)
npm run dev

# Client (new terminal)
cd client && npm install
# Create .env with REACT_APP_STRIPE_KEY
npm start
```

## Project Report
See [PROJECT_REPORT.md](./PROJECT_REPORT.md) for the full project report.
