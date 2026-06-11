# SmartHire AI - Full Stack Setup Guide

## Project Structure

This is a full-stack application with:
- **Frontend**: React with React Router, Axios, and modern UI
- **Backend**: Express.js with MongoDB and OpenAI integration

## Frontend Setup

### 1. Install Dependencies

```bash
cd client
npm install
```

This will install:
- `react-router-dom` - For client-side routing
- `axios` - For API calls
- `react` & `react-dom` - React framework

### 2. Environment Configuration

Create a `.env` file in the client folder:

```
REACT_APP_API_URL=http://localhost:5000
```

### 3. Start Frontend Development Server

```bash
npm start
```

The app will run on `http://localhost:3000`

## Backend Setup

### 1. Project Structure

Create the backend folder structure:

```
backend/
├── models/
│   ├── User.js
│   └── Resume.js
├── routes/
│   ├── authRoutes.js
│   ├── aiRoutes.js
│   └── resumeRoutes.js
├── controllers/
│   └── aiController.js
├── middleware/
│   └── authMiddleware.js
├── .env
└── server.js
```

### 2. Install Backend Dependencies

```bash
cd ../backend
npm init -y
npm install express mongoose cors dotenv bcrypt jsonwebtoken axios
```

### 3. Environment Configuration

Create a `.env` file in the backend folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/smarthire
OPENAI_KEY=your_openai_api_key_here
JWT_SECRET=your_secret_key_here
PORT=5000
```

**Note**: Replace `your_openai_api_key_here` with your actual OpenAI API key from https://platform.openai.com/api-keys

### 4. MongoDB Setup

Make sure MongoDB is running:

**Windows:**
```bash
# Using MongoDB Community
mongod
```

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Create Backend Files

#### server.js
```javascript
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/resume", resumeRoutes);

// mongo connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
```

#### models/User.js
```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
```

#### models/Resume.js
```javascript
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: String,
  text: String,
  aiResult: String,
  atsScore: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Resume", resumeSchema);
```

#### routes/authRoutes.js
```javascript
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secretkey");

    res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secretkey");

    res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
```

#### routes/aiRoutes.js
```javascript
import express from "express";
import { analyzeResume, evaluateInterview } from "../controllers/aiController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/resume-analyze", authMiddleware, analyzeResume);
router.post("/evaluate-interview", authMiddleware, evaluateInterview);

export default router;
```

#### controllers/aiController.js
```javascript
import axios from "axios";
import Resume from "../models/Resume.js";

export const analyzeResume = async (req, res) => {
  try {
    const { resumeText, userId } = req.body;

    if (!resumeText || !userId) {
      return res.status(400).json({ message: "Resume text and user ID are required" });
    }

    const prompt = `
You are an expert HR AI recruiter.

Analyze this resume and provide:
1. ATS Score (0-100)
2. Top 3 Strengths
3. Top 3 Weaknesses
4. Missing Skills that would improve candidacy
5. 5 Interview Questions tailored to the resume

Format the response clearly with sections.

Resume:
${resumeText}
`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: \`Bearer \${process.env.OPENAI_KEY}\`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data.choices[0].message.content;

    // Extract ATS score from response (optional)
    const atsScoreMatch = result.match(/\\d{1,3}(?=\\s*\\/\\s*100)/);
    const atsScore = atsScoreMatch ? parseInt(atsScoreMatch[0]) : 75;

    // Save in DB
    const saved = await Resume.create({
      userId,
      text: resumeText,
      aiResult: result,
      atsScore,
    });

    res.json({ result, saved, atsScore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Error analyzing resume" });
  }
};

export const evaluateInterview = async (req, res) => {
  try {
    const { question, answer, userId } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }

    const prompt = `
You are an expert interview coach.

The candidate answered the following question:
Question: ${question}

Answer: ${answer}

Provide constructive feedback including:
1. Strengths in the answer
2. Areas for improvement
3. What would make this answer better
4. A score out of 10

Be encouraging but honest.
`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800,
      },
      {
        headers: {
          Authorization: \`Bearer \${process.env.OPENAI_KEY}\`,
          "Content-Type": "application/json",
        },
      }
    );

    const feedback = response.data.choices[0].message.content;

    res.json({ feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Error evaluating interview" });
  }
};
```

#### middleware/authMiddleware.js
```javascript
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
```

#### routes/resumeRoutes.js
```javascript
import express from "express";
import Resume from "../models/Resume.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user's resume history
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single resume
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
```

### 6. Update package.json for backend

Create `package.json` in backend folder:

```json
{
  "name": "smarthire-backend",
  "version": "1.0.0",
  "type": "module",
  "description": "SmartHire AI Backend",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.1.2",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

### 7. Start Backend Server

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## API Endpoints

### Auth Routes
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user

### AI Routes
- **POST** `/api/ai/resume-analyze` - Analyze resume with AI (protected)
- **POST** `/api/ai/evaluate-interview` - Get interview feedback (protected)

### Resume Routes
- **GET** `/api/resume/history` - Get user's resume history (protected)
- **GET** `/api/resume/:id` - Get specific resume (protected)

## Features

✅ User authentication (register, login)
✅ AI-powered resume analysis
✅ ATS score calculation
✅ Interview practice with AI feedback
✅ Resume history tracking
✅ Beautiful gradient UI
✅ Responsive design
✅ Protected routes

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check MONGO_URI in .env file

### OpenAI API Error
- Verify OpenAI API key is correct
- Check API key has credits
- Use gpt-3.5-turbo if gpt-4o-mini is not available

### CORS Errors
- Make sure backend has CORS enabled
- Check API_BASE_URL in frontend .env

## Running Both Servers

Terminal 1 (Frontend):
```bash
cd client
npm start
```

Terminal 2 (Backend):
```bash
cd backend
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Next Steps

1. ✅ Set up frontend with beautiful UI
2. ✅ Create backend API structure
3. ⏳ Deploy to production (Heroku, Vercel, etc.)
4. ⏳ Add more interview questions database
5. ⏳ Add user profile customization
6. ⏳ Add email notifications
7. ⏳ Add file upload for resumes

Enjoy using SmartHire AI! 🚀
