export interface CategoryMeta {
  /** Lowercase slug used as a filter key and URL param */
  id: string;
  name: string;
  image: string;
  description: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80',
    description: 'Latest gadgets & tech',
  },
  {
    id: 'clothing',
    name: 'Clothing',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80',
    description: 'Premium fashion',
  },
  {
    id: 'home',
    name: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1538688525198-9b59884282c9?w=600&q=80',
    description: 'Elevate your space',
  },
  {
    id: 'beauty',
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
    description: 'Skincare & cosmetics',
  },
  {
    id: 'sports',
    name: 'Sports',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80',
    description: 'Gear up and perform',
  },
];
