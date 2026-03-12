# Applied Software Project Report

## By

**<Full Name of the Student>**

A Master's Project Report submitted to Scaler Neovarsity - Woolf in partial fulfillment of the requirements for the degree of Master of Science in Computer Science

**<Month of Submission, e.g., March 2026>**

| | |
|---|---|
| Scaler Mentee Email ID | <Registered Scaler Email ID> |
| Thesis Supervisor | Naman Bhalla |
| Date of Submission | DD/MM/YYYY |

© The project report of <Full Name of the Student> is approved, and it is acceptable in quality and form for publication electronically

---

## Certification

I confirm that I have overseen / reviewed this applied project and, in my judgment, it adheres to the appropriate standards of academic presentation. I believe it satisfactorily meets the criteria, in terms of both quality and breadth, to serve as an applied project report for the attainment of Master of Science in Computer Science degree. This applied project report has been submitted to Woolf and is deemed sufficient to fulfill the prerequisites for the Master of Science in Computer Science degree.

Naman Bhalla
Project Guide / Supervisor

---

## DECLARATION

I confirm that this project report, submitted to fulfill the requirements for the Master of Science in Computer Science degree, completed by me from <Project Module start date> to <Module end date>, is the result of my own individual endeavor. The Project has been made on my own under the guidance of my supervisor with proper acknowledgement and without plagiarism. Any contributions from external sources or individuals, including the use of AI tools, are appropriately acknowledged through citation. By making this declaration, I acknowledge that any violation of this statement constitutes academic misconduct. I understand that such misconduct may lead to expulsion from the program and/or disqualification from receiving the degree.

<Full Name of the Candidate>

<Signature of the Candidate>                    Date: XX Month 20XX

---

## ACKNOWLEDGMENT

<Insert a paragraph to express gratitude to your family, Scaler instructors and everyone who helped, inspired or motivated you to complete the program and earn the Master's degree>

---

## Table of Contents

| Section | Page |
|---------|------|
| List of Tables | 6 |
| List of Figures | 7 |
| Applied Software Project | 8 |
| Abstract | 8 |
| Project Description | 9 |
| Requirement Gathering | 14 |
| Payments Integration | 22 |
| Security | 26 |
| Deployment Flow | 30 |
| Technologies Used | 33 |
| Conclusion | 38 |
| References | 40 |

---

## List of Tables

| Table No. | Title | Page No. |
|-----------|-------|----------|
| 1.1 | User Routes API Reference | 15 |
| 1.2 | Movie Routes API Reference | 16 |
| 1.3 | Theatre Routes API Reference | 16 |
| 1.4 | Show Routes API Reference | 17 |
| 1.5 | Booking Routes API Reference | 17 |
| 2.1 | Functional Requirements | 14 |
| 2.2 | Non-Functional Requirements | 15 |
| 3.1 | Feature Set - User Role | 18 |
| 3.2 | Feature Set - Partner Role | 19 |
| 3.3 | Feature Set - Admin Role | 19 |
| 4.1 | Security Measures Implemented | 27 |
| 5.1 | Technology Stack Summary | 33 |

---

## List of Figures

| Figure No. | Title | Page No. |
|------------|-------|----------|
| 1.1 | System Architecture Diagram | 10 |
| 1.2 | Authentication Flow | 11 |
| 1.3 | Database Schema Relationships | 12 |
| 2.1 | Use Case Diagram - User | 20 |
| 2.2 | Use Case Diagram - Partner | 20 |
| 2.3 | Use Case Diagram - Admin | 21 |
| 3.1 | Stripe Payment Flow | 23 |
| 3.2 | Booking Sequence Diagram | 24 |
| 4.1 | Deployment Architecture | 31 |
| 4.2 | Project Directory Structure | 32 |

---

## Applied Software Project

### Abstract

This project presents the design, development, and deployment of BookMyShow, a comprehensive online movie ticket booking platform built using the MERN stack (MongoDB, Express.js, React, Node.js). The application addresses the real-world need for a digital platform that connects movie theatres with audiences, enabling seamless ticket booking with secure payment processing.

The system implements a role-based architecture supporting three distinct user types: Administrators who manage the movie catalog and approve theatre registrations, Partners who manage theatre operations and show scheduling, and end Users who browse movies, select shows, choose seats, and complete bookings through integrated Stripe payment processing.

Key technical achievements include JWT-based stateless authentication, bcrypt password hashing, real-time seat availability tracking, Stripe payment gateway integration, OTP-based password recovery via SendGrid email service, and comprehensive security hardening using Helmet, rate limiting, and NoSQL injection prevention.

