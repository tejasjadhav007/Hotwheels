from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, ProductViewSet, CartItemViewSet,
    OrderViewSet, ContactMessageViewSet
)
from .auth_views import login_view, logout_view, signup_view, current_user_view

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'cart', CartItemViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'contact', ContactMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', login_view, name='login'),
    path('auth/logout/', logout_view, name='logout'),
    path('auth/signup/', signup_view, name='signup'),
    path('auth/user/', current_user_view, name='current_user'),
]
