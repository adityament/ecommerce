export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  description: string;
  specifications: string[];
  benefits: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  orderDate: string;
  deliveryAddress: Address;
}

export interface Address {
  id?: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  addresses: Address[];
}

// Dummy Products
export const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'ProMax 3000 - Advanced Fat Burner',
    price: 45999,
    rating: 4.8,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop',
    category: 'Fat Burn',
    description: 'Premium weight loss machine with AI-powered monitoring and adaptive resistance. Perfect for intensive fat burning.',
    specifications: [
      'Power: 3000W',
      'Weight Capacity: 150kg',
      'Display: Smart Touch Screen',
      'Resistance Levels: 20',
      'Dimensions: 200x100x80cm',
      'Warranty: 3 Years'
    ],
    benefits: ['Burns up to 800 calories/hour', 'AI Smart Monitoring', 'Adaptive Resistance', 'Full Body Workout']
  },
  {
    id: '2',
    name: 'BodyTone Elite - Smart Shaping',
    price: 38999,
    rating: 4.6,
    reviews: 287,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop',
    category: 'Body Shaping',
    description: 'Comprehensive body shaping machine with precision targeting. Ideal for sculpting and toning.',
    specifications: [
      'Power: 2500W',
      'Weight Capacity: 140kg',
      'Display: LED Display',
      'Programs: 50+',
      'Dimensions: 180x90x75cm',
      'Warranty: 2 Years'
    ],
    benefits: ['Targeted Muscle Toning', '50+ Workout Programs', 'Low Impact Exercise', 'Progress Tracking']
  },
  {
    id: '3',
    name: 'FitPulse Ultra - Cardio Master',
    price: 52999,
    rating: 4.9,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=500&h=500&fit=crop',
    category: 'Fat Burn',
    description: 'Ultimate cardio machine with heart rate monitoring and interval training modes.',
    specifications: [
      'Power: 3500W',
      'Weight Capacity: 160kg',
      'Display: Touchscreen with Apps',
      'Heart Rate Monitor: Built-in',
      'Dimensions: 210x110x85cm',
      'Warranty: 5 Years'
    ],
    benefits: ['Heart Rate Monitoring', 'Interval Training Modes', 'Max Calorie Burn', 'Entertainment Features']
  },
  {
    id: '4',
    name: 'ToneMax 2000 - Precision Sculpting',
    price: 34999,
    rating: 4.5,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop',
    category: 'Body Shaping',
    description: 'Precision body sculpting machine with micro-adjustment controls.',
    specifications: [
      'Power: 2000W',
      'Weight Capacity: 130kg',
      'Display: Digital Display',
      'Adjustment Levels: 30',
      'Dimensions: 170x85x70cm',
      'Warranty: 2 Years'
    ],
    benefits: ['Micro-Precision Adjustments', 'Compact Design', 'Quiet Operation', 'Quick Setup']
  },
  {
    id: '5',
    name: 'SmartFit Pro - Intelligent Monitoring',
    price: 48999,
    rating: 4.7,
    reviews: 325,
    image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=500&h=500&fit=crop',
    category: 'Smart Monitoring',
    description: 'Next-gen machine with AI-powered real-time monitoring and personalized coaching.',
    specifications: [
      'Power: 3200W',
      'Weight Capacity: 155kg',
      'AI Coach: Yes',
      'App Integration: Yes',
      'Dimensions: 205x105x82cm',
      'Warranty: 4 Years'
    ],
    benefits: ['AI Personal Coach', 'Real-time Monitoring', 'App Integration', 'Personalized Programs']
  },
  {
    id: '6',
    name: 'CompactFit 500 - Space Saver',
    price: 24999,
    rating: 4.3,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    category: 'Body Shaping',
    description: 'Compact yet powerful machine perfect for home gyms with limited space.',
    specifications: [
      'Power: 1500W',
      'Weight Capacity: 120kg',
      'Display: Basic LED',
      'Programs: 20',
      'Dimensions: 150x70x65cm',
      'Warranty: 1 Year'
    ],
    benefits: ['Space Efficient', 'Easy Storage', 'Affordable Price', 'Portable Design']
  },
];

// Dummy User for Login
export const dummyUser: User = {
  id: '1',
  name: 'John Fitness',
  email: 'john@example.com',
  addresses: [
    {
      id: '1',
      fullName: 'John Fitness',
      phoneNumber: '+91-9876543210',
      address: '123 Main Street, Apartment 4B',
      city: 'New York',
      state: 'NY',
      pincode: '10001'
    }
  ]
};

// Dummy Login Credentials
export const dummyCredentials = {
  email: 'john@example.com',
  password: 'password123'
};

// Dummy Orders
export const dummyOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [
      {
        id: '1',
        productId: '1',
        quantity: 1,
        product: dummyProducts[0]
      }
    ],
    totalPrice: 45999,
    status: 'delivered',
    orderDate: '2024-03-15',
    deliveryAddress: dummyUser.addresses[0]
  },
  {
    id: 'ORD-002',
    userId: '1',
    items: [
      {
        id: '2',
        productId: '3',
        quantity: 1,
        product: dummyProducts[2]
      }
    ],
    totalPrice: 52999,
    status: 'shipped',
    orderDate: '2024-04-10',
    deliveryAddress: dummyUser.addresses[0]
  }
];

export const categories = ['All', 'Fat Burn', 'Body Shaping', 'Smart Monitoring'];