The application demonstrates practical implementation of full-stack web development principles including RESTful API design, component-based frontend architecture with Redux state management, MongoDB schema design with document references, and production deployment on cloud infrastructure. The platform is deployed on Render and serves both the React frontend and Express backend from a single service.

This project illustrates how modern web technologies can be combined to build scalable, secure, and user-friendly applications that digitize traditional business processes in the entertainment industry, reducing manual effort and improving the customer experience for movie ticket booking.

---

### Project Description

#### Overview

BookMyShow is a full-stack web application that replicates the core functionality of an online movie ticket booking platform. The project was developed iteratively across nine modules, each building upon the previous one to create a complete, production-ready application.

The application serves three categories of users:

1. **End Users** — Browse available movies, view show timings across theatres, select seats from an interactive seat map, make payments via Stripe, and view their booking history.

2. **Theatre Partners** — Register their theatres on the platform, manage show schedules for approved theatres including setting show times, ticket prices, and seat capacity.

3. **Administrators** — Manage the movie catalog with full CRUD operations and oversee the theatre approval workflow, approving or blocking partner theatre registrations.

#### Objectives

The primary objectives of this project are:

- Build a complete full-stack application using the MERN stack following industry best practices
- Implement secure authentication and authorization with role-based access control
- Integrate a third-party payment gateway (Stripe) for secure transaction processing
- Design and implement a NoSQL database schema with proper document relationships
- Deploy the application to a cloud platform with proper environment variable management
- Apply security best practices including password hashing, rate limiting, and input sanitization

#### System Architecture

The application follows a client-server architecture pattern. The React frontend communicates with the Express.js backend through RESTful API endpoints. In the development environment, the React development server proxies API requests to the Express server. In production, the Express server serves the React build as static files, eliminating the need for a separate frontend hosting service.

**Figure 1.1: System Architecture**

```
┌─────────────────────────────────────────────────────┐
│                    Client (React)                     │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  Redux    │  │  Router  │  │  Ant Design UI    │  │
│  │  Store    │  │  (Pages) │  │  Components       │  │
│  └──────────┘  └──────────┘  └───────────────────┘  │
│                    │ Axios HTTP                       │
└────────────────────┼────────────────────────────────┘
                     │
┌────────────────────┼────────────────────────────────┐
│              Server (Express.js)                      │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  Auth    │  │  Routes  │  │  Controllers      │  │
│  │Middleware│  │          │  │                    │  │
│  └──────────┘  └──────────┘  └───────────────────┘  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  Helmet  │  │  Rate    │  │  Mongo Sanitize   │  │
│  │          │  │  Limiter │  │                    │  │
│  └──────────┘  └──────────┘  └───────────────────┘  │
└────────────────────┼────────────────────────────────┘
                     │
┌────────────────────┼────────────────────────────────┐
│           External Services                          │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │ MongoDB  │  │  Stripe  │  │  SendGrid         │  │
│  │  Atlas   │  │ Payments │  │  Email             │  │
│  └──────────┘  └──────────┘  └───────────────────┘  │
└─────────────────────────────────────────────────────┘
```


#### Authentication Flow

The application uses JSON Web Tokens (JWT) for stateless authentication. When a user logs in with valid credentials, the server generates a JWT containing the user's ID as the payload, signed with a secret key and set to expire after 24 hours. This token is stored in the browser's localStorage and included in the Authorization header of every subsequent API request.

**Figure 1.2: Authentication Flow**

```
User                    Client                   Server                  Database
 │                        │                        │                        │
 │── Enter credentials ──>│                        │                        │
 │                        │── POST /api/users/login─>│                      │
 │                        │                        │── Find user by email ──>│
 │                        │                        │<── Return user ─────────│
 │                        │                        │── bcrypt.compare() ────│
 │                        │                        │── Generate JWT ────────│
 │                        │<── Return JWT token ───│                        │
 │                        │── Store in localStorage│                        │
 │<── Redirect to Home ──│                        │                        │
 │                        │                        │                        │
 │── Access protected page>│                       │                        │
 │                        │── GET with Bearer token>│                       │
 │                        │                        │── Verify JWT ──────────│
 │                        │                        │── Extract userId ──────│
 │                        │                        │── Process request ─────│
 │                        │<── Return data ────────│                        │
```

#### Database Schema Design

The application uses MongoDB with Mongoose ODM for data modeling. Five collections are used with document references to establish relationships between entities.

