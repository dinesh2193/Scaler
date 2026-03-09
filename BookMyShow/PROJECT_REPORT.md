# BookMyShow - Project Report

## Scaler Neovarsity / Academy - Fullstack Specialization Capstone Project

---

## 1. Project Overview

### 1.1 Project Title
BookMyShow - Online Movie Ticket Booking System

### 1.2 Project Description
BookMyShow is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js) that replicates the core functionality of an online movie ticket booking platform. The application supports three user roles — Admin, Partner, and User — each with distinct capabilities. Users can browse movies, select shows, choose seats, and make payments. Partners can manage theatres and shows. Admins oversee the platform by managing movies and approving theatres.

### 1.3 Deployed URL
https://bookmyshow-vkbd.onrender.com/

### 1.4 GitHub Repository
https://github.com/dinesh2193/Scaler

---

## 2. Technology Stack

### 2.1 Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI library for building component-based interfaces |
| Redux Toolkit | Global state management (user session, loading states) |
| React Router DOM v7 | Client-side routing and navigation |
| Ant Design v5 | UI component library (Tables, Forms, Modals, Menus) |
| Axios | HTTP client for API communication |
| Moment.js | Date formatting and manipulation |
| react-stripe-checkout | Stripe payment integration on the client |

### 2.2 Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | JavaScript runtime for server-side logic |
| Express.js | Web framework for REST API development |
| Mongoose | MongoDB ODM for schema-based data modeling |
| JSON Web Token (JWT) | Stateless authentication |
| bcryptjs | Password hashing with salt |
| Stripe | Payment processing |
| Nodemailer | Email delivery (OTP, tickets) |
| Helmet | Security headers |
| express-rate-limit | API rate limiting |
| express-mongo-sanitize | NoSQL injection prevention |
| CORS | Cross-origin resource sharing |

### 2.3 Database
- MongoDB Atlas (Cloud-hosted NoSQL database)

### 2.4 External Services
- Stripe (Payment Gateway)
- SendGrid (Email Delivery via SMTP)
- Render (Cloud Deployment Platform)

---

## 3. System Architecture

### 3.1 Architecture Pattern
The application follows a client-server architecture with a RESTful API backend. The React frontend communicates with the Express backend via HTTP requests. In production, the server serves the React build as static files.

### 3.2 Authentication Flow
1. User registers with name, email, password, and role
2. Password is hashed using bcrypt (10 salt rounds) before storage
3. On login, password is verified using bcrypt.compare
4. JWT token is generated with userId payload and 1-day expiry
5. Token is stored in localStorage and sent via Authorization header
6. Auth middleware verifies the token on protected routes

### 3.3 Role-Based Access Control
- **Admin**: Manage movies (CRUD), approve/block theatres, view all theatres
- **Partner**: Manage own theatres (CRUD), manage shows for approved theatres
- **User**: Browse movies, select shows, book seats, make payments, view bookings

---

## 4. Database Design

### 4.1 Collections

**Users**
- name, email, password (hashed), role (admin/user/partner), otp, otpExpiry

**Movies**
- title, description, duration, genre, language, releaseDate, poster

**Theatres**
- name, address, phone, email, owner (ref: Users), isActive

**Shows**
- name, date, time, movie (ref: Movies), ticketPrice, totalSeats, bookedSeats, theatre (ref: Theatres)

**Bookings**
- show (ref: Shows), user (ref: Users), seats, transactionId

### 4.2 Relationships
- Theatre → User (owner, many-to-one)
- Show → Movie (many-to-one)
- Show → Theatre (many-to-one)
- Booking → Show (many-to-one)
- Booking → User (many-to-one)

---

## 5. API Design

### 5.1 User Routes (/api/users)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /register | Register new user | No |
| POST | /login | Login and receive JWT | No |
| GET | /get-current-user | Get authenticated user | Yes |
| PATCH | /forgetpassword | Send OTP to email | No |
| PATCH | /resetpassword/:email | Reset password with OTP | No |

