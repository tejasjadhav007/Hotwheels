# Authentication Issues - Quick Fix Guide

## Problem: Admin login and user signup not working

This guide will help you fix authentication issues and verify all features are working.

---

## ✅ All Features Already Implemented

The following features have been added to your application:

1. ✅ **Fixed Authentication** - Login with email/username, automatic username generation
2. ✅ **Product Reviews** - Customer ratings (1-5 stars), comments, images, and videos
3. ✅ **Image Upload** - Admin can upload product images
4. ✅ **Stock Management** - Automatic quantity reduction after purchase
5. ✅ **Email Authentication** - Welcome emails and SMTP integration
6. ✅ **Razorpay Payment** - Complete payment gateway integration

---

## 🔧 Step-by-Step Fix

### Step 1: Check Django Backend is Running

```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python manage.py runserver
```

**Expected output:** `Starting development server at http://127.0.0.1:8000/`

### Step 2: Verify Database Migrations

```bash
cd backend
source venv/bin/activate
python manage.py makemigrations
python manage.py migrate
```

This creates the new `product_reviews` table and updates existing tables.

### Step 3: Create/Reset Admin User

**If admin user doesn't exist or password forgotten:**

```bash
python manage.py createsuperuser
```

Enter:
- Username: `admin`
- Email: `admin@hotwheels.com`
- Password: `Admin@123` (or your choice)

**To reset existing admin password:**

```bash
python manage.py changepassword admin
```

### Step 4: Test Admin Login

1. Go to http://localhost:8000/admin/
2. Login with:
   - Username: `admin`
   - Password: (the one you just set)
3. ✅ Should work now

### Step 5: Test API Authentication

**Test login endpoint:**

```bash
# Test with username
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}'

# Test with email
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hotwheels.com","password":"Admin@123"}'
```

**Expected response:**
```json
{
  "token": "abc123...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@hotwheels.com",
    "is_staff": true
  }
}
```

### Step 6: Test User Signup

```bash
curl -X POST http://localhost:8000/api/auth/signup/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

**Expected response:**
```json
{
  "token": "xyz789...",
  "user": {
    "id": 2,
    "username": "test",
    "email": "test@example.com",
    "is_staff": false
  }
}
```

### Step 7: Test Frontend Login

1. Start frontend: `npm run dev`
2. Go to http://localhost:5173
3. Click "Login"
4. Enter: `admin@hotwheels.com` and your password
5. ✅ Should login successfully

### Step 8: Test Frontend Signup

1. Click "Sign Up" tab
2. Enter:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Password: `John@123`
3. Click "Sign Up"
4. ✅ Should create account and login automatically

---

## 🐛 Common Issues & Solutions

### Issue 1: "No such table: auth_token"

**Solution:**
```bash
cd backend
python manage.py migrate
```

### Issue 2: "Invalid credentials" even with correct password

**Cause:** Backend and frontend not communicating

**Solution:**
1. Check backend is running: http://localhost:8000/api/products/
2. Check `.env` has correct API URL:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```
3. Restart frontend: Stop (`Ctrl+C`) and run `npm run dev`

### Issue 3: CORS errors in browser console

**Solution:** Update `backend/hotwheels_api/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]
CORS_ALLOW_CREDENTIALS = True
```

Restart Django server.

### Issue 4: Signup creates user but returns error

**Check:** Open Django admin → Users → Verify user was created

If user exists but frontend shows error, it's likely an email sending issue (non-critical).

**Fix:** Update `.env` with valid email credentials or disable email temporarily:

```python
# In settings.py, change to console backend for testing
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

### Issue 5: "Cannot read property 'username' of null"

**Cause:** Frontend AuthContext not receiving user data

**Solution:**
1. Clear browser localStorage: Open DevTools → Application → Local Storage → Clear
2. Refresh page
3. Login again

---

## 🧪 Complete Feature Test Checklist

Once authentication works, test all features:

### ✅ 1. Authentication
- [ ] Admin can login with email
- [ ] Admin can login with username
- [ ] New users can signup
- [ ] Welcome email received (check Gmail)
- [ ] Users stay logged in after page refresh

### ✅ 2. Product Image Upload
- [ ] Login to admin: http://localhost:8000/admin/
- [ ] Go to Products → Add Product
- [ ] See "Image" upload field
- [ ] Upload an image
- [ ] Save product
- [ ] Image displays on frontend

### ✅ 3. Product Reviews
- [ ] Login as customer on frontend
- [ ] Purchase a product
- [ ] Go to product detail page
- [ ] Write review with rating
- [ ] Upload review image (optional)
- [ ] Upload review video (optional)
- [ ] Review displays with star rating
- [ ] Shows "Verified Purchase" badge

### ✅ 4. Stock Management
- [ ] Check product stock in admin (e.g., 100)
- [ ] Add 5 items to cart
- [ ] Complete purchase
- [ ] Check stock again (should be 95)
- [ ] Try to buy more than available stock
- [ ] Should show "Insufficient stock" error

### ✅ 5. Razorpay Payment
- [ ] Add products to cart
- [ ] Go to checkout
- [ ] Click "Pay with Razorpay"
- [ ] Razorpay popup opens
- [ ] Use test card: `4111 1111 1111 1111`
- [ ] Payment succeeds
- [ ] Order created with "paid" status
- [ ] Stock reduced
- [ ] Cart cleared

---

## 📝 Environment Variables Required

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:8000/api
```

**Backend `.env`:**
```env
# Database
DB_NAME=hotwheels_db
DB_USER=hotwheels_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Django
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
FRONTEND_URL=http://localhost:5173

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-16-char-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🚀 Quick Start Commands

**Start Everything:**

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 2 - Frontend
npm run dev
```

**Reset Everything:**

```bash
# Backend
cd backend
rm -rf media/*
python manage.py flush
python manage.py migrate
python manage.py createsuperuser

# Frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📚 Documentation Files

All setup guides are in your project:

1. **COMPLETE_SETUP_GUIDE.md** - Full step-by-step setup for all features
2. **QUICK_START.md** - 5-minute quick start
3. **SETUP_GUIDE.md** - Original comprehensive guide
4. **This file** - Authentication troubleshooting

---

## 🆘 Still Having Issues?

If authentication still doesn't work:

1. **Check logs:**
   - Backend terminal output
   - Browser DevTools → Console tab
   - Browser DevTools → Network tab

2. **Test API directly:**
   ```bash
   # Check if API is accessible
   curl http://localhost:8000/api/products/

   # Test login
   curl -X POST http://localhost:8000/api/auth/login/ \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"Admin@123"}' -v
   ```

3. **Verify database:**
   ```bash
   psql -U hotwheels_user -d hotwheels_db
   SELECT * FROM auth_user WHERE username='admin';
   \q
   ```

4. **Check installed packages:**
   ```bash
   cd backend
   pip list | grep -E "(Django|djangorestframework|django-cors)"
   ```

---

**After following this guide, your authentication should work and all features will be functional!**