**Figure 1.3: Database Schema Relationships**

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│    Users     │       │   Theatres   │       │    Movies    │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ _id          │◄──────│ owner (ref)  │       │ _id          │
│ name         │       │ _id          │       │ title        │
│ email        │       │ name         │       │ description  │
│ password     │       │ address      │       │ duration     │
│ role         │       │ phone        │       │ genre        │
│ otp          │       │ email        │       │ language     │
│ otpExpiry    │       │ isActive     │       │ releaseDate  │
└──────────────┘       └──────┬───────┘       │ poster       │
       │                      │               └──────┬───────┘
       │                      │                      │
       │               ┌──────┴───────┐              │
       │               │    Shows     │              │
       │               ├──────────────┤              │
       │               │ _id          │              │
       │               │ name         │              │
       │               │ date         │              │
       │               │ time         │              │
       │               │ theatre (ref)│──────────────┘
       │               │ movie (ref)  │
       │               │ ticketPrice  │
       │               │ totalSeats   │
       │               │ bookedSeats  │
       │               └──────┬───────┘
       │                      │
       │               ┌──────┴───────┐
       │               │   Bookings   │
       │               ├──────────────┤
       └──────────────>│ user (ref)   │
                       │ show (ref)   │
                       │ seats        │
                       │ transactionId│
                       └──────────────┘
```

**Users Collection**: Stores user credentials and profile information. The password field contains bcrypt-hashed values. The role field uses an enum to restrict values to 'admin', 'user', or 'partner'. The otp and otpExpiry fields are used temporarily during the password reset flow.

**Movies Collection**: Stores movie metadata including title, description, duration, genre, language, release date, and a poster URL. Movies are managed exclusively by admin users.

**Theatres Collection**: Stores theatre information with an owner reference to the Users collection. The isActive boolean field controls the approval status — theatres default to inactive and require admin approval before shows can be added.

**Shows Collection**: Represents a specific screening of a movie at a theatre. Contains references to both the movie and theatre collections. The bookedSeats array tracks which seat numbers have been reserved, enabling real-time seat availability display.

**Bookings Collection**: Records completed bookings with references to the show and user. Stores the selected seat numbers and the Stripe transaction ID for payment verification. Timestamps are automatically managed by Mongoose.

---

### Requirement Gathering

#### Functional Requirements

Table 2.1: Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| FR-01 | Users shall be able to register with name, email, password, and role | High |
| FR-02 | Users shall be able to login with email and password | High |
| FR-03 | The system shall authenticate users using JWT tokens | High |
| FR-04 | Admin shall be able to add, edit, and delete movies | High |
| FR-05 | Partners shall be able to add, edit, and delete theatres | High |
| FR-06 | Admin shall be able to approve or block theatre registrations | High |
| FR-07 | Partners shall be able to add, edit, and delete shows for approved theatres | High |
| FR-08 | Users shall be able to browse all available movies | High |
| FR-09 | Users shall be able to search movies by title | Medium |
| FR-10 | Users shall be able to view theatres and show times for a selected movie and date | High |
| FR-11 | Users shall be able to select seats from an interactive seat map | High |
| FR-12 | Users shall be able to make payments via Stripe | High |
| FR-13 | The system shall track booked seats and prevent double booking | High |
| FR-14 | Users shall be able to view their booking history | Medium |
| FR-15 | Users shall be able to reset their password via OTP sent to email | Medium |

#### Non-Functional Requirements

Table 2.2: Non-Functional Requirements

| ID | Requirement | Implementation |
|----|------------|----------------|
| NFR-01 | Passwords must be stored securely | bcrypt hashing with 10 salt rounds |
| NFR-02 | API must be protected against abuse | Rate limiting: 100 requests per 15 minutes |
| NFR-03 | Server details must not be exposed | Helmet middleware, X-Powered-By disabled |
| NFR-04 | Input must be sanitized against injection | express-mongo-sanitize |
| NFR-05 | Cross-origin requests must be controlled | CORS with allowed origins whitelist |
| NFR-06 | Application must be accessible via HTTPS | Render provides SSL by default |
| NFR-07 | Environment secrets must not be in source code | .env files excluded via .gitignore |

#### API Reference

Table 1.1: User Routes API Reference (/api/users)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /register | Register new user with role | No |
| POST | /login | Login and receive JWT token | No |
| GET | /get-current-user | Get authenticated user profile | Yes |
| PATCH | /forgetpassword | Generate and send OTP to email | No |
| PATCH | /resetpassword/:email | Reset password with valid OTP | No |

Table 1.2: Movie Routes API Reference (/api/movies)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /add-movie | Add new movie to catalog | Yes (Admin) |
| GET | /get-all-movies | Retrieve all movies | No |
| GET | /movie/:id | Get single movie by ID | No |
| PUT | /update-movie | Update movie details | Yes (Admin) |
| PUT | /delete-movie | Delete movie from catalog | Yes (Admin) |

Table 1.3: Theatre Routes API Reference (/api/theatres)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /add-theatre | Register new theatre | Yes (Partner) |
| GET | /get-all-theatres | Get all theatres with owner info | Yes (Admin) |
| GET | /get-all-theatres-by-owner/:ownerId | Get partner's theatres | Yes (Partner) |
| PUT | /update-theatre | Update theatre or toggle approval | Yes |
| DELETE | /delete-theatre/:theatreId | Remove theatre | Yes (Partner) |

Table 1.4: Show Routes API Reference (/api/shows)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /add-show | Add show to theatre | Yes (Partner) |
| POST | /get-all-shows-by-theatre | Get all shows for a theatre | Yes |
| POST | /get-all-theatres-by-movie | Get theatres showing a movie on a date | No |
| POST | /get-show-by-id | Get show details with populated refs | Yes |
| PUT | /update-show | Update show details | Yes (Partner) |
| POST | /delete-show | Remove show | Yes (Partner) |

Table 1.5: Booking Routes API Reference (/api/bookings)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /make-payment | Process payment via Stripe | Yes |
| POST | /book-show | Create booking and update seats | Yes |
| GET | /get-all-bookings | Get user's booking history | Yes |


#### Users and Use Cases

The system supports three distinct user roles, each with specific capabilities and access levels.

**Figure 2.1: Use Case Diagram - User**

```
                    ┌─────────────────────────────┐
                    │         User (End User)      │
                    └──────────────┬───────────────┘
                                   │
            ┌──────────────────────┼──────────────────────┐
            │                      │                      │
     ┌──────┴──────┐       ┌──────┴──────┐       ┌──────┴──────┐
     │ Register /  │       │ Browse      │       │ Book        │
     │ Login       │       │ Movies      │       │ Tickets     │
     └─────────────┘       └──────┬──────┘       └──────┬──────┘
                                   │                      │
                            ┌──────┴──────┐       ┌──────┴──────┐
                            │ Search      │       │ Select      │
                            │ Movies      │       │ Seats       │
                            └──────┬──────┘       └──────┬──────┘
                                   │                      │
                            ┌──────┴──────┐       ┌──────┴──────┐
                            │ View Shows  │       │ Make        │
                            │ by Date     │       │ Payment     │
                            └─────────────┘       └──────┬──────┘
                                                         │
                                                  ┌──────┴──────┐
                                                  │ View        │
                                                  │ Bookings    │
                                                  └─────────────┘
