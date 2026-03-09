# BookMyShow Project - Complete Module Summary

## Overview
This document summarizes all 9 modules of the MERN Stack BookMyShow project, extracted from the PDF files in the modules directory.

---

## Module 1: Project Introduction & Setup (MERN_5)

### Main Topic
Project infrastructure setup, frontend initialization, and basic authentication routes

### Key Features
1. **Project Structure Setup**
   - Client folder (React frontend)
   - Server folder (Express backend)
   - MongoDB database configuration

2. **Frontend Pages**
   - Home Page
   - Login Page
   - Registration Page

3. **Authentication Foundation**
   - User registration
   - User login
   - Form validation with Ant Design

### Technical Requirements
- **Frontend**: React, React Router DOM, Ant Design, Axios
- **Backend**: Express, Mongoose, bcryptjs, jsonwebtoken
- **Database**: MongoDB

### API Endpoints
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Database Models
```javascript
// User Schema
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  isAdmin: Boolean (default: false)
}
```

### Implementation Details
- Ant Design for UI components
- Axios instance configuration with proxy
- Environment variables setup (.env file)
- JWT token generation on login
- Basic form validation

---

## Module 2: User, Partner & Admin Routes (MERN_6)

### Main Topic
Role-based access control, JWT authentication, and axios integration

### Key Features
1. **User Roles**
   - Admin: Manage movies and approve theatres
   - Partner: Manage their own theatres
   - User: Book tickets

2. **Proxy Configuration**
   - Client-server connection via proxy
   - CORS handling

3. **Token Management**
   - JWT token storage in localStorage
   - Bearer token authentication

### Technical Requirements
- JWT for authentication
- Axios interceptors for token injection
- Role-based routing

### API Endpoints
- `POST /api/users/register` - Register with role
- `POST /api/users/login` - Login and receive token
- `GET /api/users/get-current-user` - Get authenticated user

### Database Models
```javascript
// Updated User Schema
{
  name: String,
  email: String,
  password: String,
  role: String (enum: ['admin', 'user', 'partner'], default: 'user')
}
```

### Implementation Details
- Axios instance with authorization header
- Token stored in localStorage
- Automatic token inclusion in requests
- User role validation

---

## Module 3: Protected Routes & Redux (MERN_7)

### Main Topic
Authentication middleware, protected routes, and state management with Redux

### Key Features
1. **Auth Middleware**
   - Token verification
   - User ID extraction from token
   - Protected route access control

2. **Redux State Management**
   - User state management
   - Loader state management
   - Centralized state store

3. **Protected Route Component**
   - Navigation menu based on user role
   - Logout functionality
   - Profile navigation

### Technical Requirements
- Redux Toolkit
- React Redux
- Auth middleware on backend
- JWT verification

### API Endpoints
- `GET /api/users/get-current-user` (with auth middleware)

### Implementation Details
```javascript
// Auth Middleware
- Extract token from Authorization header
- Verify token with JWT_SECRET
- Attach userId to request body
- Pass to next middleware/controller

// Redux Slices
- loaderSlice: ShowLoading, HideLoading
- userSlice: SetUser
```

### Protected Route Features
- Automatic user validation on mount
- Role-based navigation items
- Redirect to login if no token
- Logout clears localStorage

---

## Module 4: Movies & Theatre API (MERN_8)

### Main Topic
CRUD operations for movies and theatres, admin and partner functionality

### Key Features
1. **Admin Features**
   - Add/Edit/Delete movies
   - Approve/Block theatre requests
   - View all theatres with owner info

2. **Partner Features**
   - Add/Edit/Delete their theatres
   - View theatre approval status
   - Manage theatre information

3. **Movie Management**
   - Movie CRUD operations
   - Movie listing with filters
   - Movie details display

### Technical Requirements
- Ant Design Tables and Forms
- Moment.js for date formatting
- File upload for movie posters
- Theatre ownership tracking

### API Endpoints
**Movies:**
- `POST /api/movies/add-movie` - Add new movie
- `GET /api/movies/get-all-movies` - Get all movies
- `PUT /api/movies/update-movie` - Update movie
- `DELETE /api/movies/delete-movie` - Delete movie
- `GET /api/movies/movie/:id` - Get movie by ID

**Theatres:**
- `POST /api/theatres/add-theatre` - Add theatre
- `GET /api/theatres/get-all-theatres` - Get all theatres (Admin)
- `GET /api/theatres/get-all-theatres-by-owner/:ownerId` - Get owner's theatres
- `PUT /api/theatres/update-theatre` - Update theatre
- `DELETE /api/theatres/delete-theatre/:theatreId` - Delete theatre

