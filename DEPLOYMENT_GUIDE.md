# Deployment Guide (Simple)

Use this for deploying Hotwheels on a server with PostgreSQL.

## 1) Add your server IP / domain

### Frontend API server IP
Set this in root `.env`:

```env
VITE_API_URL=http://YOUR_SERVER_IP:8000/api
```

> This value is used by `src/services/api.ts` (`import.meta.env.VITE_API_URL`).

### Backend allowed server IP
Set this in `backend/.env`:

```env
DEBUG=False
ALLOWED_HOSTS=YOUR_SERVER_IP,your-domain.com
FRONTEND_URL=http://YOUR_SERVER_IP
DB_HOST=localhost
DB_PORT=5432
```

## 2) PostgreSQL commands

Login to postgres:

```bash
sudo -u postgres psql
```

Run:

```sql
CREATE DATABASE hotwheels_db;
CREATE USER hotwheels_user WITH PASSWORD 'CHANGE_ME_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE hotwheels_db TO hotwheels_user;
\q
```

## 3) Backend deploy

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# edit .env with values from step 1
python manage.py migrate
python manage.py collectstatic --noinput
pip install gunicorn
gunicorn hotwheels_api.wsgi:application --bind 0.0.0.0:8000
```

## 4) Frontend deploy

```bash
npm install
npm run build
```

Deploy the generated `dist/` folder with Nginx (or any static host).

## 5) Nginx (example)

- Route `/` to frontend static files (`dist/`)
- Route `/api/` to `http://127.0.0.1:8000/api/`

