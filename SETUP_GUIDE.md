# Hot Wheels E-Commerce Platform - Complete Setup Guide

This guide will walk you through setting up the entire Hot Wheels e-commerce platform with React frontend and Django backend connected to PostgreSQL database.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** (for frontend)
- **Python 3.10+** (for backend)
- **PostgreSQL 12+** (database)
- **Git** (version control)

---

## 🗄️ PART 1: Database Setup

### Step 1: Install PostgreSQL

**On macOS (using Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**On Windows:**
Download and install from https://www.postgresql.org/download/windows/

### Step 2: Create Database

Open PostgreSQL command line:
```bash
# On macOS/Linux
psql postgres

# On Windows
psql -U postgres
```

Run these SQL commands:
```sql
CREATE DATABASE hotwheels_db;
CREATE USER hotwheels_user WITH PASSWORD 'your_secure_password';
ALTER ROLE hotwheels_user SET client_encoding TO 'utf8';
ALTER ROLE hotwheels_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE hotwheels_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE hotwheels_db TO hotwheels_user;
\q
```

✅ **Verification:** Run `\l` in psql to see your database listed

---

## 🐍 PART 2: Backend Setup (Django)

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Create Virtual Environment

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

You should see `(venv)` in your terminal prompt.

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- Django 4.2.7
- Django REST Framework
- PostgreSQL adapter (psycopg2)
- CORS headers
- And other dependencies

### Step 4: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DB_NAME=hotwheels_db
DB_USER=hotwheels_user
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=django-insecure-CHANGE-THIS-TO-RANDOM-STRING
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
FRONTEND_URL=http://localhost:5173
```

**Important:** Generate a secure SECRET_KEY for production. You can use:
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Step 5: Run Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

This creates all the necessary database tables:
- Products
- Categories
- Cart Items (user-specific)
- Orders
- Order Items
- Contact Messages
- Users and authentication tables

✅ **Verification:** You should see migration files being applied

### Step 6: Create Superuser (Admin Account)

```bash
python manage.py createsuperuser
```

Enter:
- Username: admin
- Email: admin@hotwheels.com
- Password: (your secure password)
- Password confirmation: (repeat password)

### Step 7: Load Sample Data (Optional but Recommended)

```bash
python manage.py shell
```

Then paste this code:

```python
from shop.models import Category, Product

# Create categories
cars = Category.objects.create(
    name='Cars',
    slug='cars',
    description='Individual Hot Wheels die-cast cars',
    image_url='https://images.pexels.com/photos/1019999/pexels-photo-1019999.jpeg'
)

tracks = Category.objects.create(
    name='Track Sets',
    slug='track-sets',
    description='Complete track sets for racing',
    image_url='https://images.pexels.com/photos/163746/toy-car-toy-vehicle-auto-automobile-163746.jpeg'
)

collectibles = Category.objects.create(
    name='Collectibles',
    slug='collectibles',
    description='Limited edition and rare models',
    image_url='https://images.pexels.com/photos/35619/capri-ford-oldtimer-automotive.jpg'
)

# Create sample products
Product.objects.create(
    category=cars,
    name='Fast & Furious Nissan Skyline GT-R',
    slug='fast-furious-skyline-gtr',
    description='Iconic blue Nissan Skyline GT-R from Fast & Furious franchise. Die-cast metal body with authentic details.',
    price=5.99,
    stock=50,
    featured=True,
    image_url='https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    images=['https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg']
)

Product.objects.create(
    category=cars,
    name='Classic Corvette Stingray',
    slug='classic-corvette-stingray',
    description='1963 Chevrolet Corvette Stingray in vibrant red. Premium Hot Wheels casting.',
    price=4.99,
    stock=75,
    featured=True,
    image_url='https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg',
    images=['https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg']
)

Product.objects.create(
    category=tracks,
    name='Ultimate Garage Track Set',
    slug='ultimate-garage-track-set',
    description='Multi-level parking garage with spiral ramp and launcher. Includes 2 cars.',
    price=79.99,
    stock=25,
    featured=True,
    image_url='https://images.pexels.com/photos/163729/pexels-photo-163729.jpeg',
    images=['https://images.pexels.com/photos/163729/pexels-photo-163729.jpeg']
)

Product.objects.create(
    category=collectibles,
    name='Gold Chrome Limited Edition',
    slug='gold-chrome-limited-edition',
    description='Rare gold chrome finish. Limited to 1000 pieces worldwide.',
    price=24.99,
    stock=10,
    featured=False,
    image_url='https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
    images=['https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg']
)

print("✅ Sample data created successfully!")
exit()
```

### Step 8: Start Django Development Server

```bash
python manage.py runserver
```

Server will start at: **http://localhost:8000**

✅ **Verification:**
- Visit http://localhost:8000/admin/ - You should see the admin login
- Visit http://localhost:8000/swagger/ - You should see API documentation
- Visit http://localhost:8000/api/products/ - You should see JSON product list

**Keep this terminal running!**

---

## ⚛️ PART 3: Frontend Setup (React)

### Step 1: Open New Terminal

Keep the backend server running and open a **new terminal window**.

### Step 2: Navigate to Project Root

```bash
cd /path/to/your/project
# (Not the backend folder - the root project folder)
```

### Step 3: Install Frontend Dependencies

```bash
npm install
```

This installs:
- React 18
- React Router DOM (for navigation)
- Axios (for API calls)
- Tailwind CSS (for styling)
- Lucide React (for icons)

### Step 4: Configure Environment Variables

Create a `.env` file in the **project root** (not backend):

```bash
cp .env.example .env
```

The `.env` should contain:

```env
VITE_API_URL=http://localhost:8000/api
```

### Step 5: Start React Development Server

```bash
npm run dev
```

Frontend will start at: **http://localhost:5173**

✅ **Verification:** Browser should automatically open showing the Hot Wheels homepage

---

## 🔗 PART 4: Connect Everything Together

Your setup is now complete! Here's how everything connects:

### Architecture Flow:

```
┌─────────────────┐      HTTP Requests       ┌──────────────────┐
│                 │   ─────────────────────>  │                  │
│  React Frontend │                           │  Django Backend  │
│  (Port 5173)    │   <─────────────────────  │  (Port 8000)     │
│                 │      JSON Responses       │                  │
└─────────────────┘                           └──────────────────┘
                                                       │
                                                       │ SQL Queries
                                                       ▼
                                               ┌──────────────────┐
                                               │   PostgreSQL DB  │
                                               │   hotwheels_db   │
                                               └──────────────────┘
```

### API Connection Points:

1. **Authentication:**
   - Login: `POST /api/auth/login/`
   - Signup: `POST /api/auth/signup/`
   - Logout: `POST /api/auth/logout/`
   - Current User: `GET /api/auth/user/`

2. **Products:**
   - List: `GET /api/products/`
   - Detail: `GET /api/products/{slug}/`
   - Featured: `GET /api/products/featured/`

3. **Cart (Requires Authentication):**
   - Get Cart: `GET /api/cart/`
   - Add Item: `POST /api/cart/`
   - Update: `PUT /api/cart/{id}/`
   - Remove: `DELETE /api/cart/{id}/`
   - Clear: `POST /api/cart/clear/`

4. **Orders (Requires Authentication):**
   - List Orders: `GET /api/orders/`
   - Create Order: `POST /api/orders/`
   - Order Detail: `GET /api/orders/{id}/`

---

## 🧪 PART 5: Testing the Application

### Test User Accounts:

**Admin Account:**
- Username: admin
- Password: (the password you set during superuser creation)
- Access: Can access admin panel at http://localhost:8000/admin/

### Testing Workflow:

1. **Visit Homepage:** http://localhost:5173
2. **Browse Products:** Click "Products" in navigation
3. **Sign Up:** Click "Login" → "Sign up" tab
   - Create a new account
4. **Add to Cart:** Click any product → "Add to Cart"
5. **View Cart:** Click cart icon (shows item count)
6. **Checkout:** Complete checkout process
7. **View Orders:** Navigate to "Orders" to see your purchase
8. **Test Refresh:** Refresh page - should stay on the same page!

### Database Verification:

Check your cart in the database:
```bash
psql -U hotwheels_user -d hotwheels_db
SELECT * FROM cart_items;
SELECT * FROM products;
SELECT * FROM orders;
\q
```

---

## 🚀 PART 6: Daily Development Workflow

### Starting Development:

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Stopping Development:

- Press `Ctrl + C` in both terminals
- Deactivate Python virtual environment: `deactivate`

---

## 📝 PART 7: Key Features Implemented

### ✅ User-Specific Carts
- Each user has their own cart stored in PostgreSQL
- Cart persists across sessions
- Automatic cart loading on login

### ✅ React Router Integration
- URL-based navigation
- Browser back/forward buttons work
- Page refresh stays on current page
- Protected routes for authenticated users

### ✅ Full API Integration
- All data from PostgreSQL database
- Real-time updates
- Secure authentication with tokens
- CORS configured for local development

### ✅ Responsive Design
- Mobile-friendly navigation
- Tailwind CSS styling
- Modern UI with animations

---

## 🛠️ PART 8: Troubleshooting

### Backend Issues:

**"No module named 'django'"**
```bash
# Make sure virtual environment is activated
source venv/bin/activate
pip install -r requirements.txt
```

**"FATAL: database does not exist"**
```bash
# Recreate database
psql postgres
CREATE DATABASE hotwheels_db;
\q
```

**"Port 8000 already in use"**
```bash
# Kill the process
lsof -ti:8000 | xargs kill -9
# Or use a different port
python manage.py runserver 8001
```

### Frontend Issues:

**"VITE_API_URL is not defined"**
- Make sure `.env` file exists in project root
- Restart `npm run dev` after creating `.env`

**"Network Error" when logging in**
- Verify Django backend is running at http://localhost:8000
- Check CORS settings in Django
- Verify `.env` has correct `VITE_API_URL`

**Products not loading**
- Check browser console for errors
- Verify backend API at http://localhost:8000/api/products/
- Make sure sample data was loaded

---

## 📚 PART 9: Project Structure

```
project/
├── backend/                    # Django Backend
│   ├── hotwheels_api/         # Django project settings
│   │   ├── settings.py        # Database config, CORS, etc.
│   │   └── urls.py            # Main URL routing
│   ├── shop/                  # Main Django app
│   │   ├── models.py          # Database models
│   │   ├── views.py           # API endpoints
│   │   ├── auth_views.py      # Authentication endpoints
│   │   ├── serializers.py     # Data serialization
│   │   ├── urls.py            # App URL routing
│   │   └── admin.py           # Admin panel config
│   ├── manage.py              # Django management
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Backend environment variables
│
├── src/                       # React Frontend
│   ├── components/            # Reusable components
│   │   └── Navbar.tsx         # Navigation bar
│   ├── contexts/              # React Context providers
│   │   ├── AuthContext.tsx    # User authentication
│   │   └── CartContext.tsx    # Shopping cart
│   ├── pages/                 # Page components
│   │   ├── HomePage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   └── ...
│   ├── services/              # API communication
│   │   └── api.ts             # Axios instance & endpoints
│   ├── App.tsx                # Main app component
│   └── main.tsx               # React entry point
│
├── .env                       # Frontend environment variables
├── package.json               # NPM dependencies
└── SETUP_GUIDE.md            # This file!
```

---

## 🎯 Next Steps

1. **Add More Products:** Use Django admin at http://localhost:8000/admin/
2. **Customize Styling:** Edit Tailwind classes in components
3. **Add Payment Integration:** Integrate Stripe or PayPal
4. **Deploy:** See deployment guides for production setup
5. **Add Tests:** Write unit tests for backend and frontend

---

## 📧 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure both servers are running
4. Check browser console and terminal for error messages

---

## ✨ Congratulations!

You now have a fully functional e-commerce platform with:
- ✅ React frontend with routing
- ✅ Django REST API backend
- ✅ PostgreSQL database
- ✅ User authentication
- ✅ User-specific shopping carts
- ✅ Complete product management
- ✅ Order processing
- ✅ Admin panel
- ✅ API documentation

**Happy coding! 🚗💨**