### Database Models
```javascript
// Movie Schema
{
  movieName: String (required),
  description: String (required),
  duration: Number (required),
  genre: String (required),
  language: String (required),
  releaseDate: Date (required),
  poster: String (required)
}

// Theatre Schema
{
  name: String (required),
  address: String (required),
  phone: Number (required),
  email: String (required),
  owner: ObjectId (ref: 'users'),
  isActive: Boolean (default: false)
}
```

### Implementation Details
- Modal forms for Add/Edit operations
- Delete confirmation modals
- Table with action buttons
- Admin approval workflow for theatres
- Owner reference in theatre model

---

## Module 5: Partner Shows Management (MERN_9)

### Main Topic
Show management for approved theatres, partner dashboard

### Key Features
1. **Show Management**
   - Add shows to approved theatres
   - Edit show details
   - Delete shows
   - View all shows by theatre

2. **Show Details**
   - Show name, date, and time
   - Movie selection
   - Ticket pricing
   - Total seats configuration
   - Booked seats tracking

### Technical Requirements
- Date and time pickers
- Movie dropdown selection
- Theatre-specific show management
- Show availability validation

### API Endpoints
- `POST /api/shows/add-show` - Add new show
- `PUT /api/shows/update-show` - Update show
- `POST /api/shows/delete-show` - Delete show
- `POST /api/shows/get-all-shows-by-theatre` - Get theatre shows
- `POST /api/shows/get-all-theatres-by-movie` - Get theatres by movie
- `POST /api/shows/get-show-by-id` - Get show details

### Database Models
```javascript
// Show Schema
{
  name: String (required),
  date: Date (required),
  time: String (required),
  movie: ObjectId (ref: 'movies', required),
  ticketPrice: Number (required),
  totalSeats: Number (required),
  bookedSeats: Array (default: []),
  theatre: ObjectId (ref: 'theatres', required)
}
```

### Implementation Details
- Show modal with form/table toggle
- Theatre-specific show listing
- Movie population in show details
- Time formatting with Moment.js
- Available seats calculation

---

## Module 6: Live Shows & Seating (MERN_10)

### Main Topic
Homepage movie display, show selection, and seat booking interface

### Key Features
1. **Homepage**
   - Display all currently running movies
   - Search functionality
   - Movie poster display
   - Click to view movie details

2. **Single Movie Page**
   - Movie details display
   - Date selection
   - Theatre list with shows
   - Show time selection

3. **Seat Selection**
   - Dynamic seat layout (12 columns × 10 rows)
   - Visual seat status (available/selected/booked)
   - Seat number display
   - Total price calculation
   - Selected seats summary

### Technical Requirements
- Movie filtering and search
- Date-based show filtering
- Dynamic seat grid generation
- Seat selection state management

### API Endpoints
- `GET /api/movies/get-all-movies` - Get all movies
- `GET /api/movies/movie/:id` - Get movie by ID
- `POST /api/shows/get-all-theatres-by-movie` - Get theatres showing movie
- `POST /api/shows/get-show-by-id` - Get show with seat info

### Implementation Details
```javascript
// Seat Layout Generation
- 120 total seats (12 columns × 10 rows)
- Seat number calculation: row * columns + column + 1
- CSS classes: seat-btn, selected, booked
- Click handler for seat selection/deselection
- Booked seats from show.bookedSeats array
```

### Routing
- `/` - Homepage with all movies
- `/movie/:id?date=YYYY-MM-DD` - Single movie page
- `/book-show/:showId` - Seat selection page

---

## Module 7: Payment & Tickets (MERN_11)

### Main Topic
Stripe payment integration, booking creation, and ticket generation

### Key Features
1. **Payment Integration**
   - Stripe Checkout component
   - Payment token generation
   - Server-side payment verification
   - Transaction ID generation

2. **Booking System**
   - Create booking after payment
   - Update booked seats
   - Store transaction details
   - Link booking to user and show

3. **Ticket Email**
   - Send ticket via email
   - Ticket template with booking details
   - NodeMailer integration
   - SendGrid SMTP service

### Technical Requirements
- Stripe API (publishable and secret keys)
- react-stripe-checkout
- NodeMailer
- SendGrid account
- Email templates (HTML)

### API Endpoints
- `POST /api/bookings/make-payment` - Process payment with Stripe
- `POST /api/bookings/book-show` - Create booking after payment
- `GET /api/bookings/get-all-bookings` - Get user's bookings

