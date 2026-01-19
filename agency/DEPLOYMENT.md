# ESHRM Website - Self-Hosting Deployment Guide

This guide provides comprehensive instructions for deploying the ESHRM website on your own server with MySQL database.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Server Requirements](#server-requirements)
3. [Database Setup](#database-setup)
4. [Application Setup](#application-setup)
5. [Nginx Configuration](#nginx-configuration)
6. [SSL Certificate Setup](#ssl-certificate-setup)
7. [Process Manager Setup](#process-manager-setup)
8. [Domain Configuration](#domain-configuration)
9. [Backup Strategy](#backup-strategy)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- A Linux server (Ubuntu 22.04 LTS recommended)
- Root or sudo access to the server
- A domain name (e.g., eshrm.africa)
- Basic knowledge of Linux command line

---

## Server Requirements

### Minimum Specifications

- **CPU:** 2 cores
- **RAM:** 4 GB
- **Storage:** 20 GB SSD
- **OS:** Ubuntu 22.04 LTS or similar

### Required Software

- Node.js 20.x or later
- MySQL 8.0 or later
- Nginx
- PM2 (Process Manager)
- Git
- Certbot (for SSL)

---

## Step 1: Server Preparation

### 1.1 Update System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Node.js 20.x

```bash
# Install Node.js using NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### 1.3 Install MySQL 8.0

```bash
# Install MySQL Server
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# During the prompts:
# - Set a strong root password
# - Remove anonymous users: Yes
# - Disallow root login remotely: Yes
# - Remove test database: Yes
# - Reload privilege tables: Yes
```

### 1.4 Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 1.5 Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 1.6 Install Git

```bash
sudo apt install -y git
```

---

## Step 2: Database Setup

### 2.1 Create Database and User

```bash
# Log into MySQL as root
sudo mysql -u root -p
```

```sql
-- Create the database
CREATE DATABASE eshrm_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create a dedicated user for the application
CREATE USER 'eshrm_user'@'localhost' IDENTIFIED BY 'YOUR_STRONG_PASSWORD_HERE';

-- Grant privileges
GRANT ALL PRIVILEGES ON eshrm_db.* TO 'eshrm_user'@'localhost';
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

### 2.2 Import Database Schema

```bash
# Navigate to your project directory (after cloning)
cd /var/www/eshrm

# Import the schema
mysql -u eshrm_user -p eshrm_db < scripts/001-create-database.sql

# Import seed data
mysql -u eshrm_user -p eshrm_db < scripts/002-seed-data.sql
```

### 2.3 Update Admin Password

**IMPORTANT:** The seed data creates a default admin user. Update the password immediately:

```bash
# Generate a bcrypt hash for your new password
# You can use Node.js for this:
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YOUR_NEW_PASSWORD', 10).then(hash => console.log(hash));"
```

```sql
-- Update the admin password in MySQL
UPDATE admin_users 
SET password_hash = 'YOUR_GENERATED_HASH_HERE' 
WHERE email = 'admin@eshrm.africa';
```

---

## Step 3: Application Setup

### 3.1 Create Application Directory

```bash
sudo mkdir -p /var/www/eshrm
sudo chown $USER:$USER /var/www/eshrm
```

### 3.2 Clone or Upload Your Application

**Option A: Using Git**

```bash
cd /var/www
git clone YOUR_REPOSITORY_URL eshrm
cd eshrm
```

**Option B: Upload via SFTP**

Upload the downloaded ZIP file and extract it to `/var/www/eshrm`

### 3.3 Install Dependencies

```bash
cd /var/www/eshrm
npm install
```

### 3.4 Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the environment file
nano .env
```

Update the `.env` file with your actual values:

```env
# Database Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=eshrm_user
MYSQL_PASSWORD=YOUR_STRONG_PASSWORD_HERE
MYSQL_DATABASE=eshrm_db

# Application Configuration
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://eshrm.africa
```

### 3.5 Build the Application

```bash
npm run build
```

---

## Step 4: Nginx Configuration

### 4.1 Create Nginx Configuration File

```bash
sudo nano /etc/nginx/sites-available/eshrm
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name eshrm.africa www.eshrm.africa;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name eshrm.africa www.eshrm.africa;

    # SSL certificates (will be configured by Certbot)
    ssl_certificate /etc/letsencrypt/live/eshrm.africa/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/eshrm.africa/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # Static files caching
    location /_next/static {
        alias /var/www/eshrm/.next/static;
        expires 365d;
        access_log off;
    }

    location /public {
        alias /var/www/eshrm/public;
        expires 30d;
        access_log off;
    }

    # Proxy to Next.js application
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    # Deny access to sensitive files
    location ~ /\. {
        deny all;
    }
}
```

### 4.2 Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/eshrm /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## Step 5: SSL Certificate Setup (Let's Encrypt)

### 5.1 Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 5.2 Obtain SSL Certificate

```bash
sudo certbot --nginx -d eshrm.africa -d www.eshrm.africa
```

Follow the prompts:
- Enter your email address
- Agree to the terms of service
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

### 5.3 Auto-Renewal

Certbot automatically sets up a cron job for certificate renewal. Verify it:

```bash
sudo certbot renew --dry-run
```

---

## Step 6: Process Manager Setup (PM2)

### 6.1 Create PM2 Ecosystem File

```bash
nano /var/www/eshrm/ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: 'eshrm',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/eshrm',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
```

### 6.2 Start the Application

```bash
cd /var/www/eshrm

# Start the application
pm2 start ecosystem.config.js

# Save the process list
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd
# Run the command it outputs with sudo
```

### 6.3 Useful PM2 Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs eshrm

# Restart application
pm2 restart eshrm

# Stop application
pm2 stop eshrm

# Monitor resources
pm2 monit
```

---

## Step 7: Domain Configuration

### 7.1 DNS Settings

Add the following DNS records at your domain registrar (for eshrm.africa):

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | YOUR_SERVER_IP | 3600 |
| A | www | YOUR_SERVER_IP | 3600 |
| CNAME | www | eshrm.africa | 3600 |

### 7.2 Wait for DNS Propagation

DNS changes can take up to 48 hours to propagate globally. You can check propagation status at:
- https://dnschecker.org
- https://www.whatsmydns.net

---

## Step 8: Backup Strategy

### 8.1 Database Backup Script

```bash
sudo nano /var/www/eshrm/scripts/backup.sh
```

```bash
#!/bin/bash

# Configuration
BACKUP_DIR="/var/backups/eshrm"
MYSQL_USER="eshrm_user"
MYSQL_PASSWORD="YOUR_PASSWORD"
MYSQL_DATABASE="eshrm_db"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# Backup uploads/public files
tar -czf $BACKUP_DIR/files_backup_$DATE.tar.gz /var/www/eshrm/public

# Remove backups older than 30 days
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completed: $DATE"
```

```bash
# Make executable
sudo chmod +x /var/www/eshrm/scripts/backup.sh

# Schedule daily backup (runs at 2 AM)
sudo crontab -e
# Add this line:
# 0 2 * * * /var/www/eshrm/scripts/backup.sh >> /var/log/eshrm-backup.log 2>&1
```

---

## Step 9: Firewall Configuration

### 9.1 Configure UFW Firewall

```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

---

## Step 10: Monitoring and Maintenance

### 10.1 Log Locations

- **Application logs:** `pm2 logs eshrm`
- **Nginx access logs:** `/var/log/nginx/access.log`
- **Nginx error logs:** `/var/log/nginx/error.log`
- **MySQL logs:** `/var/log/mysql/error.log`

### 10.2 Regular Maintenance Tasks

```bash
# Update system packages (monthly)
sudo apt update && sudo apt upgrade -y

# Update Node.js dependencies (as needed)
cd /var/www/eshrm
npm update

# Rebuild and restart (after updates)
npm run build
pm2 restart eshrm

# Check disk space
df -h

# Check memory usage
free -m
```

---

## Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs eshrm --lines 100

# Check if port 3000 is in use
sudo lsof -i :3000

# Manually test the application
cd /var/www/eshrm
npm run start
```

### Database Connection Issues

```bash
# Test MySQL connection
mysql -u eshrm_user -p -h localhost eshrm_db

# Check MySQL status
sudo systemctl status mysql

# View MySQL error log
sudo tail -f /var/log/mysql/error.log
```

### Nginx Issues

```bash
# Test configuration
sudo nginx -t

# Check error log
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Force renewal
sudo certbot renew --force-renewal

# Check Nginx SSL configuration
sudo nginx -t
```

---

## Security Checklist

- [ ] Changed default admin password
- [ ] Configured firewall (UFW)
- [ ] SSL certificate installed
- [ ] MySQL root password set
- [ ] Regular backups configured
- [ ] Fail2ban installed (optional but recommended)
- [ ] Security headers configured in Nginx
- [ ] Environment variables secured

---

## Support

For issues specific to this deployment:
1. Check the logs mentioned above
2. Review the troubleshooting section
3. Contact: info@eshrm.africa

For general Next.js deployment questions:
- Next.js Documentation: https://nextjs.org/docs
- PM2 Documentation: https://pm2.keymetrics.io/docs/

---

**ESHRM - Transforming HR for African Businesses**
```

```json file="" isHidden
