# BookNest

## Team Members

| **ID**       | **Name**                | **Email**                          | **Role**            |
|--------------|-------------------------|------------------------------------|---------------------|
| 20220104008  | **MD. Zannatun Nayeem** | elmannayeem1@gmail.com             | Frontend & Backend  |
| 20220104009  | **Md. Tanjir Rahman**   | tanjir238@gmail.com                | Frontend & Backend  |
| 20220104011  | **Arkanullah Saad**     | arkanullah.cse.20220104011@aust.edu| Lead                |
| 20220104022  | **Ahnaf Labib**         | ahnaflabib56@gmail.com             | Frontend            |

## Project Overview

### Project Title
**BookNest**

### Objective
A platform offering a curated collection of books, personalized recommendations, seamless purchasing, and community-driven reviews for book lovers

### Target Audience
Your BookNest app targets book enthusiasts of all ages who seek a seamless way to discover, organize, and track their reading journey. It’s ideal for avid readers, book clubs, and anyone passionate about literature, offering personalized recommendations, interactive features, and a vibrant community to connect with like-minded readers.

## Tech Stack

### Backend
- **Framework**: Laravel

### Frontend
- **Framework/Library**: React with React.js

### Rendering Method
- **Client-Side Rendering (CSR)**

### **UI Design**
- **Tool**: Figma  
- **Design Link**:  [BookNest Figma Design](https://www.figma.com/design/e5Tw6PEv3NbnbzRr3ZpF5h/Book-eCommerce-Website-(Community)?node-id=0-1&p=f&t=DYjZQ963hzW0DqWx-0)
  
  ```bash
  https://www.figma.com/design/e5Tw6PEv3NbnbzRr3ZpF5h/Book-eCommerce-Website-(Community)?node-id=0-1&p=f&t=DYjZQ963hzW0DqWx-0



## Project Features
Project Features for BookNest Website

**User Authentication**

- Registration and login for personalized browsing and shopping.
- Option for social media login.

**My Profile**
- User Dashboard: Buyers can view and edit their profile, manage their order history, wishlist, and personal information.
- Publisher/Admin Dashboard: Publishers and admins have a dashboard to manage products, track sales, and perform administrative tasks

**Comprehensive Book Search**

 - Search books by title, author, genre, or ISBN.
 - Advanced filters for language, price range, and ratings.

**Shopping Cart & Order**

 - Add books to your cart for easy checkout.
 - User order books.



# API Documentation

This document provides information about available API endpoints for the book marketplace application.

## Authentication

| Method | Endpoint      | Description                                  | Request Body                                 | Response                            |
|--------|---------------|----------------------------------------------|----------------------------------------------|-------------------------------------|
| POST   | `/register`   | Register a new user                          | `name`, `email`, `password`, `role`           | User details with authentication token |
| POST   | `/login`      | Authenticate a user and get a token          | `email`, `password`                          | Authentication token with user info |

## Books (Public)

| Method | Endpoint        | Description                                | Request Body | Response                          |
|--------|-----------------|--------------------------------------------|--------------|------------------------------------|
| GET    | `/books`        | Get a list of all published books          | None         | Array of book objects               |
| GET    | `/books/{book}` | Get detailed information about a book      | None         | Single book object with details     |

## Protected Routes

All protected routes require a valid JWT authentication token in the request header:
```
Authorization: Bearer {your_token}
```

### Profile

| Method | Endpoint   | Description                 | Request Body | Response                      |
|--------|------------|-----------------------------|--------------|-------------------------------|
| GET    | `/user-dashboard` | Get current user profile    | None         | User profile information      |


### Publisher Routes

*Requires publisher role*

| Method | Endpoint                        | Description                                  | Request Body                            | Response                        |
|--------|--------------------------------|----------------------------------------------|----------------------------------------|----------------------------------|
| GET    | `/publisher-dashboard`          | Access the publisher dashboard               | None                                     | Publisher dashboard data         |
| POST   | `/books`                        | Create a new book                            | Book details (title, description, etc.)  | Created book object              |
| PUT    | `/books/{book}`                 | Update an existing book                      | Updated book details                     | Updated book object              |
| DELETE | `/books/{book}`                 | Delete a book                                | None                                     | Success message                  |
| GET    | `/publisher-dashboard/stats`    | Get publisher statistics                     | None                                     | Publisher statistics             |
| GET    | `/publisher/books`              | Get all books by the publisher               | None                                     | Array of publisher's books       |
| GET    | `/publisher/earnings`           | Get publisher's earnings information         | None                                     | Earnings data                    |
| GET    | `/publisher/comments`           | Get comments on publisher's books            | None                                     | Array of comments                |

### User Routes

*Requires user role*

| Method | Endpoint                    | Description                                | Request Body                           | Response                         |
|--------|-----------------------------|--------------------------------------------|-----------------------------------------|----------------------------------|
| GET    | `/user-dashboard`           | Access the user dashboard                  | None                                    | User dashboard data              |
| POST   | `/books/{book}/comments`    | Add a comment to a book                    | `content`, rating                       | Created comment object           |
| DELETE | `/comments/{comment}`       | Delete a user's comment                    | None                                    | Success message                  |
| POST   | `/orders`                   | Place a new book order                     | Book ID, quantity, shipping details     | Created order object             |
| GET    | `/orders`                   | Get user's order history                   | None                                    | Array of order objects           |

## Authentication and Middleware

The API uses JWT (JSON Web Token) authentication and role-based middleware:

- `jwt.auth`: Verifies the authentication token
- `role:admin`: Ensures the user has admin privileges
- `role:publisher`: Ensures the user has publisher privileges
- `role:user`: Ensures the user has standard user privileges

## Response Formats

All API endpoints return responses in JSON format with appropriate HTTP status codes:

- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication failed or token missing
- `403 Forbidden`: User does not have required permissions
- `404 Not Found`: Resource not found
- `422 Unprocessable Entity`: Validation errors
- `500 Server Error`: Server-side error



## Milestones

### Milestone 1: Initial Setup and Basic Features

- Set up Laravel backend and React frontend.
- Implement user and publisher authentication (registration and login).
- Basic UI for sign-up pages, login page, and home page.

### Milestone 2: Profile and Administration Features
- Create API endpoints for product management (add, update, delete).
- Develop buyer/user profile page to manage personal details.
- Implement publisher/admin page for managing products (add, edit, delete).


### Milestone 3: Testing and Finalization
- Create UI for sales information display in the admin panel.
- Complete CI/CD of the project.
- Complete testing, bug fixes, and deploy the application to a live hosting environment.

# Usage Instructions

## Prerequisites
Before getting started, ensure the following tools are installed:
- **PHP 8.1+** (for the backend)
- **Composer** (for managing PHP dependencies)
- **Node.js** (for running the React frontend)
- **MySQL** (for the database)

## Installation Steps

### 1. Clone the repository
```
git clone [repository-url]
cd [project-folder]
```

### 2. Backend Setup (Laravel)

#### Install Laravel dependencies
```
cd backend
composer install
```

#### Create and configure environment file
```
cp .env.example .env
php artisan key:generate
```

#### Configure MySQL Database
1. Create a new MySQL database for your project
2. Edit the `.env` file with your database credentials:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### Set up JWT Authentication
```
composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
```

#### Run migrations
```
php artisan migrate
```

#### Create symbolic link for storage
```
php artisan storage:link
```

#### Start Laravel server
```
php artisan serve
```

### 3. Frontend Setup (React)

#### Install React dependencies
```
cd frontend
npm install
```

#### Configure frontend environment
Create or edit `.env` file in the frontend directory to point to your Laravel backend:
```
VITE_API_BASE_URL=http://localhost:8000/api
```

#### Start React development server
```
npm run dev
```

## MySQL Setup for Laravel

### Option 1: Using XAMPP
1. Install XAMPP from [https://www.apachefriends.org/](https://www.apachefriends.org/)
2. Start Apache and MySQL services from the XAMPP Control Panel
3. Access phpMyAdmin at [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
4. Create a new database for your project
5. Update your Laravel `.env` file with the database credentials

### Option 2: Standalone MySQL Installation
1. Install MySQL Server from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
2. Create a new database using MySQL command line or a GUI tool like MySQL Workbench:
   ```sql
   CREATE DATABASE your_database_name;
   CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_username'@'localhost';
   FLUSH PRIVILEGES;
   ```
3. Update your Laravel `.env` file with these credentials

## Common Laravel & MySQL Commands

### Database Management
```
php artisan migrate                   # Run all migrations
php artisan migrate:fresh             # Drop all tables and re-run migrations
php artisan migrate:fresh --seed      # Drop, migrate, and seed the database
php artisan db:seed                   # Run database seeders
```

### Create Model & Migration
```
php artisan make:model ModelName -m   # Create model with migration
```

### Clear Cache
```
php artisan cache:clear               # Clear application cache
php artisan config:clear              # Clear config cache
php artisan route:clear               # Clear route cache
```

## Accessing the Platform
- Frontend: [http://localhost:5173](http://localhost:5173) (default Vite port)
- Backend API: [http://localhost:8000/api](http://localhost:8000/api)
- API Documentation: Available at the `/api-documentation` route
