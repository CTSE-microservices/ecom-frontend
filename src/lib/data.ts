export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  description: string;
  specs?: Record<string, string>;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80',
    count: 12,
    description: 'Latest gadgets & tech',
  },
  {
    id: 'clothing',
    name: 'Clothing',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80',
    count: 10,
    description: 'Premium fashion',
  },
  {
    id: 'home',
    name: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1538688525198-9b59884282c9?w=600&q=80',
    count: 8,
    description: 'Elevate your space',
  },
  {
    id: 'beauty',
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
    count: 7,
    description: 'Skincare & cosmetics',
  },
  {
    id: 'sports',
    name: 'Sports',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80',
    count: 6,
    description: 'Gear up and perform',
  },
];

export const products: Product[] = [
  // Electronics
  {
    id: 'e1',
    name: 'AirPods Pro Max Ultra',
    price: 379,
    originalPrice: 549,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80',
    ],
    rating: 4.8,
    reviews: 2341,
    category: 'electronics',
    isSale: true,
    isBestSeller: true,
    description: 'Experience audio like never before with our premium wireless headphones. Featuring active noise cancellation, spatial audio, and up to 30 hours battery life in one stunning package.',
    specs: { 'Battery Life': '30 hours', 'Driver': '40mm Dynamic', 'ANC': 'Adaptive ANC', 'Connectivity': 'Bluetooth 5.3' },
    stock: 24,
  },
  {
    id: 'e2',
    name: 'Smart Watch Series X',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
    ],
    rating: 4.7,
    reviews: 1856,
    category: 'electronics',
    isNew: true,
    isSale: true,
    description: 'The ultimate smartwatch with advanced health monitoring, GPS, ECG, and a stunning AMOLED display. Stay connected and healthy in style.',
    specs: { 'Display': '1.9" AMOLED', 'Battery': '7 days', 'GPS': 'Multi-band', 'Water Resistance': '5ATM' },
    stock: 18,
  },
  {
    id: 'e3',
    name: 'ProCamera 8K Mirrorless',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80',
    ],
    rating: 4.9,
    reviews: 843,
    category: 'electronics',
    isBestSeller: true,
    description: 'Professional-grade mirrorless camera with 8K video, advanced autofocus, and weather sealing for creators who demand the best.',
    specs: { 'Sensor': '45MP Full-Frame', 'Video': '8K RAW', 'ISO': '100-51200', 'Shutter': '1/8000s' },
    stock: 9,
  },
  {
    id: 'e4',
    name: 'Wireless Charging Pad Pro',
    price: 89,
    originalPrice: 129,
    image: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=600&q=80',
    ],
    rating: 4.5,
    reviews: 1230,
    category: 'electronics',
    isSale: true,
    isNew: true,
    description: 'Charge up to 3 devices simultaneously with 15W fast wireless charging and a sleek, premium aluminum design.',
    specs: { 'Wattage': '15W Max', 'Compatibility': 'Qi / MagSafe', 'Devices': '3 simultaneous', 'Indicator': 'LED ring' },
    stock: 42,
  },
  {
    id: 'e5',
    name: 'Ultra-Slim Laptop 14"',
    price: 1199,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    ],
    rating: 4.6,
    reviews: 967,
    category: 'electronics',
    isNew: true,
    isSale: true,
    description: 'Featherlight yet powerful. 16-hour battery, 2K OLED display, and the latest processor in a 1.2kg body.',
    specs: { 'Processor': 'M3 Ultra', 'RAM': '16GB LPDDR5', 'Storage': '512GB NVMe', 'Display': '14" 2K OLED' },
    stock: 15,
  },
  {
    id: 'e6',
    name: 'True Wireless Earbuds Elite',
    price: 149,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
    ],
    rating: 4.4,
    reviews: 3102,
    category: 'electronics',
    isBestSeller: true,
    description: 'Crystal-clear audio with deep bass and premium ANC in a compact, comfortable true-wireless design.',
    specs: { 'Battery': '8h + 32h case', 'ANC': 'Hybrid ANC', 'Driver': '6mm Dynamic', 'Codec': 'LDAC / AAC' },
    stock: 60,
  },

  // Clothing
  {
    id: 'c1',
    name: 'Merino Wool Premium Tee',
    price: 89,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    ],
    rating: 4.7,
    reviews: 784,
    category: 'clothing',
    isNew: true,
    isBestSeller: true,
    description: 'Sustainably sourced 100% merino wool tee. Naturally temperature-regulating, odor-resistant, and incredibly soft.',
    specs: { 'Material': '100% Merino Wool', 'Fit': 'Regular', 'Care': 'Machine wash', 'Origin': 'New Zealand' },
    stock: 34,
  },
  {
    id: 'c2',
    name: 'Luxury Leather Jacket',
    price: 549,
    originalPrice: 749,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    ],
    rating: 4.9,
    reviews: 312,
    category: 'clothing',
    isSale: true,
    description: 'Hand-stitched Italian leather motorcycle jacket with satin lining and signature brass hardware.',
    specs: { 'Material': 'Full-grain Italian Leather', 'Lining': '100% Satin', 'Hardware': 'Brass', 'Fit': 'Slim' },
    stock: 8,
  },
  {
    id: 'c3',
    name: 'Technical Jogger Pants',
    price: 129,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
    ],
    rating: 4.5,
    reviews: 522,
    category: 'clothing',
    isNew: true,
    description: 'Ultra-stretch technical fabric with moisture-wicking and 6 pockets for urban athletes on the move.',
    specs: { 'Material': 'Polyamide-Elastane Blend', 'Pockets': '6 total', 'Water Resistance': 'DWR coated', 'Fit': 'Tapered' },
    stock: 28,
  },
  {
    id: 'c4',
    name: 'Oversized Hoodie Supreme',
    price: 119,
    originalPrice: 159,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
    ],
    rating: 4.6,
    reviews: 1089,
    category: 'clothing',
    isSale: true,
    isBestSeller: true,
    description: 'Oversized 400GSM fleece hoodie with a kangaroo pocket and custom embroidered logo. The ultimate comfortable luxury.',
    specs: { 'Material': '400GSM Fleece', 'Fit': 'Oversized', 'Weight': '680g', 'Color Options': '8 colorways' },
    stock: 45,
  },

  // Home
  {
    id: 'h1',
    name: 'Scented Candle Collection',
    price: 69,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
    ],
    rating: 4.8,
    reviews: 2108,
    category: 'home',
    isBestSeller: true,
    description: 'Artisan hand-poured soy wax candles in signature amber jars. Set of 3 with 60h burn time each.',
    specs: { 'Material': 'Coconut-Soy Wax', 'Burn Time': '60 hours each', 'Set': '3 candles', 'Scents': 'Oud / Sandalwood / Cedar' },
    stock: 50,
  },
  {
    id: 'h2',
    name: 'Plush Sofa Set Modern',
    price: 2199,
    originalPrice: 2899,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    ],
    rating: 4.7,
    reviews: 176,
    category: 'home',
    isSale: true,
    description: 'Italian velvet 3-seater sofa with solid ash wood legs. The centerpiece your living room deserves.',
    specs: { 'Material': 'Italian Velvet', 'Frame': 'Solid Ash', 'Seating': '3-seater', 'Dimensions': '220cm W × 85cm H' },
    stock: 5,
  },
  {
    id: 'h3',
    name: 'Smart LED Floor Lamp',
    price: 189,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    ],
    rating: 4.5,
    reviews: 634,
    category: 'home',
    isNew: true,
    description: 'App-controlled LED floor lamp with 16M colors, sunrise/sunset modes and music sync built in.',
    specs: { 'Bulb Life': '25,000 hours', 'Colors': '16 million', 'App': 'iOS & Android', 'Wattage': '18W' },
    stock: 22,
  },
  {
    id: 'h4',
    name: 'Artisan Coffee Grinder',
    price: 249,
    originalPrice: 329,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    ],
    rating: 4.9,
    reviews: 891,
    category: 'home',
    isSale: true,
    description: 'Precision burr grinder with 40 grind settings, timer, and a brushed stainless steel finish. For the coffee purist.',
    specs: { 'Grind Settings': '40 steps', 'Burr': 'Titanium-coated', 'Motor': 'DC motor', 'Hopper': '250g capacity' },
    stock: 17,
  },

  // Beauty
  {
    id: 'b1',
    name: 'Vitamin C Glow Serum',
    price: 79,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    ],
    rating: 4.8,
    reviews: 4231,
    category: 'beauty',
    isBestSeller: true,
    description: '20% Vitamin C + Hyaluronic Acid + Niacinamide serum clinically proven to brighten skin in 14 days.',
    specs: { 'Key Actives': '20% Vit-C, HA, Nia', 'Size': '30ml', 'Skin Type': 'All types', 'Cruelty-Free': 'Yes' },
    stock: 80,
  },
  {
    id: 'b2',
    name: 'Luxe Perfume Noir Collection',
    price: 219,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
    ],
    rating: 4.9,
    reviews: 1024,
    category: 'beauty',
    isNew: true,
    description: 'An intoxicating blend of oud, rose, and Madagascan vanilla. Eau de Parfum with 12-hour longevity.',
    specs: { 'Type': 'Eau de Parfum', 'Concentration': '20%', 'Size': '100ml', 'Longevity': '12+ hours' },
    stock: 30,
  },
  {
    id: 'b3',
    name: 'Hydrating Face Mask Set',
    price: 49,
    originalPrice: 69,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
    ],
    rating: 4.6,
    reviews: 2567,
    category: 'beauty',
    isSale: true,
    description: 'Premium sheet mask collection featuring 5 targeted treatments: hydrating, brightening, firming, soothing, and pore-minimizing.',
    specs: { 'Count': '5 masks', 'Key Ingredient': 'Hyaluronic Acid', 'Time': '20 min each', 'Set': '5 variants' },
    stock: 120,
  },

  // Sports
  {
    id: 's1',
    name: 'Carbon Fiber Road Bike',
    price: 3499,
    originalPrice: 4299,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
    rating: 4.9,
    reviews: 243,
    category: 'sports',
    isSale: true,
    isBestSeller: true,
    description: 'Ultra-lightweight T700 carbon frame road bike with Shimano Ultegra groupset and tubeless-ready wheels.',
    specs: { 'Frame': 'T700 Carbon', 'Groupset': 'Shimano Ultegra', 'Weight': '7.4kg', 'Sizes': 'XS-XL' },
    stock: 6,
  },
  {
    id: 's2',
    name: 'Performance Yoga Mat Pro',
    price: 119,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    ],
    rating: 4.7,
    reviews: 1893,
    category: 'sports',
    isNew: true,
    description: '6mm natural rubber yoga mat with alignment lines, anti-slip surface, and antibacterial coating.',
    specs: { 'Material': 'Natural Rubber', 'Thickness': '6mm', 'Weight': '2.1kg', 'Dimensions': '183 × 61cm' },
    stock: 55,
  },
  {
    id: 's3',
    name: 'Adjustable Dumbbell Set',
    price: 349,
    originalPrice: 449,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    ],
    rating: 4.8,
    reviews: 728,
    category: 'sports',
    isSale: true,
    description: 'Space-efficient adjustable dumbbells with 15 weight settings (2.5–35kg each) and quick-lock mechanism.',
    specs: { 'Weight Range': '2.5–35kg', 'Settings': '15 levels', 'Material': 'Steel + Rubber', 'Lock': 'Quick-lock' },
    stock: 14,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isBestSeller).slice(0, 8);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew).slice(0, 8);
}

export function getRelatedProducts(product: Product): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);
}