### Database Models
```javascript
// Booking Schema
{
  show: ObjectId (ref: 'shows'),
  user: ObjectId (ref: 'users'),
  seats: Array (required),
  transactionId: String (required),
  timestamps: true
}
```

### Implementation Details
```javascript
// Stripe Payment Flow
1. User selects seats
2. Click "Pay Now" button
3. Stripe Checkout modal opens
4. User enters card details
5. Token generated on client
6. Token sent to server
7. Server creates Stripe customer
8. Server creates payment intent
9. Transaction ID returned
10. Booking created with transaction ID
11. Booked seats updated in show
12. Ticket email sent to user

// Email Template Variables
- #{name} - User name
- #{movie} - Movie title
- #{theatre} - Theatre name
- #{date} - Show date
- #{time} - Show time
- #{seats} - Seat numbers
- #{amount} - Total amount
- #{transactionId} - Transaction ID
```

### Stripe Configuration
```javascript
// Client-side
<StripeCheckout
  token={onToken}
  billingAddress
  amount={selectedSeats.length * show.ticketPrice * 100}
  stripeKey="pk_test_..."
>

// Server-side
const stripe = require('stripe')(process.env.STRIPE_KEY);
const customer = await stripe.customers.create({...});
const paymentIntent = await stripe.paymentIntents.create({...});
```

---

## Module 8: Password Reset (MERN_12)

### Main Topic
Forgot password functionality with OTP verification via email

### Key Features
1. **OTP Generation**
   - 6-digit OTP generation
   - OTP expiry (10 minutes)
   - Store OTP in user model
   - Send OTP via email

2. **Password Reset**
   - Verify OTP
   - Check OTP expiry
   - Update password
   - Clear OTP fields

3. **Email Service**
   - NodeMailer configuration
   - SendGrid SMTP
   - HTML email templates
   - Dynamic content replacement

### Technical Requirements
- NodeMailer
- SendGrid API key
- Email templates
- OTP generation logic
- Expiry time management

### API Endpoints
- `PATCH /api/users/forgetpassword` - Send OTP to email
- `PATCH /api/users/resetpassword/:email` - Reset password with OTP

### Database Models
```javascript
// Updated User Schema
{
  // ... existing fields
  otp: String,
  otpExpiry: Date
}
```

### Implementation Details
```javascript
// OTP Generation
function otpGenerator() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Forget Password Flow
1. User enters email
2. Check if user exists
3. Generate 6-digit OTP
4. Set OTP expiry (10 minutes)
5. Save OTP to user document
6. Send OTP email
7. Return success message

// Reset Password Flow
1. User enters OTP and new password
2. Find user by email
3. Verify OTP matches
4. Check OTP not expired
5. Update password
6. Clear OTP and expiry
7. Return success message

// Email Helper
- Read HTML template
- Replace placeholders (#{name}, #{otp})
- Configure SMTP transport
- Send email via SendGrid
```

### Email Template
- OTP display in styled box
- User name personalization
- Expiry warning message
- Professional layout

---

## Module 9: Security & Deployment (MERN_13)

### Main Topic
Application security hardening and deployment to Render

### Key Features
1. **Password Hashing**
   - Bcrypt for password hashing
   - Salt generation (10 rounds)
   - Secure password storage
   - Password comparison on login

2. **Rate Limiting**
   - Prevent DoS attacks
   - Limit requests per IP
   - 100 requests per 15 minutes
   - Custom error messages

3. **Security Headers**
   - Helmet middleware
   - XSS protection
   - Content Security Policy
   - Remove X-Powered-By header

4. **NoSQL Injection Prevention**
   - express-mongo-sanitize
   - Strip $ and . from inputs
   - Prevent operator injection

5. **Deployment**
   - Render platform
   - GitHub integration
   - Environment variables
   - Production build serving

### Technical Requirements
- bcrypt
- express-rate-limit
- helmet
- express-mongo-sanitize
- Render account
- GitHub repository

### Security Implementation
```javascript
// 1. Password Hashing (Bcrypt)
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
const isMatch = await bcrypt.compare(inputPassword, hashedPassword);

// 2. Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: "Too many requests, try again later"
});
app.use("/api/", apiLimiter);

// 3. Helmet (Security Headers)
app.use(helmet());
app.disable("x-powered-by");

// 4. NoSQL Injection Prevention
const mongoSanitize = require("express-mongo-sanitize");
app.use(mongoSanitize());

// 5. CORS Configuration
app.use(cors({
  origin: ["http://localhost:3000", "https://production-url.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
```

