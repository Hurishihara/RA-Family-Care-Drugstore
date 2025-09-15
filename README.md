# RA-Family-Care-Drugstore

A comprehensive pharmacy management system built with React, TypeScript, and Express.js that helps manage inventory, orders, and sales for the RA Family Care Drugstore.

# Features

- **Inventory Management:** Track and manage product stock.
- **Order Tracking:** Monitor and view sales orders.
- **User Management:** Control user roles and permissions, with a dedicated audit log (currently in development).
- **Interactive Dashboards:** Visualize key metrics, such as total orders and revenue distribution, using dynamic charts.
- **User Authentication:** Secure login system with role-based access (Admin/Staff)
- **Role-based Permissions:** Different access levels for Admin and Staff users

# Technologies Used

This project is built with a modern web development stack to ensure a fast, efficient, and scalable application.

# Frontend

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite:** A fast build tool that provides a hot-reloading development server.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Shadcn/UI:** A collection of reusable components built with Radix UI and Tailwind CSS.
- **React Router:** A standard library for routing in React.
- **Zod & React Hook Form:** A combination for form validation.
- **Axios:** A promise-based HTTP client for making API requests from the frontend to the backend server.

# Backend
- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js, used to build the RESTful API.
- **PostgreSQL:** Powerful open-source relational database system for storing and managing application data.
- **bcrypt:** Library for hashing passwords securely.
- **JSON Web Token:** Standard for securely transmitting information between parties as a JSON object, used for authentication.
- **CORS:** Middleware for enabling Cross-Origin Resource Sharing between frontend and backend.
- **node-postgres:** A robust PostgreSQL client for Node.js, used to interact with the PostgreSQL database, execute queries, and manage connections efficiently.

# Project Structure

RA-Family-Care-Drugstore/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (auth, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Application pages
│   │   ├── charts/         # Data visualization components
│   │   ├── inventory/      # Inventory-related components
│   │   ├── orders/         # Order-related components
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Express.js backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── db/            # Database models and connection
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   └── package.json
└── README.md

# Getting started

**Prerequisites**

1. **Node.js (v18 or higher) and npm:** Make sure you have Node.js and npm (or yarn/pnpm) installed on your machine.
2. **PostgreSQL:** You must have a PostgreSQL database installed and running on your system.

**Installation**

1. Clone the repository:

```bash
git clone https://github.com/Hurishihara/RA-Family-Care-Drugstore.git
cd RA-Family-Care-Drugstore
```

2. Set up the backend:

```bash
# Change directory and install dependencies
cd server && npm install

# Create a .env file with your database credentials and your JWT Secret
echo DATABASE_URL=postgresql://your_username:your_password@your_uri/your_database_name > .env
echo JWT_SECRET=your_jwt_secret_here >> .env

# Initialize the database with tables
npm run init-db 

# Start the backend development server
npm run dev
```

3. Set up the frontend:

**Create another terminal in VSCode (Ctrl + Shift + `) in windows**

```bash
# Change directory and install dependencies
cd RA-Family-Care-Drugstore/client && npm install

# Start the frontend development server
npm run dev
```

4. Access the application

- Frontend: http://localhost:5173
- Backend: http://localhost:3000 

# Usage

**Inventory Management**

- View all medications in stock
- Add new medications with details (name, category, quantity, pricing)
- Edit existing medication information
- Track expiration dates and restock needs

**Order Processing**

- Create new customer orders
- Select medications and quantities
- Process payments via Cash or GCash
- View order history and details

**Analytics Dashboard**

- Monitor daily, weekly, and monthly order trends
- Track revenue by payment method
- View percentage changes compared to previous periods

# Authentication & Authorization

The application uses JWT-based authentication with role-based access control:

- **Admin:** Full access to all features including user management
- **Staff:** Limited to viewing inventory and processing orders

# UI/UX Features

- **Custom Design System:** Deep sage green color palette with clean typography
- **Responsive Sidebar:** Collapsible navigation with permission-based menu items
- **Data Tables:** Sortable, filterable tables with pagination
- **Modals & Sheets:** Contextual forms for creating/editing records
- **Toast Notifications:** User feedback for actions
- **Charts & Analytics:** Visual data representation with ShadCN Charts

# Note

This application is designed for internal use by RA Family Care Drugstore. Unauthorized use or distribution is prohibited.