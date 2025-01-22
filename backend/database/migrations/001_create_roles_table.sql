IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='roles' and xtype='U')
CREATE TABLE roles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

-- Insert default roles if not exist
IF NOT EXISTS (SELECT * FROM roles)
BEGIN
    INSERT INTO roles (name) VALUES 
        ('user'),
        ('publisher'),
        ('admin');
END