### 5.2 Movie Routes (/api/movies)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /add-movie | Add new movie | Yes |
| GET | /get-all-movies | Get all movies | No |
| GET | /movie/:id | Get movie by ID | No |
| PUT | /update-movie | Update movie | Yes |
| PUT | /delete-movie | Delete movie | Yes |

### 5.3 Theatre Routes (/api/theatres)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /add-theatre | Add theatre | Yes |
| GET | /get-all-theatres | Get all theatres (Admin) | Yes |
| GET | /get-all-theatres-by-owner/:ownerId | Get partner's theatres | Yes |
| PUT | /update-theatre | Update/approve theatre | Yes |
| DELETE | /delete-theatre/:theatreId | Delete theatre | Yes |

### 5.4 Show Routes (/api/shows)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /add-show | Add show | Yes |
| POST | /get-all-shows-by-theatre | Get theatre's shows | Yes |
| POST | /get-all-theatres-by-movie | Get theatres for a movie | No |
| POST | /get-show-by-id | Get show details | Yes |
| PUT | /update-show | Update show | Yes |
| POST | /delete-show | Delete show | Yes |

### 5.5 Booking Routes (/api/bookings)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /make-payment | Process Stripe payment | Yes |
| POST | /book-show | Create booking | Yes |
| GET | /get-all-bookings | Get user's bookings | Yes |

---

## 6. Key Features

### 6.1 User Management
- Registration with role selection (user, partner, admin)
- JWT-based authentication with secure token management
- Password hashing with bcrypt
- Forgot password with 6-digit OTP via email (10-minute expiry)

### 6.2 Movie Management (Admin)
- Full CRUD operations for movies
- Movie details: title, description, duration, genre, language, release date, poster URL
- Ant Design table with edit/delete actions

### 6.3 Theatre Management
- Partners add theatres (pending approval by default)
- Admin approves or blocks theatres
- Theatre details include owner reference for accountability

### 6.4 Show Management (Partner)
- Add shows to approved theatres only
- Configure show name, date, time, movie, ticket price, total seats
- Edit and delete shows
- Movie dropdown populated from database

### 6.5 Movie Browsing & Search (User)
- Home page displays all movies as a poster grid
- Search filter for movie titles
- Click movie to view details and available shows

### 6.6 Seat Selection & Booking
- Dynamic seat grid (12 columns, configurable rows)
- Visual seat states: available, selected, booked
- Real-time price calculation based on selected seats
- Booked seats are greyed out and disabled

### 6.7 Payment Integration
- Stripe Checkout for secure payment processing
- Payment token generated on client, verified on server
- Transaction ID stored with booking record
- Booked seats updated in show after successful payment

### 6.8 Booking History
- User profile page displays all past bookings
- Shows movie poster, theatre, date, time, seats, amount, and transaction ID

---

## 7. Security Implementation

| Security Measure | Implementation |
|-----------------|----------------|
| Password Hashing | bcryptjs with 10 salt rounds |
| Authentication | JWT with 1-day expiry |
| Security Headers | Helmet middleware |
| Rate Limiting | 100 requests per 15-minute window per IP |
| NoSQL Injection | express-mongo-sanitize strips $ and . operators |
| CORS | Restricted to allowed origins |
| X-Powered-By | Disabled to prevent server fingerprinting |

---

## 8. Deployment

### 8.1 Platform
Render (Web Service)

### 8.2 Configuration
- **Build Command**: `cd client && npm install && npm run build && cd ../server && npm install`
- **Start Command**: `cd server && node server.js`
- **Environment Variables**: All secrets configured via Render dashboard (not committed to git)

### 8.3 Production Setup
- React build served as static files by Express
- CORS configured for production URL
- .env files excluded from version control via .gitignore

---

## 9. Project Structure