```

**Figure 2.2: Use Case Diagram - Partner**

```
                    ┌─────────────────────────────┐
                    │         Partner              │
                    └──────────────┬───────────────┘
                                   │
            ┌──────────────────────┼──────────────────────┐
            │                      │                      │
     ┌──────┴──────┐       ┌──────┴──────┐       ┌──────┴──────┐
     │ Add         │       │ Edit        │       │ Delete      │
     │ Theatre     │       │ Theatre     │       │ Theatre     │
     └─────────────┘       └─────────────┘       └─────────────┘
                                   │
            ┌──────────────────────┼──────────────────────┐
            │                      │                      │
     ┌──────┴──────┐       ┌──────┴──────┐       ┌──────┴──────┐
     │ Add Show    │       │ Edit Show   │       │ Delete Show │
     │ (approved   │       │             │       │             │
     │  theatres)  │       │             │       │             │
     └─────────────┘       └─────────────┘       └─────────────┘
```

**Figure 2.3: Use Case Diagram - Admin**

```
                    ┌─────────────────────────────┐
                    │         Admin                │
                    └──────────────┬───────────────┘
                                   │
            ┌──────────────────────┼──────────────────────┐
            │                      │                      │
     ┌──────┴──────┐       ┌──────┴──────┐       ┌──────┴──────┐
     │ Movie CRUD  │       │ View All    │       │ Approve /   │
     │ (Add, Edit, │       │ Theatres    │       │ Block       │
     │  Delete)    │       │             │       │ Theatres    │
     └─────────────┘       └─────────────┘       └─────────────┘
