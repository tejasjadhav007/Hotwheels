# Hot Wheels Shop - Django Backend

A Django REST Framework backend for the Hot Wheels e-commerce platform with PostgreSQL database.

## Features

- User-specific shopping carts with PostgreSQL persistence
- Product catalog management
- Order processing and tracking
- Contact message handling
- RESTful API with full CRUD operations
- Admin panel for managing products, orders, and messages
- Swagger/ReDoc API documentation

## Tech Stack

- **Python 3.10+**
- **Django 4.2.7**
- **Django REST Framework 3.14.0**
- **PostgreSQL** (database)
- **CORS support** for frontend integration

## Prerequisites

- Python 3.10 or higher
- PostgreSQL 12 or higher
- pip (Python package manager)

## Installation

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv

# On Linux/Mac
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Up PostgreSQL Database

Create a PostgreSQL database:

```sql
CREATE DATABASE hotwheels_db;
CREATE USER hotwheels_user WITH PASSWORD 'your_password';
ALTER ROLE hotwheels_user SET client_encoding TO 'utf8';
ALTER ROLE hotwheels_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE hotwheels_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE hotwheels_db TO hotwheels_user;
```

### 4. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DB_NAME=hotwheels_db
DB_USER=hotwheels_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
FRONTEND_URL=http://localhost:5173
```

### 5. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser (Admin)

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin account.

### 7. Load Sample Data (Optional)

```bash
python manage.py shell
```

```python
from shop.models import Category, Product

# Create categories
cars = Category.objects.create(name='Cars', slug='cars', description='Individual Hot Wheels die-cast cars')
tracks = Category.objects.create(name='Track Sets', slug='track-sets', description='Complete track sets for racing')
collectibles = Category.objects.create(name='Collectibles', slug='collectibles', description='Limited edition')

# Create sample products
Product.objects.create(
    category=cars,
    name='Fast & Furious Nissan Skyline GT-R',
    slug='fast-furious-skyline-gtr',
    description='Iconic blue Nissan Skyline GT-R',
    price=5.99,
    stock=50,
    featured=True
)
```

### 8. Run Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

### Products
- `GET /api/products/` - List all products
- `GET /api/products/{slug}/` - Get product details
- `GET /api/products/featured/` - Get featured products
- `POST /api/products/` - Create product (admin only)
- `PUT /api/products/{slug}/` - Update product (admin only)
- `DELETE /api/products/{slug}/` - Delete product (admin only)

### Categories
- `GET /api/categories/` - List all categories
- `GET /api/categories/{slug}/` - Get category details
- `POST /api/categories/` - Create category (admin only)

### Cart (Authenticated Users Only)
- `GET /api/cart/` - Get user's cart items
- `POST /api/cart/` - Add item to cart
- `PUT /api/cart/{id}/` - Update cart item quantity
- `DELETE /api/cart/{id}/` - Remove item from cart
- `POST /api/cart/clear/` - Clear entire cart
- `GET /api/cart/total/` - Get cart total

### Orders (Authenticated Users Only)
- `GET /api/orders/` - List user's orders
- `POST /api/orders/` - Create order from cart
- `GET /api/orders/{id}/` - Get order details
- `PATCH /api/orders/{id}/update_status/` - Update order status (admin)
- `PATCH /api/orders/{id}/add_tracking/` - Add tracking number (admin)

### Contact
- `POST /api/contact/` - Submit contact message
- `GET /api/contact/` - List messages (admin only)

## API Documentation

Once the server is running, visit:

- **Swagger UI**: http://localhost:8000/swagger/
- **ReDoc**: http://localhost:8000/redoc/

## Admin Panel

Access the Django admin panel at http://localhost:8000/admin/

Use the superuser credentials you created earlier.

## Database Schema

### Tables:
- **categories** - Product categories
- **products** - Product catalog
- **cart_items** - User shopping carts
- **orders** - Customer orders
- **order_items** - Items within orders
- **contact_messages** - Customer support messages

## Testing

Run tests with:

```bash
python manage.py test
```

## Deployment

For production deployment:

1. Set `DEBUG=False` in `.env`
2. Configure `ALLOWED_HOSTS` with your domain
3. Use a production-grade WSGI server like Gunicorn:

```bash
pip install gunicorn
gunicorn hotwheels_api.wsgi:application
```

4. Set up a reverse proxy with Nginx
5. Use environment variables for sensitive data
6. Enable HTTPS with SSL certificates

## Project Structure

```
backend/
├── hotwheels_api/          # Django project settings
│   ├── settings.py         # Main settings
│   ├── urls.py            # URL configuration
│   └── wsgi.py            # WSGI config
├── shop/                   # Main application
│   ├── models.py          # Database models
│   ├── views.py           # API views
│   ├── serializers.py     # DRF serializers
│   ├── urls.py            # App URLs
│   └── admin.py           # Admin configuration
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
└── .env.example          # Environment variables template
```

## Support

For issues or questions, contact admin@hotwheels.com
