from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Product, CartItem, Order, OrderItem, ContactMessage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image_url', 'created_at']


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'category', 'category_name', 'name', 'slug',
            'description', 'price', 'stock', 'image_url', 'images',
            'featured', 'created_at', 'updated_at'
        ]


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True, source='get_total_price')

    class Meta:
        model = CartItem
        fields = ['id', 'user', 'product', 'product_id', 'quantity', 'total_price', 'created_at', 'updated_at']
        read_only_fields = ['user']

    def create(self, validated_data):
        user = self.context['request'].user
        product_id = validated_data.pop('product_id')
        product = Product.objects.get(id=product_id)

        cart_item, created = CartItem.objects.get_or_create(
            user=user,
            product=product,
            defaults={'quantity': validated_data.get('quantity', 1)}
        )

        if not created:
            cart_item.quantity += validated_data.get('quantity', 1)
            cart_item.save()

        return cart_item


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True, source='get_total_price')

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price_at_time', 'total_price', 'created_at']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'username', 'status', 'total_amount',
            'shipping_address', 'payment_status', 'payment_method',
            'tracking_number', 'items', 'created_at', 'updated_at'
        ]
        read_only_fields = ['user']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'user', 'name', 'email', 'subject', 'message', 'status', 'created_at']
        read_only_fields = ['user', 'status']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
