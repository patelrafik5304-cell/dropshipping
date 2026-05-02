"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../data/products';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };
      } else {
        const newItem: CartItem = { ...action.payload, quantity: 1 };
        const newItems = [...state.items, newItem];
        return {
          items: newItems,
          total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };
      }
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.id });
      }
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Products Context
interface ProductsState {
  products: Product[];
}

type ProductsAction =
  | { type: 'ADD_PRODUCT'; payload: Omit<Product, 'id'> }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string };

const productsReducer = (state: ProductsState, action: ProductsAction): ProductsState => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const newProduct: Product = {
        ...action.payload,
        id: Date.now().toString(),
        rating: 0,
        reviews: 0,
        inStock: true
      };
      return {
        products: [...state.products, newProduct]
      };
    }
    case 'UPDATE_PRODUCT': {
      return {
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    }
    case 'DELETE_PRODUCT': {
      return {
        products: state.products.filter(product => product.id !== action.payload)
      };
    }
    default:
      return state;
  }
};

const ProductsContext = createContext<{
  state: ProductsState;
  dispatch: React.Dispatch<ProductsAction>;
} | null>(null);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialProducts = [
    {
      id: "thermostat-1",
      name: "Smart WiFi Thermostat",
      category: "thermostats",
      price: 7500,
      originalPrice: 10800,
      description: "Energy-efficient smart thermostat with voice control and mobile app. Compatible with Alexa and Google Home.",
      features: [
        "WiFi connectivity",
        "Voice control compatible",
        "Energy saving mode",
        "Mobile app control",
        "7-day programmable schedule",
        "Large touchscreen display"
      ],
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
      rating: 4.5,
      reviews: 128,
      inStock: true,
      supplier: "CJdropshipping"
    },
    {
      id: "camera-1",
      name: "Wireless Security Camera 1080p",
      category: "cameras",
      price: 6650,
      description: "HD wireless security camera with night vision, motion detection, and cloud storage.",
      features: [
        "1080p HD video",
        "Night vision up to 30ft",
        "Motion detection alerts",
        "Two-way audio",
        "Cloud storage included",
        "Weatherproof design"
      ],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      rating: 4.3,
      reviews: 95,
      inStock: true,
      supplier: "AliExpress"
    },
    {
      id: "light-1",
      name: "Smart LED Light Bulb RGB",
      category: "lighting",
      price: 2080,
      originalPrice: 3330,
      description: "Color-changing smart LED bulb with millions of colors and voice control.",
      features: [
        "16 million colors",
        "Voice control",
        "Dimmable",
        "App control",
        "Energy efficient",
        "Easy installation"
      ],
      image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400",
      rating: 4.7,
      reviews: 203,
      inStock: true,
      supplier: "Spocket"
    },
    {
      id: "thermostat-2",
      name: "Learning Thermostat Pro",
      category: "thermostats",
      price: 12500,
      description: "AI-powered thermostat that learns your preferences and optimizes energy usage.",
      features: [
        "AI learning algorithm",
        "Energy reports",
        "Remote sensors included",
        "C-wire required",
        "Smart home integration",
        "Touchscreen interface"
      ],
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
      rating: 4.8,
      reviews: 67,
      inStock: true,
      supplier: "Modalyst"
    },
    {
      id: "camera-2",
      name: "Indoor Smart Camera with AI",
      category: "cameras",
      price: 5000,
      description: "AI-powered indoor camera with person detection and smart alerts.",
      features: [
        "AI person detection",
        "1080p video",
        "Smart alerts",
        "Night vision",
        "Local storage option",
        "Privacy mode"
      ],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
      rating: 4.4,
      reviews: 156,
      inStock: true,
      supplier: "CJdropshipping"
    },
    {
      id: "light-2",
      name: "Smart Light Strip 16ft",
      category: "lighting",
      price: 2920,
      description: "Flexible LED light strip with app control and music sync.",
      features: [
        "16ft length",
        "Music sync",
        "App control",
        "16 million colors",
        "Easy installation",
        "Timer function"
      ],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      supplier: "AliExpress"
    }
  ];

  const [state, dispatch] = useReducer(productsReducer, { products: initialProducts });

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

// Orders Context
interface OrderItem extends CartItem {}

interface Order {
  id: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  total: number;
  tax: number;
  grandTotal: number;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

interface OrdersState {
  orders: Order[];
}

type OrdersAction =
  | { type: 'ADD_ORDER'; payload: Omit<Order, 'id' | 'createdAt'> }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status'] } };

const ordersReducer = (state: OrdersState, action: OrdersAction): OrdersState => {
  switch (action.type) {
    case 'ADD_ORDER': {
      const newOrder: Order = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      return {
        orders: [newOrder, ...state.orders]
      };
    }
    case 'UPDATE_ORDER_STATUS': {
      return {
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status }
            : order
        )
      };
    }
    default:
      return state;
  }
};

const OrdersContext = createContext<{
  state: OrdersState;
  dispatch: React.Dispatch<OrdersAction>;
} | null>(null);

export const OrdersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, { orders: [] });

  return (
    <OrdersContext.Provider value={{ state, dispatch }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};