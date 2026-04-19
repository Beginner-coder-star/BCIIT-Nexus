# BCIIT-Nexus

A comprehensive alumni management system for BCIIT (Bengal College of Engineering and Technology), built with modern web technologies.

## Features

- **Admin Panel**: Manage alumni, events, and gallery content
- **User Frontend**: Alumni directory, event listings, and gallery
- **Backend API**: RESTful API with authentication and data management
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Image Upload**: Cloudinary integration for media management
- **Authentication**: Secure login for admins and users

## Tech Stack

### Frontend (User)
- React + Vite
- Tailwind CSS
- Firebase Hosting

### Admin Panel
- React + Vite
- Tailwind CSS

### Backend
- Node.js + Express
- MongoDB
- Cloudinary (for image uploads)
- JWT Authentication

## Project Structure

```
BCIIT-Nexus/
├── admin/          # Admin panel (React)
├── frontend/       # User-facing website (React)
├── backend/        # API server (Node.js)
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Beginner-coder-star/BCIIT-Nexus.git
   cd BCIIT-Nexus
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with required environment variables
   npm start
   ```

3. **Admin Panel Setup**
   ```bash
   cd ../admin
   npm install
   npm run dev
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the backend directory with:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.