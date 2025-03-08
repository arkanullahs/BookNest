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



## API Endpoints

API Endpoints
Authentication
POST /user/register: Register a new buyer/user.
POST /publisher/register: Register a new publisher/admin.
POST /login: User or admin login.
POST /logout: Logout the authenticated user or admin.

Profile
GET /profile: Fetch the authenticated user's profile details.
PUT /profile: Update profile details for a buyer or publisher.

Administration
GET /admin/products: Fetch all products listed by the admin/publisher.
POST /admin/products: Add a new product (Admin only).
PUT /admin/products/{id}: Update product details (Admin only).
DELETE /admin/products/{id}: Delete a product (Admin only).
GET /admin/sales: Fetch product sales information (Admin only).

Home Page
GET /products: Fetch all available products.
GET /products/{id}: Fetch detailed information for a specific product.

Product Page
GET /products/{id}/reviews: Fetch reviews for a specific product.
POST /products/{id}/reviews: Add a review for a product.
GET /products/{id}/comments: Fetch comments on a specific product.
POST /products/{id}/comments: Add a comment on a product.


Miscellaneous
POST /report: Report inappropriate content or activity.


## Milestones

### Milestone 1: Initial Setup and Basic Features

- Set up Laravel backend and React frontend.
- Implement user and publisher authentication (registration and login).
- Basic UI for sign-up pages, login page, and home page.

### Milestone 2: Profile and Administration Features
- Create API endpoints for product management (add, update, delete).
- Develop buyer/user profile page to manage personal details.
- Implement publisher/admin page for managing products (add, edit, delete).
- Create UI for sales information display in the admin panel.

### Milestone 3: Forum and Finalization
- Complete CI/CD of the project.
- Complete testing, bug fixes, and deploy the application to a live hosting environment.

# Usage Instructions:

## Prerequisites
Before getting started, ensure the following tools are installed:
- **PHP** (for the backend)
- **Composer** (for managing PHP dependencies)
- **Node.js** (for running the React frontend)
- **XAMPP** (for running the MySQL database and backend server)

### Installation Steps

1. **Clone the repository.**

2. **Install necessary dependencies:**

   ## For React Frontend:
   - npm install
   - npm install axios
   - npm install coreui
   - npm install dayjs
   - npm install moment
   - npm install bootstrap
   - npm install react
   - npm install react-dom
   - npm install react-responsive-masonry
   - npm install react-router-dom
   - npm install reactstrap
   - npm install recharts
   - npm install remixicon
   - npm install slick-carousel
   
   ## For Laravel Backend:
   - composer install
   - composer require fruitcake/laravel-cors
   - Install Laravel Installer globally (optional, but useful for creating Laravel projects quickly):
   - composer global require laravel/installer
   - Configure your .env file for both frontend and backend

   ## Run the following Laravel commands to set up your backend:
   - php artisan storage:link
   - php artisan vendor:publish
   - php artisan install:api
   - php artisan migrate
   
## Start the development servers:
   ### React Frontend:
   - npm run dev

   ## Laravel Backend:
   - php artisan serve
   - Ensure your XAMPP server is running with the MySQL database configured.
     
## Accessing the Platform-
- Once both frontend and backend are running, access the platform via the provided local address.
