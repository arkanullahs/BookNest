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

**Shopping Cart & Wishlist**

 - Add books to your cart for easy checkout.
 - Save favorite items to a wishlist for future purchases.


 **User Reviews & Ratings**

 - Leave reviews and ratings for purchased books.
 - Read feedback from verified buyers.

**Forum Page**

- Provides a platform for users and publishers to communicate, resolve issues, and share feedback about books and reletives.


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

Forum Page
GET /forum: Fetch all forum discussions.
POST /forum: Create a new discussion or question.
GET /forum/{id}: Fetch details of a specific discussion.
POST /forum/{id}/reply: Add a reply to a forum discussion.

Miscellaneous
POST /report: Report inappropriate content or activity.


## Milestones

### Milestone 1: Initial Setup and Basic Features

- Set up Laravel backend and React frontend.
- Implement user and publisher authentication (registration and login).
- Basic UI for sign-up pages, login page, and home page.

- 
### Milestone 2: Profile and Administration Features
- Create API endpoints for product management (add, update, delete).
- Develop buyer/user profile page to manage personal details.
- Implement publisher/admin page for managing products (add, edit, delete).
- Create UI for sales information display in the admin panel.
- Integrate review and comment features for the product page.



### Milestone 3: Forum and Finalization

- Build a forum page to enable communication between users and admins.
- Add features for replying to discussions and managing forum posts.
- Complete testing, bug fixes, and deploy the application to a live hosting environment.
