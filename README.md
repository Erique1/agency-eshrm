# ESHRM Website

A modern, professional HR consulting website built with Next.js 16, React 19, and MySQL.

## Features

- **Modern Frontend:** Next.js 16 with React 19, Tailwind CSS v4, and shadcn/ui components
- **Full CMS:** Admin dashboard for managing all content
- **MySQL Database:** Production-ready database with proper schema and indexes
- **Authentication:** Secure admin login with bcrypt password hashing and session management
- **SEO Optimized:** Meta tags, semantic HTML, and optimized images
- **Responsive Design:** Mobile-first design that works on all devices

## Quick Start (Development)

### Prerequisites

- Node.js 20.x or later
- MySQL 8.0 or later
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd eshrm-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up the database**

   ```bash
   # Log into MySQL and create the database
   mysql -u root -p < scripts/001-create-database.sql
   mysql -u root -p eshrm_db < scripts/002-seed-data.sql
   ```

4. **Configure environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open the website**

   - Frontend: http://localhost:3000
   - Admin: http://localhost:3000/admin
   - Default credentials: admin@eshrm.africa / EshrmAdmin2025!

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── services/          # Services pages
│   ├── case-studies/      # Case studies pages
│   ├── insights/          # Blog pages
│   └── book-consultation/ # Booking page
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── home/             # Homepage sections
│   ├── layout/           # Header, Footer
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions
│   ├── services/         # Database service layer
│   ├── db.ts             # Database connection
│   └── types.ts          # TypeScript interfaces
├── public/               # Static assets
│   └── images/           # Image files
├── scripts/              # Database scripts
│   ├── 001-create-database.sql
│   ├── 002-seed-data.sql
│   └── 003-create-admin-user.sql
└── DEPLOYMENT.md         # Full deployment guide
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | /api/services | List/Create services |
| GET/PATCH/DELETE | /api/services/[id] | Get/Update/Delete service |
| GET/POST | /api/case-studies | List/Create case studies |
| GET/POST | /api/blog | List/Create blog posts |
| GET/POST | /api/testimonials | List/Create testimonials |
| GET/POST | /api/leads | List/Create leads |
| GET/POST | /api/bookings | List/Create bookings |
| GET/PATCH | /api/settings | Get/Update site settings |
| GET | /api/stats | Dashboard statistics |
| POST | /api/auth/login | Admin login |
| POST | /api/auth/logout | Admin logout |
| GET | /api/auth/session | Check session |

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive self-hosting instructions including:

- Server setup (Ubuntu 22.04)
- MySQL configuration
- Nginx reverse proxy
- SSL certificates (Let's Encrypt)
- PM2 process management
- Backup strategies
- Security best practices

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| MYSQL_HOST | Database host | localhost |
| MYSQL_PORT | Database port | 3306 |
| MYSQL_USER | Database user | root |
| MYSQL_PASSWORD | Database password | - |
| MYSQL_DATABASE | Database name | eshrm_db |
| NODE_ENV | Environment | development |
| NEXT_PUBLIC_SITE_URL | Site URL | http://localhost:3000 |

## Security Notes

1. **Change the default admin password immediately after deployment**
2. **Use strong, unique passwords for MySQL**
3. **Keep dependencies updated**
4. **Enable firewall and only allow necessary ports**
5. **Use HTTPS in production**

## Support

- Email: info@eshrm.africa
- Phone: +263 779 122 227 / +263 774 193 064
- Location: Harare, Zimbabwe

## License

Private - All rights reserved © ESHRM 2025
