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

The old long deployment section was removed.

Use the new simple guide here:
- `DEPLOYMENT_GUIDE.md`

## 5) Notes
- Backend API docs are available at `/swagger/` and `/redoc/`.
- Admin panel is at `/admin/`.