```

#### Feature Set

Table 3.1: Feature Set - User Role

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Registration | Create account with name, email, password | Ant Design Form with validation, bcrypt hashing |
| Login | Authenticate with email and password | JWT token generation, localStorage storage |
| Movie Browsing | View all movies as poster grid | React component with Ant Design Grid |
| Movie Search | Filter movies by title | Client-side search filter on movie array |
| Show Selection | View theatres and shows for a movie on a date | Date picker, grouped theatre/show listing |
| Seat Selection | Interactive seat map with availability | Dynamic grid (12 cols), color-coded states |
| Payment | Pay for selected seats via Stripe | react-stripe-checkout, server-side charge |
| Booking History | View past bookings with details | Profile page with populated booking data |
| Password Reset | Reset password via email OTP | 6-digit OTP, 10-min expiry, SendGrid email |

Table 3.2: Feature Set - Partner Role

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Theatre Management | Add, edit, delete theatres | Modal forms, Ant Design Table |
| Theatre Status | View approval status | isActive field, status display |
| Show Management | Add, edit, delete shows for approved theatres | ShowModal with form/table toggle |
| Movie Selection | Select movie for a show | Dropdown populated from movies API |
| Seat Configuration | Set total seats and ticket price | Numeric inputs in show form |

Table 3.3: Feature Set - Admin Role

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Movie CRUD | Add, edit, delete movies | MovieForm modal, MovieList table |
| Theatre Oversight | View all theatres with owner info | TheatreTable with populated owner |
| Theatre Approval | Approve or block theatres | Toggle isActive via update API |

---

### Payments Integration

#### How Payment Gateways Work

A payment gateway is a technology service that acts as an intermediary between a merchant's website and the financial institutions that process the payment. When a customer initiates a payment, the gateway securely transmits the transaction data to the payment processor, which communicates with the card network (Visa, Mastercard, etc.) and the issuing bank to authorize or decline the transaction.

Payment gateways handle sensitive card data and must comply with the Payment Card Industry Data Security Standard (PCI DSS). PCI DSS is a set of security standards designed to ensure that all companies that accept, process, store, or transmit credit card information maintain a secure environment. By using a third-party gateway like Stripe, the application offloads PCI compliance responsibility — card details never touch our server.

#### Stripe Integration

This project uses Stripe as the payment gateway. Stripe was chosen for its developer-friendly API, comprehensive documentation, and built-in PCI DSS compliance. The integration uses the legacy Stripe Checkout flow via the react-stripe-checkout library.

**Figure 3.1: Stripe Payment Flow**

```
User                    Client                   Server                  Stripe
 │                        │                        │                        │
 │── Select seats ───────>│                        │                        │
 │── Click "Pay Now" ────>│                        │                        │
 │                        │── Open Stripe modal ──>│                        │
 │── Enter card details ─>│                        │                        │
 │                        │── Generate token ──────────────────────────────>│
 │                        │<── Return token ───────────────────────────────│
 │                        │── POST /make-payment ─>│                        │
 │                        │   (token + amount)     │── Create customer ────>│
 │                        │                        │<── Customer ID ────────│
 │                        │                        │── Create charge ──────>│
 │                        │                        │<── Transaction ID ─────│
 │                        │<── Transaction ID ─────│                        │
 │                        │── POST /book-show ────>│                        │
 │                        │   (show, seats, txnId) │── Create booking ─────│
 │                        │                        │── Update bookedSeats ──│
 │                        │<── Booking confirmed ──│                        │
 │<── Redirect to Home ──│                        │                        │
```

#### Server-Side Payment Processing

On the server, the payment is processed in two steps:

1. **Customer Creation**: A Stripe customer is created using the token's email and source (card token). This associates the payment method with a customer record in Stripe.

2. **Charge Creation**: A charge is created against the customer for the specified amount in INR. The charge returns a transaction ID which is stored with the booking record.

```javascript
// Server-side payment processing (bookingController.js)
const customer = await stripe.customers.create({
  email: token.email,
  source: token.id,
});
const paymentIntent = await stripe.charges.create({
  amount: amount,        // Amount in paise (INR smallest unit)
  currency: "inr",
  customer: customer.id,
  receipt_email: token.email,
});
```

**Figure 3.2: Booking Sequence After Payment**

```
Client                   Server                  MongoDB
 │                        │                        │
 │── POST /book-show ────>│                        │
 │   {show, user,         │                        │
 │    seats, txnId}       │                        │
 │                        │── Create Booking doc ──>│
 │                        │<── Booking saved ───────│
 │                        │── Find Show by ID ─────>│
 │                        │<── Return Show ─────────│
 │                        │── Update Show ─────────>│
 │                        │   (append to            │
 │                        │    bookedSeats array)    │
 │                        │<── Show updated ────────│
 │<── Success response ──│                        │
