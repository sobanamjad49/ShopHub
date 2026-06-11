#!/bin/bash

# SmartHire AI - Quick Start Script

echo "🚀 SmartHire AI - Quick Start"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Create .env file in client folder:"
echo "   REACT_APP_API_URL=http://localhost:5000"
echo ""
echo "2. Start the development server:"
echo "   npm start"
echo ""
echo "3. Set up the backend in a separate terminal:"
echo "   - Follow the setup guide in SETUP_GUIDE.md"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "Happy coding! 🎉"
