# SmartHire AI - Installation & Running Checklist

## 📋 Pre-Installation Checklist

- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB running locally or connection string ready
- [ ] OpenAI API key obtained (https://platform.openai.com/api-keys)
- [ ] Code editor (VS Code recommended)

---

## 🎯 Frontend Setup Checklist

### Step 1: Install Dependencies
- [ ] Navigate to `client` folder
- [ ] Run `npm install`
- [ ] Wait for all packages to install
- [ ] Check for no major errors

### Step 2: Environment Configuration
- [ ] Create `.env` file in client folder
- [ ] Add `REACT_APP_API_URL=http://localhost:5000`
- [ ] Save the file

### Step 3: Verify Installation
- [ ] Check `node_modules` folder exists
- [ ] Check `package-lock.json` exists
- [ ] All dependencies installed without errors

### Step 4: Start Development Server
- [ ] Run `npm start`
- [ ] Wait for compilation
- [ ] Browser opens to `http://localhost:3000`
- [ ] See home page loads successfully

### Step 5: Test Frontend Features
- [ ] Navigate to home page (/)
- [ ] Click "Get Started" button
- [ ] Redirects to login page
- [ ] Check "Sign Up" link works
- [ ] Verify responsive design on mobile view

---

## 🔧 Backend Setup Checklist

### Step 1: Create Backend Folder
- [ ] Create `backend` folder in root
- [ ] Navigate into backend folder

### Step 2: Initialize Backend
- [ ] Run `npm init -y`
- [ ] Create `package.json`
- [ ] Update package.json with scripts

### Step 3: Install Dependencies
- [ ] Run `npm install express mongoose cors dotenv bcrypt jsonwebtoken axios`
- [ ] Run `npm install --save-dev nodemon`
- [ ] Check all packages installed

### Step 4: Create Folder Structure
- [ ] Create `models` folder
- [ ] Create `routes` folder
- [ ] Create `controllers` folder
- [ ] Create `middleware` folder

### Step 5: Create Files
- [ ] Create `.env` file with:
  - [ ] `MONGO_URI=mongodb://127.0.0.1:27017/smarthire`
  - [ ] `OPENAI_KEY=your_key_here`
  - [ ] `JWT_SECRET=your_secret_here`
  - [ ] `PORT=5000`
- [ ] Create `server.js` - main server file
- [ ] Create models (User.js, Resume.js)
- [ ] Create routes (authRoutes.js, aiRoutes.js, resumeRoutes.js)
- [ ] Create controller (aiController.js)
- [ ] Create middleware (authMiddleware.js)

### Step 6: Start MongoDB
- [ ] Windows: `mongod` in cmd
- [ ] Mac: `brew services start mongodb-community`
- [ ] Docker: `docker run -d -p 27017:27017 --name mongodb mongo:latest`
- [ ] Verify MongoDB is running on port 27017

### Step 7: Start Backend Server
- [ ] Run `npm run dev`
- [ ] Check console shows "Server running on port 5000"
- [ ] Check "MongoDB Connected" message

### Step 8: Test Backend API
- [ ] Use Postman or Thunder Client
- [ ] Test `POST /api/auth/register` with sample data
- [ ] Test `POST /api/auth/login`
- [ ] Check responses are correct

---

## 🔗 Integration Testing Checklist

### Frontend-Backend Connection
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Frontend `.env` has correct `REACT_APP_API_URL`

### Test Authentication Flow
- [ ] Open frontend homepage
- [ ] Click "Get Started"
- [ ] Click "Sign Up" link
- [ ] Fill in signup form
- [ ] Submit form
- [ ] User created in MongoDB
- [ ] Token received and stored in localStorage
- [ ] Redirected to dashboard

### Test Resume Analyzer
- [ ] Navigate to "/upload"
- [ ] Paste sample resume text
- [ ] Click "Analyze with AI"
- [ ] Wait for API response
- [ ] See AI analysis results

### Test Interview Practice
- [ ] Navigate to "/interview"
- [ ] Answer sample question
- [ ] Click "Submit Answer"
- [ ] Receive AI feedback
- [ ] Test "Next Question" button

---

## ✅ Final Verification Checklist

### Frontend
- [ ] App loads at `http://localhost:3000`
- [ ] Home page displays correctly
- [ ] Navigation works
- [ ] Pages load without console errors
- [ ] UI is responsive on mobile

### Backend
- [ ] Server running on port 5000
- [ ] MongoDB connected
- [ ] API endpoints responding
- [ ] CORS enabled
- [ ] No server errors in console

### Authentication
- [ ] Can register new user
- [ ] Can login existing user
- [ ] JWT token stored in localStorage
- [ ] Protected routes work
- [ ] Logout works

### AI Features
- [ ] Resume analysis returns results
- [ ] Interview feedback displays
- [ ] API calls have auth tokens
- [ ] Error handling works

### UI/UX
- [ ] Beautiful gradient design visible
- [ ] Buttons are clickable and responsive
- [ ] Forms submit data correctly
- [ ] Loading states display
- [ ] Error messages show

---

## 📱 Browser Testing Checklist

Test in multiple browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## 🎯 Performance Checklist

- [ ] Page loads within 3 seconds
- [ ] No console errors or warnings
- [ ] No memory leaks visible
- [ ] Smooth animations
- [ ] Responsive to user input
- [ ] API calls complete quickly

---

## 📊 Common Issues & Solutions

### Port Already in Use
```bash
# Find process using port
lsof -i :3000        # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill process or use different port
PORT=3001 npm start
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod
# or
docker ps  # Check docker containers
```

### API Not Connecting
- [ ] Backend server running on 5000
- [ ] .env file has correct URL
- [ ] CORS enabled in backend
- [ ] Network tab shows requests failing?

### Token Issues
- [ ] Check localStorage has token
- [ ] Verify token format
- [ ] Check JWT_SECRET matches

---

## 🚀 Ready to Go!

Once all checklists are complete:
1. Open `http://localhost:3000`
2. Create test account
3. Upload resume
4. Try interview practice
5. Explore dashboard

Enjoy using SmartHire AI! 🎉

---

## 📞 Quick Commands Reference

```bash
# Frontend
cd client
npm install        # Install dependencies
npm start          # Start dev server
npm build          # Create production build
npm test           # Run tests

# Backend
cd backend
npm install        # Install dependencies
npm run dev        # Start with nodemon
npm start          # Start without nodemon

# MongoDB
mongod             # Start MongoDB
mongo              # Connect to MongoDB shell
```

---

## 📝 Notes

- [ ] Created backend following all instructions
- [ ] All environment variables set correctly
- [ ] OpenAI API key is valid and has credits
- [ ] MongoDB is accessible
- [ ] No sensitive data in version control

---

**Last Updated**: June 2026
**Status**: Ready for Setup
