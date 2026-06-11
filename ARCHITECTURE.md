# SmartHire AI - Architecture & Data Flow

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│                   (http://localhost:3000)                        │
└─────────────────────────────────────────────────────────────────┘
                            ▲
                            │
                            │ HTTP/REST
                            │
         ┌──────────────────┴──────────────────┐
         │                                      │
    ┌────▼────────────────┐          ┌────────▼──────────┐
    │   REACT FRONTEND    │          │   EXPRESS BACKEND  │
    │   Port: 3000        │◄────────►│   Port: 5000       │
    └────┬────────────────┘          └────────┬──────────┘
         │                                    │
         │                                    │
    ┌────▼─────────────────────┐   ┌────────▼──────────┐
    │  Client-side Routing      │   │  REST API Routes  │
    │  • React Router v6        │   │  • Auth (register │
    │  • Protected Routes       │   │  • AI analysis    │
    │  • AuthContext            │   │  • Resume history │
    │                           │   └──────┬───────────┘
    │  Components:              │          │
    │  • Authentication         │          │
    │  • Resume Upload          │    ┌─────▼──────────┐
    │  • Interview Practice     │    │    MongoDB      │
    │  • Dashboard              │    │    Database     │
    └───────────────────────────┘    │                │
                                     │  Collections:  │
                                     │  • users       │
                                     │  • resumes     │
                                     └────────────────┘
```

## 📊 Data Flow Diagram

### Authentication Flow
```
User Registration/Login
         │
         ▼
    ┌─────────────┐
    │   Frontend  │
    │  Login Form │
    └──────┬──────┘
           │ POST /api/auth/register or login
           ▼
    ┌─────────────────┐
    │   Backend API   │
    │  authRoutes.js  │
    └──────┬──────────┘
           │ Hash password with bcrypt
           ▼
    ┌──────────────┐
    │  MongoDB     │
    │  User Model  │
    └──────┬───────┘
           │ Store user data
           ▼
    ┌──────────────────────┐
    │  Generate JWT Token  │
    │  jwt.sign()          │
    └──────┬───────────────┘
           │ Return token + user data
           ▼
    ┌────────────────────────┐
    │  Frontend              │
    │  Store in localStorage │
    │  Set AuthContext state │
    └────────────────────────┘
```

### Resume Analysis Flow
```
User Uploads Resume
         │
         ▼
    ┌──────────────────┐
    │   Frontend       │
    │  UploadResume.jsx│
    └────────┬─────────┘
             │ POST /api/ai/resume-analyze
             │ (with JWT token)
             ▼
    ┌────────────────────────┐
    │  Backend API           │
    │  aiRoutes + Controller │
    │  authMiddleware checks │
    │  JWT token validity    │
    └────────┬───────────────┘
             │
             ▼
    ┌──────────────────────────┐
    │  OpenAI API Call         │
    │  gpt-4o-mini model       │
    │  Send resume + prompt    │
    └──────┬───────────────────┘
           │ AI Analysis (ATS, strengths, weaknesses, etc.)
           ▼
    ┌──────────────────┐
    │  Backend         │
    │  Parse response  │
    │  Save to MongoDB │
    └────────┬─────────┘
             │ Return analysis results
             ▼
    ┌──────────────────────┐
    │  Frontend            │
    │  Display results     │
    │  Update state        │
    └──────────────────────┘
```

### Interview Practice Flow
```
User Answers Interview Question
         │
         ▼
    ┌──────────────────┐
    │   Frontend       │
    │  Interview.jsx   │
    └────────┬─────────┘
             │ POST /api/ai/evaluate-interview
             │ (question + answer + token)
             ▼
    ┌────────────────────────┐
    │  Backend API           │
    │  aiRoutes + Controller │
    │  authMiddleware        │
    └────────┬───────────────┘
             │
             ▼
    ┌──────────────────────────┐
    │  OpenAI API Call         │
    │  Send question + answer  │
    │  Request AI feedback     │
    └──────┬───────────────────┘
           │ AI Evaluation (strengths, improvements, score)
           ▼
    ┌──────────────────┐
    │  Backend         │
    │  Return feedback │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────────┐
    │  Frontend            │
    │  Display feedback    │
    │  Next question ready │
    └──────────────────────┘
```

## 🗂️ File Organization

### Frontend Structure
```
src/
├── pages/                    # Full-page components
│   ├── Home.jsx            # Public landing page
│   ├── Login.jsx           # Public login
│   ├── Signup.jsx          # Public registration
│   ├── UploadResume.jsx    # Protected resume analyzer
│   ├── Dashboard.jsx       # Protected user dashboard
│   ├── Interview.jsx       # Protected interview practice
│   └── *.css               # Page-specific styles
│
├── components/              # Reusable components
│   └── ProtectedRoute.jsx  # Route guard component
│
├── context/                # State management
│   └── AuthContext.jsx     # Authentication state (user, login, logout)
│
├── utils/                  # Helper functions
│   └── config.js           # API base URL config
│
├── App.jsx                 # Main routing component
├── index.jsx               # Entry point with AuthProvider
└── index.css               # Global styles
```

### Backend Structure
```
backend/
├── models/
│   ├── User.js            # User schema (name, email, password)
│   └── Resume.js          # Resume schema (userId, text, aiResult, atsScore)
│
├── routes/
│   ├── authRoutes.js      # POST /register, /login
│   ├── aiRoutes.js        # POST /resume-analyze, /evaluate-interview
│   └── resumeRoutes.js    # GET /history, /id
│
├── controllers/
│   └── aiController.js    # Business logic for AI operations
│
├── middleware/
│   └── authMiddleware.js  # JWT verification middleware
│
├── .env                   # Environment variables
├── server.js              # Express app setup & MongoDB connection
└── package.json           # Dependencies & scripts
```

## 🔐 Security Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    REQUEST AUTHENTICATION                    │
└─────────────────────────────────────────────────────────────┘

1. USER LOGIN
   └─ Backend generates JWT token with user._id
   └─ Frontend stores in localStorage
   └─ Sent with every API request in Authorization header

2. REQUEST WITH TOKEN
   Frontend: GET /api/ai/resume-analyze
   Header: Authorization: JWT_TOKEN
   └─ Backend middleware checks token
   └─ Middleware verifies signature
   └─ Extracts userId from token
   └─ Attaches to req.user
   └─ Route handler executes with authentication

3. PROTECTED ROUTES
   Frontend: ProtectedRoute wrapper
   └─ Checks if user exists in AuthContext
   └─ If no user → redirect to /login
   └─ If user exists → show component

4. TOKEN EXPIRY (Optional)
   └─ Can implement token refresh
   └─ Refresh tokens for extended sessions
```

## 📡 API Contract

### Request/Response Format

```
POST /api/auth/login
Request:
{
  "email": "user@example.com",
  "password": "password123"
}
Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

POST /api/ai/resume-analyze
Request (with Authorization header):
{
  "resumeText": "John Doe...",
  "userId": "507f1f77bcf86cd799439011"
}
Response:
{
  "result": "ATS Score: 82/100\nStrengths:\n...",
  "atsScore": 82,
  "saved": { "_id": "...", "userId": "...", ... }
}
```

## 🔄 State Management

### Frontend State (AuthContext)
```javascript
{
  user: {
    _id: "...",
    name: "...",
    email: "..."
  } | null,
  loading: boolean,
  login: (userData, token) => void,
  logout: () => void
}
```

### Component State (useState)
```javascript
// UploadResume.jsx
- text: string (resume content)
- result: string (AI analysis)
- loading: boolean
- error: string

// Interview.jsx
- currentQuestion: string
- answer: string
- feedback: string
- questionIndex: number
- showFeedback: boolean
```

## 🎯 Event Flow

### User Journey
```
1. User lands on / (Home)
   └─ AuthContext loads user from localStorage
   └─ If no user, show "Get Started" button

2. User clicks "Get Started"
   └─ Redirect to /login

3. User fills login form
   └─ Call POST /api/auth/login
   └─ Receive token
   └─ Save to localStorage
   └─ Update AuthContext
   └─ Redirect to /dashboard

4. From Dashboard, user can:
   └─ /upload → Upload & analyze resume
   └─ /interview → Practice interviews
   └─ Click logout → Clear localStorage & AuthContext

5. User navigates between pages
   └─ Protected routes check AuthContext
   └─ If not authenticated → redirect to /login
   └─ If authenticated → show component
```

## 📈 Scalability Considerations

```
Current Setup:
└─ MongoDB single instance
└─ Express single process
└─ Frontend static files

Future Scaling:
├─ Database
│  └─ MongoDB replica set for redundancy
│  └─ Database indexing for queries
│  └─ Connection pooling
│
├─ Backend
│  └─ Multiple Express instances
│  └─ Load balancer (Nginx)
│  └─ Horizontal scaling with Docker
│  └─ Caching layer (Redis)
│
└─ Frontend
   └─ CDN for static assets
   └─ Code splitting & lazy loading
   └─ Service workers for offline
```

## 🧪 Testing Architecture

```
Frontend Testing:
├─ Unit Tests
│  └─ Components with React Testing Library
│  └─ Context providers
│  └─ Utility functions
│
├─ Integration Tests
│  └─ Auth flow
│  └─ API calls with mock server
│  └─ Navigation & routing
│
└─ E2E Tests
   └─ Cypress or Playwright
   └─ Full user journeys
   └─ Real API calls

Backend Testing:
├─ Unit Tests
│  └─ Middleware functions
│  └─ Controllers logic
│  └─ Models & validation
│
├─ Integration Tests
│  └─ API endpoints
│  └─ Database operations
│  └─ Authentication flow
│
└─ Load Tests
   └─ Concurrent API calls
   └─ Performance benchmarks
```

---

This architecture ensures:
✅ Separation of concerns
✅ Security with JWT tokens
✅ Scalability for growth
✅ Clean code organization
✅ Easy testing & debugging
✅ Protected user data
✅ Efficient API communication
