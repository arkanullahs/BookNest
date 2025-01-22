-- 2024_01_22_000002_create_users_table.sql
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    role_id INT DEFAULT 1, -- default to user role
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remember_token VARCHAR(100),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);