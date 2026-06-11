yr # SmartHire AI - Frontend

A modern React application for AI-powered recruitment and interview practice.

## Features

🚀 **User Authentication** - Secure register and login system
📄 **Resume Analysis** - AI-powered resume analysis with ATS scoring
🎤 **Interview Practice** - Practice with AI-generated interview questions
📊 **Dashboard** - Track your analysis history and statistics
🎨 **Beautiful UI** - Modern gradient design with smooth animations
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## Tech Stack

- **React 19** - Latest React framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and animations
- **JavaScript ES6+** - Modern JavaScript features

## Project Structure

```
src/
├── pages/               # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Login page
│   ├── Signup.jsx      # Registration page
│   ├── UploadResume.jsx    # Resume upload & analysis
│   ├── Dashboard.jsx   # User dashboard
│   ├── Interview.jsx   # Interview practice
│   └── *.css          # Page styles
├── components/         # Reusable components
│   └── ProtectedRoute.jsx  # Protected route wrapper
├── context/           # React context
│   └── AuthContext.jsx    # Authentication context
├── utils/             # Utility functions
│   └── config.js      # API configuration
├── App.jsx           # Main app component
├── index.jsx         # Entry point
└── index.css         # Global styles
```

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Create `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## Pages

### Home (/)
- Landing page with feature highlights
- Navigation to other pages
- User profile display

### Login (/login)
- Email and password login
- Form validation
- Error handling

### Signup (/signup)
- User registration
- Password confirmation
- Email validation

### Upload Resume (/upload)
- Paste resume text
- AI analysis
- ATS score display
- Detailed feedback

### Dashboard (/dashboard)
- User statistics
- Analysis history
- Recent submissions

### Interview (/interview)
- Practice interview questions
- AI feedback on answers
- Progress tracking

## Authentication

The app uses JWT tokens for authentication:
- Tokens are stored in localStorage
- Protected routes redirect to login if not authenticated
- User data persists across page reloads

## API Integration

The frontend communicates with the backend API at `http://localhost:5000`:

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/ai/resume-analyze` - Analyze resume
- `POST /api/ai/evaluate-interview` - Get interview feedback

## Styling

All styles are in CSS with:
- Gradient backgrounds
- Smooth transitions
- Mobile-responsive design
- Accessible color contrast
- Interactive hover effects

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Dependencies

```json
{
  "react": "^19.2.7",
  "react-dom": "^19.2.7",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.0"
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] File upload for resumes
- [ ] PDF resume parsing
- [ ] Advanced analytics
- [ ] Team management
- [ ] Email notifications
- [ ] Dark mode
- [ ] Multi-language support

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
PORT=3001 npm start
```

### API Connection Error
Make sure backend is running on `http://localhost:5000`

### CORS Errors
Check that backend has CORS enabled

## Contributing

Feel free to fork and submit pull requests!

## License

MIT License

## Support

For issues or questions, create a GitHub issue.

---

**Built with ❤️ using React and modern web technologies**
