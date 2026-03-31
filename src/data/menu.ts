export type Category = 'Snacks' | 'Dosa' | 'Pav Bhaji' | 'Sandwiches' | 'Pizza' | 'Soups' | 'Chinese' | 'Punjabi' | 'Biryani' | 'Beverages' | 'Desserts'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: Category
  isJainAvailable: boolean
  isBestseller: boolean
  image: string
}

export const menuCategories: Category[] = [
  'Snacks', 'Dosa', 'Pav Bhaji', 'Sandwiches', 'Pizza', 
  'Soups', 'Chinese', 'Punjabi', 'Biryani', 'Beverages', 'Desserts'
]

export const menuData: MenuItem[] = [
  {
    id: 'm1',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato curry.',
    price: 149,
    category: 'Dosa',
    isJainAvailable: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm2',
    name: 'Cheese Pav Bhaji',
    description: 'Spicy mixed vegetable mash topped with melting cheese.',
    price: 189,
    category: 'Pav Bhaji',
    isJainAvailable: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm3',
    name: 'Paneer Butter Masala',
    description: 'Rich and creamy curry made with paneer, spices, onions, tomatoes, cashews and butter.',
    price: 320,
    category: 'Punjabi',
    isJainAvailable: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm4',
    name: 'Veg Hakka Noodles',
    description: 'Flavourful noodles tossed with vegetables and Chinese sauces.',
    price: 240,
    category: 'Chinese',
    isJainAvailable: false,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm5',
    name: 'Butter Naan',
    description: 'Soft and fluffy Indian bread cooked in a tandoor, brushed with butter.',
    price: 60,
    category: 'Punjabi',
    isJainAvailable: true,
    isBestseller: false,
    image: 'https://images.unsplash.com/photo-1626200419199-391ae8be7a99?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm6',
    name: 'Veg Dum Biryani',
    description: 'Layers of long grain basmati rice and mixed vegetables cooked under pressure.',
    price: 290,
    category: 'Biryani',
    isJainAvailable: false,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm7',
    name: 'Margherita Pizza',
    description: 'Classic cheese and tomato pizza on a thin crust.',
    price: 250,
    category: 'Pizza',
    isJainAvailable: true,
    isBestseller: false,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm8',
    name: 'Fresh Lime Soda',
    description: 'Refreshing sweet and salt lime water.',
    price: 90,
    category: 'Beverages',
    isJainAvailable: true,
    isBestseller: false,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600'
  },
]
