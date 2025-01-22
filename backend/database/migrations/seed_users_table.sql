INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', HASHBYTES('SHA2_256', 'password'), 'admin'),
('Publisher User', 'publisher@example.com', HASHBYTES('SHA2_256', 'password'), 'publisher'),
('Regular User', 'user@example.com', HASHBYTES('SHA2_256', 'password'), 'user');