```

#### Security Considerations

- Card details are tokenized on the client side by Stripe.js and never reach our server
- The Stripe secret key is stored as an environment variable, never committed to source code
- The publishable key is injected at build time via REACT_APP_STRIPE_KEY environment variable
- All payment API endpoints require JWT authentication
- Transaction IDs are stored for audit and dispute resolution

---

### Security

Security was implemented as a dedicated module (Module 9) following the principle of defense in depth — multiple layers of security controls to protect the application.

#### a. Password Hashing with Bcrypt

Bcrypt is a password hashing function designed by Niels Provos and David Mazières. Unlike simple hash functions (MD5, SHA), bcrypt incorporates a salt to protect against rainbow table attacks and uses a configurable work factor (cost) that makes brute-force attacks computationally expensive.

**How bcrypt works:**

1. **Salt Generation**: A random salt is generated (in this project, 10 rounds). The salt ensures that identical passwords produce different hashes.

2. **Key Derivation**: The password and salt are processed through the Blowfish cipher multiple times (2^cost iterations). With 10 rounds, this means 1,024 iterations.

3. **Hash Output**: The result is a 60-character string containing the algorithm identifier, cost factor, salt, and hash.

```javascript
// Registration - Hash password before storage
const hashedPassword = await bcrypt.hash(req.body.password, 10);

// Login - Compare input with stored hash
const isMatch = await bcrypt.compare(req.body.password, user.password);

// Password Reset - Hash new password
user.password = await bcrypt.hash(req.body.password, 10);
```

The cost factor of 10 provides a good balance between security and performance. Each hash operation takes approximately 100ms, making brute-force attacks impractical while keeping login response times acceptable.

#### b. Security Packages

Table 4.1: Security Measures Implemented

| Package | Purpose | Configuration |
|---------|---------|---------------|
| helmet | Sets various HTTP security headers | Default configuration with all headers enabled |
| express-rate-limit | Limits repeated requests to API endpoints | 100 requests per 15-minute window per IP |
| express-mongo-sanitize | Prevents NoSQL injection attacks | Strips $ and . operators from request body |
| cors | Controls cross-origin resource sharing | Whitelist of allowed origins |

**Helmet** sets the following security headers:
- Content-Security-Policy: Prevents XSS and data injection attacks
- X-Content-Type-Options: nosniff — Prevents MIME type sniffing
- X-Frame-Options: DENY — Prevents clickjacking
- Strict-Transport-Security — Enforces HTTPS connections
- X-XSS-Protection — Enables browser XSS filtering

**Rate Limiting** prevents denial-of-service attacks and brute-force login attempts:

```javascript
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15-minute window
  max: 100,                    // Max 100 requests per window
  message: { success: false, message: "Too many requests, try again later" }
});
app.use("/api/", apiLimiter);
```

**NoSQL Injection Prevention** — MongoDB queries can be manipulated using operators like `$gt`, `$ne`, etc. The express-mongo-sanitize middleware strips these operators from user input:

```javascript
// Without sanitization, this login bypass would work:
// POST /login { "email": {"$gt": ""}, "password": {"$gt": ""} }