### Deployment Steps
1. **Prepare Application**
   - Create production build: `npm run build`
   - Test locally
   - Commit to Git

2. **GitHub Setup**
   - Initialize Git repository
   - Create GitHub repository
   - Push code to GitHub

3. **Render Configuration**
   - Sign up/Login to Render
   - Create new Web Service
   - Connect GitHub repository
   - Configure build command:
     ```bash
     cd client && npm install && npm run build && cd ../server && npm install
     ```
   - Configure start command:
     ```bash
     cd server && npm start
     ```

4. **Environment Variables**
   - Add all .env variables in Render dashboard
   - DB_URL (MongoDB connection string)
   - JWT_SECRET
   - STRIPE_KEY
   - SENDGRID_API_KEY

5. **Serve Static Files**
   ```javascript
   const path = require("path");
   const clientBuildPath = path.join(__dirname, "../client/build");
   
   app.use(express.static(clientBuildPath));
   app.get("*", (req, res) => {
     res.sendFile(path.join(clientBuildPath, "index.html"));
   });
   ```

6. **Remove Proxy**
   - Remove proxy from client/package.json
   - Update CORS configuration

### Security Best Practices
1. **Zero Trust Model**: Never trust, always verify
2. **Principle of Least Privilege**: Minimal access rights
3. **Reduce Attack Surface**: Minimize exposure points
4. **Input Validation**: Sanitize all user inputs
5. **Secure Password Storage**: Use bcrypt with salt
6. **Rate Limiting**: Prevent abuse and DoS
7. **Security Headers**: Use Helmet middleware
8. **Environment Variables**: Never commit secrets

---

## Complete Technology Stack

### Frontend
- React 18
- React Router DOM
- Redux Toolkit
- React Redux
- Ant Design (UI Components)
- Axios (HTTP Client)
- Moment.js (Date Formatting)
- react-stripe-checkout (Payment)
- @ant-design/icons (Icons)

### Backend
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- jsonwebtoken (JWT Authentication)
- bcryptjs (Password Hashing)
- Stripe (Payment Processing)
- NodeMailer (Email Service)
- express-rate-limit (Rate Limiting)
- helmet (Security Headers)
- express-mongo-sanitize (NoSQL Injection Prevention)
- cors (Cross-Origin Resource Sharing)
- dotenv (Environment Variables)

### Database
- MongoDB (NoSQL Database)

### External Services
- SendGrid (Email Delivery)
- Stripe (Payment Gateway)
- Render (Deployment Platform)

---

## Complete API Reference

### User Routes (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| GET | `/get-current-user` | Get authenticated user | Yes |
| PATCH | `/forgetpassword` | Send OTP for password reset | No |
| PATCH | `/resetpassword/:email` | Reset password with OTP | No |

### Movie Routes (`/api/movies`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add-movie` | Add new movie | Yes (Admin) |
| GET | `/get-all-movies` | Get all movies | No |
| GET | `/movie/:id` | Get movie by ID | No |
| PUT | `/update-movie` | Update movie | Yes (Admin) |
| DELETE | `/delete-movie` | Delete movie | Yes (Admin) |

### Theatre Routes (`/api/theatres`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add-theatre` | Add new theatre | Yes (Partner) |
| GET | `/get-all-theatres` | Get all theatres | Yes (Admin) |
| GET | `/get-all-theatres-by-owner/:ownerId` | Get owner's theatres | Yes (Partner) |
| PUT | `/update-theatre` | Update theatre | Yes (Partner/Admin) |
| DELETE | `/delete-theatre/:theatreId` | Delete theatre | Yes (Partner) |

### Show Routes (`/api/shows`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add-show` | Add new show | Yes (Partner) |
| PUT | `/update-show` | Update show | Yes (Partner) |
| POST | `/delete-show` | Delete show | Yes (Partner) |
| POST | `/get-all-shows-by-theatre` | Get theatre shows | Yes |
| POST | `/get-all-theatres-by-movie` | Get theatres by movie | No |
| POST | `/get-show-by-id` | Get show details | Yes |

### Booking Routes (`/api/bookings`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/make-payment` | Process Stripe payment | Yes |
| POST | `/book-show` | Create booking | Yes |
| GET | `/get-all-bookings` | Get user's bookings | Yes |

---

