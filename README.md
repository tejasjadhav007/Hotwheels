# Hotwheels Full-Stack (React + Django + PostgreSQL)

This project is a full working e-commerce starter with:
- **Frontend:** React + Vite + Tailwind
- **Backend:** Django REST Framework
- **Database:** PostgreSQL

## 1) Environment credentials (`.env`)

### Frontend `.env` (project root)
```env
VITE_API_URL=http://localhost:8000/api
```

### Backend `.env` (`backend/.env`)
Copy from `backend/.env.example` and set your credentials:
```env
DB_NAME=hotwheels_db
DB_USER=hotwheels_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=replace-with-strong-secret
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
FRONTEND_URL=http://localhost:5173
```

## 2) Local setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend
```bash
npm install
npm run dev
```

## 3) PostgreSQL quick start

```sql
CREATE DATABASE hotwheels_db;
CREATE USER hotwheels_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE hotwheels_db TO hotwheels_user;
```

## 4) Deployment guide (production)

### Backend deployment (Django)
1. Set `DEBUG=False` in `backend/.env`.
2. Set `ALLOWED_HOSTS` to your domain.
3. Run migrations in production:
   ```bash
   python manage.py migrate
   ```
4. Serve with Gunicorn:
   ```bash
   pip install gunicorn
   gunicorn hotwheels_api.wsgi:application --bind 0.0.0.0:8000
   ```
5. Put Nginx in front of Gunicorn, enable HTTPS, and route `/api` to backend.

### Frontend deployment (Vite)
1. Set production API URL in environment:
   ```env
   VITE_API_URL=https://api.your-domain.com/api
   ```
2. Build static assets:
   ```bash
   npm run build
   ```
3. Host `dist/` with Nginx, Vercel, Netlify, or S3+CloudFront.

## 5) Notes
- Backend API docs are available at `/swagger/` and `/redoc/`.
- Admin panel is at `/admin/`.
