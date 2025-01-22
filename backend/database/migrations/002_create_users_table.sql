IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' and xtype='U')
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    username NVARCHAR(50) NOT NULL UNIQUE,
    phone NVARCHAR(20) NULL,
    address NVARCHAR(MAX) NULL,
    role_id INT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE(),
    remember_token NVARCHAR(100) NULL,
    CONSTRAINT FK_Users_Roles FOREIGN KEY (role_id) 
        REFERENCES roles(id)
);
