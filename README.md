# FeedingMinds Charity Website

A modern charity website utilizing Tailwind CSS with MongoDB integration for dynamic project management.

## 🚀 Features

- **HTML5 & Tailwind CSS** - Modern responsive design with utility-first CSS
- **MongoDB Integration** - Dynamic content management for projects
- **Admin Dashboard** - Secure admin interface for content management
- **Project Management** - Add, edit, delete, and reorder projects
- **Image Upload** - Upload and manage project images
- **Categorization** - Organize projects by categories and subcategories
- **Authentication** - Secure JWT-based authentication for admin access

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB installation)

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Initialize the database with default admin user:
```bash
node scripts/init-db.js
```
This will create a default admin user with the following credentials:
- Username: admin
- Password: feedingminds2023

**Important:** Change this password after first login for security reasons.

3. Start the server:
```bash
node server.js
```

4. Access the website:
- Main website: http://localhost:3000
- Admin dashboard: http://localhost:3000/pages/admin.html

## 🚀 Deployment on Vercel

1. Install Vercel CLI (optional):
```bash
npm install -g vercel
```

2. Configure environment variables in Vercel:
   - MONGODB_URI: Your MongoDB connection string
   - JWT_SECRET: Your JWT secret key

3. Deploy using Vercel CLI:
```bash
vercel
```

Or deploy directly from the Vercel dashboard:
1. Import your GitHub repository
2. Configure the project settings
3. Add the required environment variables
4. Deploy

## 📁 Project Structure

```
feedingminds/
├── assets/            # Images and static assets
├── css/               # CSS stylesheets
├── models/            # MongoDB models
│   ├── Project.js     # Project model
│   └── User.js        # User model
├── middleware/        # Express middleware
│   └── auth.js        # Authentication middleware
├── pages/             # HTML pages
│   ├── admin.html     # Admin dashboard
│   └── projects.html  # Projects page
├── public/            # Public assets and scripts
│   └── projects-loader.js  # Script to load projects dynamically
├── routes/            # API routes
│   ├── auth.js        # Authentication routes
│   └── projects.js    # Project management routes
├── scripts/           # Utility scripts
│   └── init-db.js     # Database initialization script
├── .env               # Environment variables
├── package.json       # Project dependencies and scripts
├── server.js          # Express server
└── README.md          # Project documentation
```

## 🔐 Admin Dashboard

The admin dashboard allows authorized users to:

1. Add new projects with images, descriptions, and categories
2. Edit existing projects
3. Delete projects
4. Reorder projects to control display order
5. Filter and search projects

Access the admin dashboard at: http://localhost:3000/pages/admin.html

## 🔒 Security Notes

- The admin page is not linked from the main navigation to prevent unauthorized access attempts
- JWT authentication is used to secure admin routes
- File uploads are restricted to images only
- Input validation is implemented on both client and server sides


## 🧩 Customization

To customize the Tailwind configuration, edit the `tailwind.config.js` file:


## 📦 Build for Production

Build the CSS for production:

```bash
npm run build:css
# or
yarn build:css
```

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints:

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by HTML and Tailwind CSS

Built with ❤️ on Rocket.new
