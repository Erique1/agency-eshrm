# ESHRM Website - cPanel Deployment Guide

Complete guide to deploy the ESHRM website on cPanel shared hosting with MySQL database.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Build the Static Site](#step-1-build-the-static-site)
3. [Step 2: Create MySQL Database](#step-2-create-mysql-database)
4. [Step 3: Upload Files to cPanel](#step-3-upload-files-to-cpanel)
5. [Step 4: Configure PHP API](#step-4-configure-php-api)
6. [Step 5: Import Database](#step-5-import-database)
7. [Step 6: Configure Domain](#step-6-configure-domain)
8. [Step 7: SSL Certificate](#step-7-ssl-certificate)
9. [Step 8: Test the Website](#step-8-test-the-website)
10. [Admin Dashboard Access](#admin-dashboard-access)
11. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- cPanel hosting account with:
  - PHP 7.4 or higher (PHP 8.x recommended)
  - MySQL 5.7 or higher
  - File Manager access
  - phpMyAdmin access
- Domain name pointed to your hosting
- Downloaded project ZIP file from v0

---

## Step 1: Build the Static Site

### On Your Local Computer

1. **Extract the downloaded ZIP file**

2. **Open terminal/command prompt in the project folder**

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Build the static site:**
   ```bash
   npm run build
   ```

5. **Locate the output:**
   After build completes, you'll have an `out` folder containing the static site.

---

## Step 2: Create MySQL Database

### In cPanel:

1. **Log into cPanel** (usually at `yourdomain.com/cpanel` or `yourdomain.com:2083`)

2. **Find "MySQL® Databases"** under the Databases section

3. **Create a new database:**
   - Database name: `eshrm` (will become `username_eshrm`)
   - Click "Create Database"

4. **Create a database user:**
   - Username: `eshrm` (will become `username_eshrm`)
   - Password: Generate a strong password (SAVE THIS!)
   - Click "Create User"

5. **Add user to database:**
   - Select the user and database you just created
   - Grant "ALL PRIVILEGES"
   - Click "Add"

**Note your credentials:**
```
Database: cpanelusername_eshrm
Username: cpanelusername_eshrm
Password: [your generated password]
Host: localhost
```

---

## Step 3: Upload Files to cPanel

### Using File Manager:

1. **Open File Manager** in cPanel

2. **Navigate to `public_html`** (or your domain's document root)

3. **Upload the static site:**
   - Select all contents from the `out` folder
   - Upload to `public_html`

4. **Create API folder:**
   - Create a new folder called `api` inside `public_html`

5. **Upload PHP API files:**
   - Upload all files from the `api` folder to `public_html/api`:
     - `config.php`
     - `auth.php`
     - `leads.php`
     - `bookings.php`
     - `blog.php`
     - `testimonials.php`
     - `stats.php`
     - `.htaccess`

### Final folder structure:
```
public_html/
├── api/
│   ├── .htaccess
│   ├── config.php
│   ├── auth.php
│   ├── leads.php
│   ├── bookings.php
│   ├── blog.php
│   ├── testimonials.php
│   └── stats.php
├── index.html
├── about/
├── services/
├── case-studies/
├── insights/
├── contact/
├── book-consultation/
├── admin/
├── _next/
├── images/
└── ... other static files
```

---

## Step 4: Configure PHP API

1. **Edit `api/config.php`** in File Manager:

   ```php
   // Update these values with your cPanel credentials
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'cpanelusername_eshrm');  // Your full database name
   define('DB_USER', 'cpanelusername_eshrm');  // Your full username
   define('DB_PASS', 'your_password_here');    // Your database password
   
   // Update with your actual domain
   define('SITE_URL', 'https://eshrm.africa');
   ```

2. **Save the file**

---

## Step 5: Import Database

### Using phpMyAdmin:

1. **Open phpMyAdmin** from cPanel

2. **Select your database** from the left sidebar

3. **Click "Import" tab**

4. **Import schema file:**
   - Click "Choose File"
   - Select `scripts/001-create-database.sql` from your local project
   - Click "Go"

5. **Import seed data:**
   - Click "Import" again
   - Select `scripts/002-seed-data.sql`
   - Click "Go"

6. **Create admin user:**
   - Click "Import" again
   - Select `scripts/003-create-admin-user.sql`
   - Click "Go"

### Verify tables were created:
You should see these tables:
- `admin_users`
- `blog_posts`
- `bookings`
- `case_studies`
- `leads`
- `services`
- `sessions`
- `settings`
- `testimonials`

---

## Step 6: Configure Domain

### If using a subdomain or addon domain:

1. **In cPanel, go to "Domains" or "Addon Domains"**

2. **Point your domain to `public_html`** (or the appropriate directory)

### DNS Configuration (at your domain registrar):

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | Your hosting IP | 3600 |
| A | www | Your hosting IP | 3600 |
| CNAME | www | eshrm.africa | 3600 |

**Find your hosting IP:** In cPanel, look for "Server Information" or check your welcome email.

---

## Step 7: SSL Certificate

### Using cPanel's AutoSSL (Recommended):

1. **Go to "SSL/TLS Status"** in cPanel

2. **Click "Run AutoSSL"**

3. **Wait for certificate installation** (usually 5-15 minutes)

### Using Let's Encrypt:

1. **Go to "Let's Encrypt SSL"** in cPanel

2. **Select your domain**

3. **Click "Issue"**

### Force HTTPS:

1. **Edit `.htaccess` in `public_html`:**

   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## Step 8: Test the Website

### Frontend Tests:

1. Visit `https://yourdomain.com` - Homepage should load
2. Visit `https://yourdomain.com/about/` - About page should load
3. Visit `https://yourdomain.com/contact/` - Contact form should appear
4. Visit `https://yourdomain.com/book-consultation/` - Booking form should work

### API Tests:

1. Visit `https://yourdomain.com/api/stats.php` - Should return JSON stats
2. Test contact form submission
3. Test booking form submission

---

## Admin Dashboard Access

### Login Credentials (Default):

- **URL:** `https://yourdomain.com/admin/`
- **Email:** `admin@eshrm.africa`
- **Password:** `admin123`

### IMPORTANT: Change Password Immediately!

1. Log into phpMyAdmin
2. Run this SQL to update password:

   ```sql
   -- First, generate a new password hash
   -- Use an online bcrypt generator or PHP:
   -- echo password_hash('YourNewStrongPassword', PASSWORD_BCRYPT);
   
   UPDATE admin_users 
   SET password_hash = '$2y$10$YOUR_NEW_HASH_HERE' 
   WHERE email = 'admin@eshrm.africa';
   ```

### Generate Password Hash:

Create a file called `hash.php` temporarily:

```php
<?php
echo password_hash('YourNewPassword123!', PASSWORD_BCRYPT);
?>
```

Visit it in browser, copy the hash, then DELETE the file.

---

## Troubleshooting

### "500 Internal Server Error"

1. Check PHP version (needs 7.4+)
2. Check `.htaccess` syntax
3. Check file permissions (644 for files, 755 for folders)
4. Check cPanel Error Log

### "Database connection failed"

1. Verify credentials in `config.php`
2. Ensure full database name (with cpanel prefix)
3. Check if user has privileges on database

### Forms not submitting

1. Check browser console for errors
2. Verify API files are uploaded
3. Test API endpoint directly in browser
4. Check PHP error log in cPanel

### Images not loading

1. Check file paths (case-sensitive on Linux)
2. Verify images were uploaded to correct location
3. Check file permissions

### Admin login not working

1. Verify sessions table exists
2. Check PHP session configuration
3. Clear browser cookies and try again

---

## File Permissions

Set correct permissions via File Manager or SSH:

```
Files: 644
Folders: 755
config.php: 600 (more restrictive for security)
```

---

## Backup Recommendations

### Database Backup:

1. In cPanel, go to "Backup" or "Backup Wizard"
2. Download MySQL database backup regularly
3. Or use phpMyAdmin Export feature

### Files Backup:

1. Download `public_html` folder periodically
2. Or use cPanel's backup feature

---

## Security Checklist

- [ ] Changed default admin password
- [ ] Set `config.php` permissions to 600
- [ ] SSL certificate installed
- [ ] HTTPS redirect enabled
- [ ] Verified `.htaccess` protects config files
- [ ] Regular backups configured

---

## Support

**Website:** eshrm.africa
**Email:** info@eshrm.africa
**Phone:** +263 779 122 227 / +263 774 193 064
**Location:** Harare, Zimbabwe

---

## Quick Reference

| Item | Value |
|------|-------|
| Admin URL | /admin/ |
| API Base | /api/ |
| Default Admin | admin@eshrm.africa |
| PHP Version | 7.4+ required |
| MySQL Version | 5.7+ required |

---

**ESHRM - Transforming HR for African Businesses**
```

```htaccess file=".htaccess"
# ESHRM Website - Main .htaccess
# Place this in your public_html root

# Enable URL rewriting
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove www (optional - choose one)
# RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
# RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Add www (alternative - choose one)
# RewriteCond %{HTTP_HOST} !^www\. [NC]
# RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [R=301,L]

# Handle trailing slashes for static export
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !/$
RewriteCond %{REQUEST_URI} !\.html$
RewriteRule ^(.*)$ /$1/ [L,R=301]

# Serve index.html for directories
DirectoryIndex index.html

# Security Headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/x-javascript "access plus 1 month"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Protect sensitive files
<FilesMatch "\.(env|sql|md|gitignore|htaccess)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# Block access to hidden files
<FilesMatch "^\.">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# Custom error pages (optional)
# ErrorDocument 404 /404.html
# ErrorDocument 500 /500.html
