export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  supplier: string;
}

export const products: Product[] = [
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