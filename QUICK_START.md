# Quick Start Guide - Hot Wheels E-Commerce

## ✅ FIXED: "Product not found" Issue

The product detail page now works correctly! Products are accessed by their slug (e.g., `/products/lamborghini-aventador`).

---

## 🔐 How to Login as Admin

### Current Setup (Mock Data Mode)

Your app currently uses **mock data** for quick testing. Here's how to access it:

**Admin Login:**
- Email: `admin@hotwheels.com`
- Password: Any password (mock auth accepts any value)

**Steps:**
1. Go to http://localhost:5173
2. Click "Login"
3. Enter email: `admin@hotwheels.com`
4. Enter any password
5. Click "Login"
6. Access Admin panel from navigation

### For Real Database Authentication

To use real authentication with Supabase (recommended for production):

**Step 1:** Create admin user in Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project (or create one)
3. Go to Authentication → Users
4. Click "Add user"
5. Email: `admin@hotwheels.com`
6. Password: `Admin@123` (or your choice)
7. Click "Create user"

**Step 2:** Set admin permissions
Run this in Supabase SQL Editor:
```sql
INSERT INTO profiles (id, is_admin, full_name)
SELECT id, true, 'Admin User'
FROM auth.users
WHERE email = 'admin@hotwheels.com'
ON CONFLICT (id) DO UPDATE SET is_admin = true;
```

**Step 3:** Login with real credentials
- Email: `admin@hotwheels.com`
- Password: `Admin@123`

---

## 🚀 Fast Setup (5 Minutes)

### 1. Database (1 minute)
```bash
psql postgres
CREATE DATABASE hotwheels_db;
CREATE USER hotwheels_user WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE hotwheels_db TO hotwheels_user;
\q
```

### 2. Backend (2 minutes)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
DB_NAME=hotwheels_db
DB_USER=hotwheels_user
DB_PASSWORD=password123
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=django-insecure-dev-key-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
FRONTEND_URL=http://localhost:5173
EOF

python manage.py migrate
python manage.py createsuperuser  # username: admin, password: admin123
python manage.py runserver
```

### 3. Frontend (2 minutes)
**Open new terminal:**
```bash
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api" > .env

npm run dev
```

### 4. Access
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000/api/
- **Admin Panel:** http://localhost:8000/admin/
- **API Docs:** http://localhost:8000/swagger/

---

## 📝 Daily Workflow

### Start Servers
```bash
# Terminal 1 - Backend
cd backend && source venv/bin/activate && python manage.py runserver

# Terminal 2 - Frontend
npm run dev
```

### Test User
- Username: admin
- Password: admin123 (or what you set)

---

## 🔗 API Endpoints Reference

### Authentication
```
POST /api/auth/login/      - Login
POST /api/auth/signup/     - Sign up
POST /api/auth/logout/     - Logout
GET  /api/auth/user/       - Get current user
```

### Products
```
GET  /api/products/        - List all products
GET  /api/products/{slug}/ - Get product detail
GET  /api/products/featured/ - Get featured products
```

### Cart (Auth Required)
```
GET    /api/cart/          - Get user's cart
POST   /api/cart/          - Add to cart (body: {product_id, quantity})
PUT    /api/cart/{id}/     - Update quantity
DELETE /api/cart/{id}/     - Remove from cart
POST   /api/cart/clear/    - Clear cart
GET    /api/cart/total/    - Get cart totals
```

### Orders (Auth Required)
```
GET  /api/orders/          - List user's orders
POST /api/orders/          - Create order from cart
GET  /api/orders/{id}/     - Get order details
```

---

## 🐛 Quick Fixes

### Backend won't start
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
```

### Frontend errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database connection failed
```bash
psql -U hotwheels_user -d hotwheels_db
# If fails, recreate database (see step 1)
```

### Port already in use
```bash
# Kill process on port 8000 (backend)
lsof -ti:8000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

---

## ✅ Verification Checklist

- [ ] PostgreSQL is running
- [ ] Database `hotwheels_db` exists
- [ ] Backend running at http://localhost:8000
- [ ] Frontend running at http://localhost:5173
- [ ] Can login to admin panel
- [ ] Can view API docs at /swagger/
- [ ] Can create account on frontend
- [ ] Can add products to cart
- [ ] Page refresh maintains current page

---

For detailed setup, see **SETUP_GUIDE.md**
