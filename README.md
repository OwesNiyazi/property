# PropertyHub - Property Listing Application

A full-stack property listing application built with React, Node.js, Express, and MongoDB. Users can list, view, edit, and manage property listings with image uploads.

## 🚀 Features

### Frontend (React + TypeScript)
- **Modern UI** with Tailwind CSS and shadcn/ui components
- **Responsive Design** that works on all devices
- **User Authentication** with login/signup functionality
- **Property Management** - Add, edit, delete, and view properties
- **Image Upload** - Support for up to 5 images per property
- **Protected Routes** - Secure access to user-specific features
- **Real-time Updates** - Instant feedback with toast notifications

### Backend (Node.js + Express)
- **RESTful API** with proper error handling
- **MongoDB Integration** with Mongoose ODM
- **File Upload** with Multer for image handling
- **User Authentication** with simple email/password system
- **CRUD Operations** for property management
- **Static File Serving** for uploaded images

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful components
- **React Router** for navigation
- **React Query** for data fetching
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **Multer** for file uploads
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/OwesNiyazi/property.git
cd property
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 3. Environment Setup

#### Backend Environment
Create a `.env` file in the `backend` folder:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

#### MongoDB Setup
1. **Local MongoDB**: Install and start MongoDB locally
2. **MongoDB Atlas**: 
   - Create a free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
   - Get your connection string
   - Add your IP to the whitelist

### 4. Start the Application

#### Start Backend Server
```bash
cd backend
npm start
```

#### Start Frontend Development Server
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000

## 🎯 Usage

### 1. User Registration/Login
- Navigate to the signup page to create an account
- Use your email and password to login
- Your name will be displayed in the navbar

### 2. Property Management
- **Add Property**: Click "Add Property" to create new listings
- **View Properties**: Browse all properties on the home page
- **My Listings**: View and manage your own properties
- **Edit Property**: Update property details and images
- **Delete Property**: Remove properties from your listings

### 3. Image Upload
- Upload up to 5 images per property
- Drag and drop or click to select files
- Remove images by hovering and clicking the X button
- First image becomes the main property image

## 📁 Project Structure

```
property/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── Navbar.tsx    # Navigation component
│   ├── pages/            # Page components
│   │   ├── Home.tsx      # Home page
│   │   ├── Login.tsx     # Login page
│   │   ├── Signup.tsx    # Signup page
│   │   ├── AddProperty.tsx # Add property form
│   │   ├── EditProperty.tsx # Edit property form
│   │   └── MyListings.tsx # User's properties
│   ├── lib/              # Utility functions
│   │   └── api.ts        # API functions
│   └── hooks/            # Custom React hooks
├── backend/              # Backend source code
│   ├── routes/           # API routes
│   │   ├── auth.js       # Authentication routes
│   │   └── properties.js # Property routes
│   ├── models/           # MongoDB models
│   │   ├── User.js       # User model
│   │   └── Property.js   # Property model
│   ├── middleware/       # Express middleware
│   ├── uploads/          # Uploaded images
│   └── server.js         # Main server file
├── public/               # Static assets
└── package.json          # Frontend dependencies
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

## 🎨 Features in Detail

### User Authentication
- Simple email/password authentication
- User data stored in localStorage
- Protected routes for authenticated users
- Automatic redirect to login for unauthenticated users

### Property Listing
- Complete property details (title, description, price, type, location)
- Property specifications (bedrooms, bathrooms, area)
- Multiple image uploads with preview
- Property type selection from predefined options

### Image Management
- Upload up to 5 images per property
- Drag and drop functionality
- Image preview before upload
- Remove individual images
- Automatic main image designation

### Responsive Design
- Mobile-first approach
- Beautiful gradient backgrounds
- Modern card-based layouts
- Consistent spacing and typography

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages

### Backend Deployment
The backend can be deployed to:
- Heroku
- Railway
- DigitalOcean
- AWS

### Environment Variables
Make sure to set the following environment variables in production:
- `MONGO_URI` - Your MongoDB connection string
- `PORT` - Server port (optional, defaults to 5000)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Owes Niyazi**
- GitHub: [@OwesNiyazi](https://github.com/OwesNiyazi)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Lucide React](https://lucide.dev/) for icons
- [MongoDB Atlas](https://cloud.mongodb.com/) for database hosting

---

⭐ **Star this repository if you found it helpful!**
