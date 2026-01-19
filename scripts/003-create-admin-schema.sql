-- Admin authentication schema
-- Run this script to create the admin users and sessions tables

USE eshrm_db;

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role ENUM('admin', 'editor') DEFAULT 'admin',
  last_login DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create sessions table for session-based authentication
CREATE TABLE IF NOT EXISTS admin_sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id INT NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
);

-- Create index on sessions for efficient cleanup
CREATE INDEX idx_sessions_expires_at ON admin_sessions(expires_at);

-- Insert default admin user
-- Default password: Admin123! (Change this immediately after first login)
-- Hash generated with bcrypt, cost factor 10
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@eshrm.africa', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ESHRM Administrator', 'admin')
ON DUPLICATE KEY UPDATE
  password_hash = VALUES(password_hash),
  name = VALUES(name),
  role = VALUES(role);

-- Verify the user was created
SELECT id, email, name, role, created_at FROM admin_users WHERE email = 'admin@eshrm.africa';