```
BookMyShow/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── index.js          # Axios instance
│   │   │   ├── users.js          # User API functions
│   │   │   ├── movies.js         # Movie API functions
│   │   │   ├── theatres.js       # Theatre API functions
│   │   │   ├── shows.js          # Show API functions
│   │   │   └── bookings.js       # Booking API functions
│   │   ├── components/
│   │   │   └── ProtectedRoute.js # Auth wrapper with navbar
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   │   ├── index.js      # Movie grid with search
│   │   │   │   ├── SingleMovie.js # Movie details + shows
│   │   │   │   └── BookShow.js   # Seat selection + payment
│   │   │   ├── Login/
│   │   │   │   ├── index.js      # Login page
│   │   │   │   ├── ForgotPassword.js
│   │   │   │   └── ResetPassword.js
│   │   │   ├── Register/
│   │   │   │   └── index.js      # Registration page
│   │   │   ├── Admin/
│   │   │   │   ├── index.js      # Admin dashboard (tabs)
│   │   │   │   ├── MovieList.js  # Movie table
│   │   │   │   ├── MovieForm.js  # Add/edit movie modal
│   │   │   │   ├── DeleteMovieModal.js
│   │   │   │   └── TheatreTable.js # Approve/block theatres
│   │   │   ├── Partner/
│   │   │   │   ├── index.js      # Partner dashboard
│   │   │   │   ├── TheatreFormModal.js
│   │   │   │   ├── DeleteTheatreModal.js
│   │   │   │   └── ShowModal.js  # Show management
│   │   │   └── User/
│   │   │       └── index.js      # Booking history
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   ├── loaderSlice.js
│   │   │   └── userSlice.js
│   │   ├── App.js                # Route definitions
│   │   └── App.css               # Global styles
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── movieController.js
│   │   ├── theatreController.js
│   │   ├── showController.js
│   │   └── bookingController.js
│   ├── middlewares/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── userModel.js
│   │   ├── movieModel.js
│   │   ├── theatreModel.js
│   │   ├── showModel.js
│   │   └── bookingModel.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── movieRoutes.js
│   │   ├── theatreRoutes.js
│   │   ├── showRoutes.js
│   │   └── bookingRoutes.js
│   ├── utils/
│   │   ├── emailHelper.js        # Nodemailer + SendGrid
│   │   └── email_templates/
│   │       └── otp.html          # OTP email template
│   ├── server.js                 # Express app entry point
│   └── package.json
│
└── README.md
```

---

## 10. How to Run Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Stripe account (test keys)
- SendGrid account

### Setup
```bash
# Clone the repository
git clone https://github.com/dinesh2193/Scaler.git
cd Scaler/BookMyShow

# Install server dependencies
cd server
npm install

# Create server .env file with:
# PORT=8082
# DB_URL=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# STRIPE_KEY=sk_test_your_stripe_secret_key
# SENDGRID_API_KEY=your_sendgrid_api_key
# SENDER_EMAIL=your_verified_email

# Start server
npm run dev

# In a new terminal, install client dependencies
cd ../client
npm install

# Create client .env file with:
# REACT_APP_STRIPE_KEY=pk_test_your_stripe_publishable_key

# Start client
npm start
```

The client runs on http://localhost:3000 and proxies API requests to http://localhost:8082.

---

## 11. Key Learnings

1. **Full-Stack Architecture**: Building a complete MERN application with clear separation between client and server
2. **Authentication & Authorization**: Implementing JWT-based auth with role-based access control
3. **State Management**: Using Redux Toolkit for predictable global state
4. **Payment Integration**: Integrating Stripe for secure payment processing
5. **Email Services**: Configuring Nodemailer with SendGrid for transactional emails
6. **Security Best Practices**: Implementing bcrypt, rate limiting, helmet, and input sanitization
7. **Database Design**: Designing MongoDB schemas with proper references and relationships
8. **RESTful API Design**: Building a well-structured API with proper error handling
9. **Deployment**: Deploying a full-stack application to Render with environment variable management

---

## 12. Future Enhancements

- Ticket email confirmation after booking
- Movie search by genre, language, and date filters
- User reviews and ratings for movies
- Seat category pricing (Premium, Standard, Economy)
- Admin analytics dashboard
- Push notifications for show reminders
- Progressive Web App (PWA) support
