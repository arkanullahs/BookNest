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
- **Framework/Library**: React with Inertia.js

### Rendering Method
- **Client-Side Rendering (CSR)**

### **UI Design**
- **Tool**: Figma  
- **Design Link**:  [CourseMate Figma Design](https://www.figma.com/design/e5Tw6PEv3NbnbzRr3ZpF5h/Book-eCommerce-Website-(Community)?node-id=0-1&p=f&t=DYjZQ963hzW0DqWx-0)
  
  ```bash
  https://www.figma.com/design/e5Tw6PEv3NbnbzRr3ZpF5h/Book-eCommerce-Website-(Community)?node-id=0-1&p=f&t=DYjZQ963hzW0DqWx-0



## Project Features
Project Features for BookNest Website

**User Authentication**

- Registration and login for personalized browsing and shopping.
- Option for social media login.

**Comprehensive Book Search**

 - Search books by title, author, genre, or ISBN.
 - Advanced filters for language, price range, and ratings.

**Shopping Cart & Wishlist**

 - Add books to your cart for easy checkout.
 - Save favorite items to a wishlist for future purchases.

 **Secure Payment Options**

 - Support for cash-on-delivery, mobile payments, and credit/debit cards.
 - Integration with trusted payment gateways.

 **User Reviews & Ratings**

 - Leave reviews and ratings for purchased books.
 - Read feedback from verified buyers.

**Order Tracking & Notifications**

 - Real-time updates on order status and delivery tracking.
 - Notifications for discounts, new arrivals, and offers.


## API Endpoints

Authentication
POST /register: User registration.
POST /login: User login.
POST /logout: Logout the authenticated user.

Books
GET /books: Fetch all books.
GET /books/{id}: Fetch details of a specific book.
POST /books: Add a new book (Admin only).
PUT /books/{id}: Update a book (Admin only).
DELETE /books/{id}: Delete a book (Admin only).

Categories
GET /categories: Fetch all book categories.
POST /categories: Create a new category (Admin only).
PUT /categories/{id}: Update a category (Admin only).
DELETE /categories/{id}: Delete a category (Admin only).

Cart
GET /cart: Fetch items in the user's cart.
POST /cart: Add a book to the cart.
DELETE /cart/{id}: Remove a book from the cart.

Wishlist
GET /wishlist: Fetch all items in the user's wishlist.
POST /wishlist: Add a book to the wishlist.
DELETE /wishlist/{id}: Remove a book from the wishlist.

Reviews
GET /reviews/{bookId}: Fetch reviews for a specific book.
POST /reviews/{bookId}: Add a review for a book.
PUT /reviews/{id}: Update a review.
DELETE /reviews/{id}: Delete a review.

Orders
GET /orders: Fetch all orders for the authenticated user.
POST /orders: Place a new order.
GET /orders/{id}: Fetch details of a specific order.

Miscellaneous
GET /profile: Fetch the authenticated user's profile.
PUT /profile: Update user profile details.
POST /report: Report inappropriate content.


## Milestones

### Milestone 1: Initial Setup and Basic Features
- Set up Laravel backend and React frontend.
- Implement user authentication (registration and login).
- Create API endpoints for books and categories.
- Basic UI for home page, book listing, and user account creation.

### Milestone 2: Shopping Features and Interactions
- Implement search functionality with filters (genre, author, price).
- Add shopping cart and wishlist features.
- Enable secure payment integration (cash-on-delivery, mobile banking).
- Build UI for product pages, cart, and checkout.


### Milestone 3: Final Touches and Deployment
- Implement user reviews and ratings system.
- Add order tracking and notification system.
- Develop admin panel for managing books, orders, and reviews.
- Complete testing and bug fixes.
- Deploy the platform to a live hosting environment.