## Database Schema Summary

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['admin', 'user', 'partner']),
  otp: String,
  otpExpiry: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Movies Collection
```javascript
{
  _id: ObjectId,
  movieName: String,
  description: String,
  duration: Number,
  genre: String,
  language: String,
  releaseDate: Date,
  poster: String (URL)
}
```

### Theatres Collection
```javascript
{
  _id: ObjectId,
  name: String,
  address: String,
  phone: Number,
  email: String,
  owner: ObjectId (ref: 'users'),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Shows Collection
```javascript
{
  _id: ObjectId,
  name: String,
  date: Date,
  time: String,
  movie: ObjectId (ref: 'movies'),
  ticketPrice: Number,
  totalSeats: Number,
  bookedSeats: Array,
  theatre: ObjectId (ref: 'theatres'),
  createdAt: Date,
  updatedAt: Date
}
```

### Bookings Collection
```javascript
{
  _id: ObjectId,
  show: ObjectId (ref: 'shows'),
  user: ObjectId (ref: 'users'),
  seats: Array,
  transactionId: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Project Structure

```
BookMyShow/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── index.js (axios instance)
│   │   │   ├── users.js
│   │   │   ├── movies.js
│   │   │   ├── theatres.js
│   │   │   ├── shows.js
│   │   │   └── bookings.js
│   │   ├── components/
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   │   ├── index.js
│   │   │   │   ├── SingleMovie.js
│   │   │   │   └── BookShow.js
│   │   │   ├── Login/
│   │   │   │   └── index.js
│   │   │   ├── Register/
│   │   │   │   └── index.js
│   │   │   ├── Admin/
│   │   │   │   ├── index.js
│   │   │   │   ├── MovieList.js
│   │   │   │   ├── MovieForm.js
│   │   │   │   ├── DeleteMovieModal.js
│   │   │   │   └── TheatresTable.js
│   │   │   ├── Partner/
│   │   │   │   ├── index.js
│   │   │   │   ├── TheatreList.js
│   │   │   │   ├── TheatreFormModal.js
│   │   │   │   ├── DeleteTheatreModal.js
│   │   │   │   └── ShowModal.js
│   │   │   └── Profile/
│   │   │       ├── index.js
│   │   │       ├── ForgotPassword.js
│   │   │       └── ResetPassword.js
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   ├── loaderSlice.js
│   │   │   └── userSlice.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── dbconfig.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── movieController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── movieModel.js
│   │   ├── theatreModel.js
│   │   ├── showModel.js
│   │   └── bookingModel.js
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── movieRoute.js
│   │   ├── theatreRoute.js
│   │   ├── showRoute.js
│   │   └── bookingRoute.js
│   ├── utils/
│   │   ├── emailHelper.js
│   │   └── email_templates/
│   │       ├── otp.html
│   │       └── ticketTemplate.html
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Environment Variables

### Server (.env)
```
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/
JWT_SECRET=your_jwt_secret_key
STRIPE_KEY=sk_test_your_stripe_secret_key
SENDGRID_API_KEY=your_sendgrid_api_key
PORT=8082
```

### Client
```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

---

## Key Learning Outcomes

1. **Full-Stack Development**: Complete MERN stack application
2. **Authentication & Authorization**: JWT, role-based access control
3. **State Management**: Redux Toolkit for global state
4. **Payment Integration**: Stripe payment gateway
5. **Email Services**: NodeMailer with SendGrid
6. **Security**: Bcrypt, rate limiting, helmet, input sanitization
7. **Database Design**: MongoDB schemas with relationships
8. **API Design**: RESTful API with proper error handling
9. **Deployment**: Production deployment on Render
10. **UI/UX**: Ant Design components and responsive design

---

## Summary

This BookMyShow clone is a comprehensive full-stack application that demonstrates:
- **User Management**: Registration, login, password reset with OTP
- **Role-Based Access**: Admin, Partner, and User roles with different permissions
- **Movie Management**: CRUD operations for movies (Admin only)
- **Theatre Management**: Partners can add theatres, Admin approves them
- **Show Management**: Partners add shows to approved theatres
- **Booking System**: Users can browse movies, select shows, choose seats, and book tickets
- **Payment Integration**: Secure payment processing with Stripe
- **Email Notifications**: OTP for password reset and ticket confirmation emails
- **Security**: Password hashing, rate limiting, security headers, NoSQL injection prevention
- **Deployment**: Production-ready deployment on Render platform

The project follows best practices for security, scalability, and maintainability, making it an excellent learning resource for MERN stack development.