// With express-mongo-sanitize, the $ operators are stripped,
// resulting in an empty object that fails validation
app.use(mongoSanitize());
```

**CORS Configuration** restricts which origins can make requests to the API:

```javascript
app.use(cors({
  origin: ["http://localhost:3000", process.env.CLIENT_URL].filter(Boolean),
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));
```

Additionally, `app.disable("x-powered-by")` removes the X-Powered-By header that would otherwise reveal the server is running Express.js, reducing the attack surface by hiding server technology details.

---

### Deployment Flow

#### Version Control with GitHub

The project source code is maintained in a GitHub repository at https://github.com/dinesh2193/Scaler. The repository follows a structured commit history with conventional commit messages (feat:, fix:, docs:) for clear change tracking. Sensitive files (.env) are excluded from version control via .gitignore.

#### Deployment on Render

Render was chosen as the deployment platform for its simplicity, free tier availability, and native GitHub integration. The application is deployed as a single Web Service that handles both the API and serves the React frontend.

**Figure 4.1: Deployment Architecture**

```
GitHub Repository
       │
       │ (auto-deploy on push)
       ▼
┌─────────────────────────────────┐
│         Render Web Service       │
│                                  │
│  Build Phase:                    │
│  1. cd client && npm install     │
│  2. npm run build                │
│  3. cd ../server && npm install  │
│                                  │
│  Run Phase:                      │
│  cd server && node server.js     │
│                                  │
│  ┌────────────────────────────┐  │
│  │     Express Server         │  │
│  │  ┌──────────────────────┐  │  │
│  │  │  API Routes (/api/*) │  │  │
│  │  └──────────────────────┘  │  │
│  │  ┌──────────────────────┐  │  │
│  │  │  Static Files        │  │  │
│  │  │  (client/build/*)    │  │  │
│  │  └──────────────────────┘  │  │
│  └────────────────────────────┘  │
└─────────────────────────────────┘
       │              │
       ▼              ▼
  MongoDB Atlas    Stripe API
  (Database)       (Payments)
```

#### CORS Handling

In development, the React dev server's proxy configuration forwards API requests to the Express server, avoiding CORS issues. In production, since both frontend and API are served from the same origin on Render, CORS is not an issue for same-origin requests. The CORS middleware is configured to allow the production URL as an additional origin for any external API consumers.

#### Environment Variables

All secrets are configured through the Render dashboard and are never committed to the repository:

- PORT, DB_URL, JWT_SECRET
- STRIPE_KEY, REACT_APP_STRIPE_KEY
- SENDGRID_API_KEY, SENDER_EMAIL
- CLIENT_URL

**Figure 4.2: Project Directory Structure**

```
BookMyShow/
├── client/                    # React Frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── api/               # API client functions (axios)
│   │   ├── components/        # Shared components (ProtectedRoute)
│   │   ├── pages/             # Page components by feature
│   │   │   ├── Home/          # Movie browsing, show selection, booking
│   │   │   ├── Login/         # Login, forgot/reset password
│   │   │   ├── Register/      # User registration
│   │   │   ├── Admin/         # Movie CRUD, theatre approval
│   │   │   ├── Partner/       # Theatre and show management
│   │   │   └── User/          # Booking history
│   │   ├── redux/             # Redux store and slices
│   │   ├── App.js             # Route definitions
│   │   └── App.css            # Global styles
│   └── package.json
├── server/                    # Express Backend
│   ├── config/                # Database connection
│   ├── controllers/           # Route handler logic
│   ├── middlewares/            # Auth middleware
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API route definitions
│   ├── utils/                 # Email helper and templates
│   ├── server.js              # Application entry point
│   └── package.json
└── README.md
```

---

### Technologies Used

#### MERN Stack

The MERN stack is a popular full-stack JavaScript framework consisting of four key technologies that work together to build modern web applications.

Table 5.1: Technology Stack Summary

| Technology | Role | Version | Description |
|-----------|------|---------|-------------|
| MongoDB | Database | Atlas | NoSQL document database that stores data in flexible, JSON-like documents. Used with Mongoose ODM for schema validation and document relationships. MongoDB Atlas provides cloud-hosted database with automatic scaling and backups. |
| Express.js | Backend Framework | 4.21 | Minimal and flexible Node.js web framework that provides robust features for building REST APIs. Handles routing, middleware, request/response processing, and error handling. |
| React | Frontend Library | 18.3 | Component-based JavaScript library for building user interfaces. Uses virtual DOM for efficient rendering, hooks for state management, and JSX for declarative UI code. |
| Node.js | Runtime | 18+ | JavaScript runtime built on Chrome's V8 engine that enables server-side JavaScript execution. Provides non-blocking I/O and event-driven architecture for scalable applications. |

#### Additional Technologies

**Redux Toolkit** — The official, opinionated toolset for efficient Redux development. Used in this project for managing global application state including user session data and loading indicators. Redux Toolkit simplifies store configuration, reduces boilerplate code, and includes utilities like createSlice for defining reducers and actions.

**Ant Design** — A comprehensive React UI component library providing production-ready components including Tables, Forms, Modals, Menus, Buttons, and Grid layouts. Used extensively throughout the application for consistent, professional UI design without custom CSS for most components.

**Axios** — A promise-based HTTP client for making API requests from the React frontend. Configured with a custom instance that automatically includes the JWT authorization header on every request.

**Moment.js** — A JavaScript library for parsing, validating, manipulating, and formatting dates. Used for displaying release dates, show dates, and booking timestamps in user-friendly formats.

**JSON Web Token (JWT)** — An open standard (RFC 7519) for securely transmitting information between parties as a JSON object. Used for stateless authentication — the server generates a signed token on login, and the client includes it in subsequent requests for identity verification.

**Stripe** — A payment processing platform that provides APIs for accepting payments online. The react-stripe-checkout library provides a pre-built checkout modal that handles card input and tokenization, while the server-side Stripe SDK processes charges.

**Nodemailer** — A module for Node.js applications to send emails. Configured with SendGrid's SMTP relay for reliable email delivery of OTP codes during the password reset flow.

**Mongoose** — An Object Data Modeling (ODM) library for MongoDB and Node.js. Provides schema-based data modeling with built-in type casting, validation, query building, and document references (populate).

#### Real-World Applications

The MERN stack and the technologies used in this project have widespread real-world applications:

- **E-commerce platforms** use similar payment gateway integrations (Stripe/Razorpay) for processing transactions, with role-based access for vendors and customers.
- **Event booking systems** (concerts, sports, conferences) use seat selection interfaces and real-time availability tracking similar to the BookMyShow seat grid.
- **SaaS applications** implement JWT-based authentication with role-based access control for multi-tenant architectures.
- **Healthcare portals** use OTP-based verification for secure patient authentication, similar to the password reset flow implemented here.
- **Content management systems** use admin approval workflows similar to the theatre approval process, where content requires editorial review before publication.

---

### Conclusion

#### Key Takeaways

This project provided hands-on experience with the complete software development lifecycle — from requirement gathering and database design through implementation, testing, and production deployment. Key technical concepts reinforced through this project include:

- **Full-Stack Architecture**: Understanding how frontend and backend components communicate through RESTful APIs, and how to structure a project for maintainability with clear separation of concerns.
- **Authentication and Security**: Implementing JWT-based stateless authentication, understanding the importance of password hashing with bcrypt, and applying defense-in-depth security principles with multiple middleware layers.
- **Payment Processing**: Integrating third-party payment services while maintaining PCI DSS compliance by ensuring sensitive card data never touches the application server.
- **State Management**: Using Redux Toolkit for predictable, centralized state management in a React application with multiple user roles and complex UI interactions.
- **Database Design**: Designing MongoDB schemas with proper document references and understanding the trade-offs between embedding and referencing in NoSQL databases.

#### Practical Applications

The technologies and patterns used in this project are directly applicable to building production software in various industries. The MERN stack powers applications at companies of all sizes due to its JavaScript-everywhere approach, which reduces context switching and enables code sharing between frontend and backend. The role-based access control pattern is fundamental to any multi-user application, from enterprise software to consumer platforms.

#### Limitations and Suggestions for Improvement

- **Scalability**: The current single-server deployment on Render's free tier has cold start delays and limited concurrent connections. A production deployment would benefit from horizontal scaling with load balancing.
- **Real-time Updates**: Seat availability is checked at booking time but not in real-time. WebSocket integration could provide live seat status updates to prevent conflicts when multiple users view the same show.
- **Testing**: The project lacks automated unit and integration tests. Adding a test suite with Jest and Supertest would improve reliability and enable confident refactoring.
- **Cost**: Stripe charges transaction fees (2.9% + 30¢ per transaction). For a production platform, negotiating volume-based pricing and implementing webhook-based payment confirmation would be important.
- **Email Deliverability**: SendGrid's free tier has sending limits. A production system would need a paid email service plan and proper domain authentication (SPF, DKIM) for reliable delivery.

---

### References

1. React Documentation, https://react.dev/, Meta Platforms Inc., Accessed March 2026
2. Express.js Documentation, https://expressjs.com/, OpenJS Foundation, Accessed March 2026
3. MongoDB Documentation, https://www.mongodb.com/docs/, MongoDB Inc., Accessed March 2026
4. Node.js Documentation, https://nodejs.org/docs/, OpenJS Foundation, Accessed March 2026
5. Stripe API Documentation, https://stripe.com/docs/api, Stripe Inc., Accessed March 2026
6. Redux Toolkit Documentation, https://redux-toolkit.js.org/, Redux Team, Accessed March 2026
7. Ant Design Documentation, https://ant.design/, Ant Group, Accessed March 2026
8. Mongoose Documentation, https://mongoosejs.com/docs/, Automattic, Accessed March 2026
9. JSON Web Tokens Introduction, https://jwt.io/introduction, Auth0, Accessed March 2026
10. bcrypt.js Documentation, https://www.npmjs.com/package/bcryptjs, npm, Accessed March 2026
11. Nodemailer Documentation, https://nodemailer.com/, Andris Reinman, Accessed March 2026
12. SendGrid Documentation, https://docs.sendgrid.com/, Twilio Inc., Accessed March 2026
13. Helmet.js Documentation, https://helmetjs.github.io/, Adam Baldwin, Accessed March 2026
14. Render Documentation, https://render.com/docs, Render Inc., Accessed March 2026
15. PCI DSS Standards, https://www.pcisecuritystandards.org/, PCI Security Standards Council, Accessed March 2026
