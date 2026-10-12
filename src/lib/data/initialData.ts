export interface InitialCategory {
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  itemCount: number;
}

export interface InitialProduct {
  id?: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: string; // slug
  images: string[];
  ingredients: string[];
  weightOptions: { label: string; price: number }[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isAvailable: boolean;
  stock: number;
  tags: string[];
  rating: number;
  reviewCount: number;
}

export const INITIAL_CATEGORIES: InitialCategory[] = [
  {
    name: 'Milk Sweets',
    slug: 'milk-sweets',
    description: 'Velvety mawa delicacies, rich pedas, and traditional slow-simmered milk confectionery.',
    image: '/images/milk-cake.jpg',
    isActive: true,
    itemCount: 4,
  },
  {
    name: 'Bengali Sweets',
    slug: 'bengali-sweets',
    description: 'Spongy chhena wonders soaked in fragrant saffron and cardamom-infused nectar.',
    image: '/images/rasgulla.jpg',
    isActive: true,
    itemCount: 3,
  },
  {
    name: 'Dry Fruit Sweets',
    slug: 'dry-fruit-sweets',
    description: 'Guilt-free royal treats made with Goan cashews, Iranian pistachios, and Californian almonds.',
    image: '/images/kaju-katli.jpg',
    isActive: true,
    itemCount: 4,
  },
  {
    name: 'Traditional Mithai',
    slug: 'traditional-mithai',
    description: 'Centuries-old heritage recipes crafted with 100% pure Bilona desi ghee.',
    image: '/images/motichoor-ladoo.jpg',
    isActive: true,
    itemCount: 4,
  },
  {
    name: 'Namkeen',
    slug: 'namkeen',
    description: 'Crisp, savory snacks made with cold-pressed oils and hand-ground spices.',
    image: '/images/hero-sweets.jpg',
    isActive: true,
    itemCount: 2,
  },
  {
    name: 'Gift Boxes',
    slug: 'gift-boxes',
    description: 'Regal handcrafted packaging for weddings, corporate gifting, and sacred celebrations.',
    image: '/images/dry-fruit-box.jpg',
    isActive: true,
    itemCount: 3,
  },
];

export const INITIAL_PRODUCTS: InitialProduct[] = [
  {
    name: 'Kaju Katli',
    slug: 'kaju-katli',
    description:
      'Our crowning jewel. Handcrafted from premium grade whole Goan cashews, slow-ground and cooked with minimum organic sugar to create delicate melt-in-mouth diamond slices, finished with pure vegetarian silver leaf (chandi vark).',
    shortDescription: 'Diamond-cut royal cashew fudge finished with pure silver leaf.',
    price: 320,
    compareAtPrice: 350,
    category: 'dry-fruit-sweets',
    images: ['/images/kaju-katli.jpg', '/images/hero-sweets.jpg'],
    ingredients: ['Whole Cashew Nuts (Kaju)', 'Refined Sugar', 'Cardamom', 'Vegetarian Silver Leaf'],
    weightOptions: [
      { label: '250g', price: 320 },
      { label: '500g', price: 620 },
      { label: '1kg', price: 1200 },
    ],
    isFeatured: true,
    isBestSeller: true,
    isAvailable: true,
    stock: 85,
    tags: ['Kaju', 'Silver Leaf', 'Diwali Special', 'Festive', 'Dry Fruit'],
    rating: 4.9,
    reviewCount: 148,
  },
  {
    name: 'Motichoor Ladoo',
    slug: 'motichoor-ladoo',
    description:
      'Micro-fine pearls of Bengal gram flour fried in 100% pure desi cow ghee, delicately immersed in saffron-infused warm sugar syrup, blended with roasted melon seeds (magaz) and slivered green pistachios.',
    shortDescription: 'Tiny golden gram pearls soaked in pure saffron and desi ghee.',
    price: 190,
    compareAtPrice: 210,
    category: 'traditional-mithai',
    images: ['/images/motichoor-ladoo.jpg', '/images/hero-sweets.jpg'],
    ingredients: ['Gram Flour (Besan)', 'Pure Desi Ghee', 'Saffron (Kesar)', 'Melon Seeds', 'Sugar', 'Cardamom'],
    weightOptions: [
      { label: '250g', price: 190 },
      { label: '500g', price: 360 },
      { label: '1kg', price: 680 },
    ],
    isFeatured: true,
    isBestSeller: true,
    isAvailable: true,
    stock: 120,
    tags: ['Desi Ghee', 'Prasad', 'Pooja', 'Ladoo', 'Traditional'],
    rating: 4.9,
    reviewCount: 210,
  },
  {
    name: 'Shahi Gulab Jamun',
    slug: 'shahi-gulab-jamun',
    description:
      'Plump, velvety spheres of slow-reduced whole milk mawa and soft paneer, fried to golden-caramel perfection in desi ghee and steeped in rose petal and green cardamom scented warm sugar syrup.',
    shortDescription: 'Mawa dumplings soaked in rose water and cardamom nectar.',
    price: 180,
    compareAtPrice: 200,
    category: 'milk-sweets',
    images: ['/images/gulab-jamun.jpg'],
    ingredients: ['Khoya (Mawa)', 'Fresh Chhena', 'Pure Ghee', 'Rose Water', 'Cardamom', 'Sugar', 'Pistachios'],
    weightOptions: [
      { label: '250g (approx 6 pcs)', price: 180 },
      { label: '500g (approx 12 pcs)', price: 340 },
      { label: '1kg (approx 24 pcs)', price: 650 },
    ],
    isFeatured: true,
    isBestSeller: true,
    isAvailable: true,
    stock: 65,
    tags: ['Gulab Jamun', 'Hot Dessert', 'Mawa', 'Celebration'],
    rating: 4.8,
    reviewCount: 95,
  },
  {
    name: 'Kolkata Sponge Rasgulla',
    slug: 'kolkata-sponge-rasgulla',
    description:
      'Authentic Bengal-style spongy spheres crafted from fresh hand-kneaded cow milk chhena. Cooked in light, clear cardamom-perfumed sugar syrup for an airy, bouncy texture that bursts with sweet syrup with every bite.',
    shortDescription: 'Authentic Bengali soft spongy chhena balls in clear syrup.',
    price: 170,
    compareAtPrice: 190,
    category: 'bengali-sweets',
    images: ['/images/rasgulla.jpg'],
    ingredients: ['Fresh Cow Milk Chhena', 'Refined Cane Sugar', 'Water', 'Green Cardamom'],
    weightOptions: [
      { label: '500g (approx 8 pcs)', price: 170 },
      { label: '1kg (approx 16 pcs)', price: 320 },
    ],
    isFeatured: true,
    isBestSeller: false,
    isAvailable: true,
    stock: 50,
    tags: ['Bengali', 'Rasgulla', 'Chhena', 'Light Dessert'],
    rating: 4.7,
    reviewCount: 78,
  },
  {
    name: 'Royal Kesar Rasmalai',
    slug: 'royal-kesar-rasmalai',
    description:
      'Tender discs of cottage cheese simmered in lightly sweet syrup, then chilled in a rich, slow-simmered saffron rabdi cream. Garnished lavishly with Persian saffron threads and hand-sliced pistachios.',
    shortDescription: 'Chhena discs submerged in creamy saffron pistachio rabdi.',
    price: 240,
    compareAtPrice: 260,
    category: 'bengali-sweets',
    images: ['/images/rasmalai.jpg'],
    ingredients: ['Fresh Chhena', 'Full Cream Milk', 'Kashmiri Kesar', 'Pistachios', 'Almonds', 'Cardamom'],
    weightOptions: [
      { label: '250g (4 pcs)', price: 240 },
      { label: '500g (8 pcs)', price: 460 },
      { label: '1kg (16 pcs)', price: 880 },
    ],
    isFeatured: true,
    isBestSeller: true,
    isAvailable: true,
    stock: 40,
    tags: ['Chilled', 'Rasmalai', 'Kesar', 'Pistachio', 'Bengali'],
    rating: 5.0,
    reviewCount: 164,
  },
  {
    name: 'Desi Ghee Besan Ladoo',
    slug: 'desi-ghee-besan-ladoo',
    description:
      'Coarsely stone-ground gram flour (laddu besan) roasted patiently for hours in fragrant desi ghee until nutty and golden brown. Blended with boora sugar, crushed green cardamoms, and toasted cashew pieces.',
    shortDescription: 'Rich slow-roasted nutty gram flour laddoos with dry fruits.',
    price: 180,
    compareAtPrice: 200,
    category: 'traditional-mithai',
    images: ['/images/besan-ladoo.jpg'],
    ingredients: ['Coarse Gram Flour', 'Pure Desi Cow Ghee', 'Boora Sugar', 'Cashews', 'Cardamom'],
    weightOptions: [
      { label: '250g', price: 180 },
      { label: '500g', price: 340 },
      { label: '1kg', price: 650 },
    ],
    isFeatured: false,
    isBestSeller: true,
    isAvailable: true,
    stock: 75,
    tags: ['Besan', 'Desi Ghee', 'Traditional', 'Homestyle'],
    rating: 4.8,
    reviewCount: 88,
  },
  {
    name: 'Alwar Special Milk Cake',
    slug: 'alwar-special-milk-cake',
    description:
      'Classic Rajasthani Alwar-style Kalakand fudge made by caramelizing continuous full-cream milk reductions. Features the iconic dual tone - rich roasted brown center and delicate ivory edges, sprinkled with slivered pistachios.',
    shortDescription: 'Caramelized grainy milk fudge with authentic dual-tone center.',
    price: 210,
    compareAtPrice: 230,
    category: 'milk-sweets',
    images: ['/images/milk-cake.jpg'],
    ingredients: ['Full Cream Milk', 'Sugar', 'Pure Ghee', 'Alum (natural coagulant)', 'Pistachio'],
    weightOptions: [
      { label: '250g', price: 210 },
      { label: '500g', price: 400 },
      { label: '1kg', price: 780 },
    ],
    isFeatured: false,
    isBestSeller: true,
    isAvailable: true,
    stock: 55,
    tags: ['Milk Cake', 'Kalakand', 'Rajasthan', 'Desi Sweet'],
    rating: 4.9,
    reviewCount: 112,
  },
  {
    name: 'Royal Soan Papdi',
    slug: 'royal-soan-papdi',
    description:
      'Delicate, airy, multi-layered flaky cubes that instantly melt in the mouth. Spun from hand-pulled sugar strands and roasted gram flour cooked in pure ghee, topped generously with roasted almonds and pistachio slivers.',
    shortDescription: 'Airy, flaky melt-in-mouth cubes with almonds and pistachios.',
    price: 160,
    compareAtPrice: 180,
    category: 'traditional-mithai',
    images: ['/images/soan-papdi.jpg'],
    ingredients: ['Gram Flour', 'All-Purpose Flour', 'Desi Ghee', 'Sugar', 'Almonds', 'Pistachios', 'Cardamom'],
    weightOptions: [
      { label: '250g', price: 160 },
      { label: '500g', price: 300 },
      { label: '1kg', price: 580 },
    ],
    isFeatured: false,
    isBestSeller: false,
    isAvailable: true,
    stock: 90,
    tags: ['Soan Papdi', 'Flaky', 'Gift Box', 'Melt In Mouth'],
    rating: 4.6,
    reviewCount: 62,
  },
  {
    name: 'Shahi Dry Fruit & Nut Hamper',
    slug: 'shahi-dry-fruit-and-nut-hamper',
    description:
      'An opulent festive gift presentation. Includes artisan Anjeer (Fig) Barfi, Kaju Pista Roll, Almond Bites, and hand-selected jumbo roasted cashews. Housed in a custom gold-embossed regal maroon keepsake gift box.',
    shortDescription: 'Luxury keepsake box of artisan dry fruit bites and roasted nuts.',
    price: 850,
    compareAtPrice: 950,
    category: 'gift-boxes',
    images: ['/images/dry-fruit-box.jpg', '/images/assorted-box.jpg'],
    ingredients: ['Figs (Anjeer)', 'Cashews', 'Almonds', 'Pistachios', 'Honey', 'Cardamom'],
    weightOptions: [
      { label: '500g Luxury Box', price: 850 },
      { label: '1kg Royal Box', price: 1600 },
    ],
    isFeatured: true,
    isBestSeller: true,
    isAvailable: true,
    stock: 45,
    tags: ['Gifting', 'Diwali Box', 'Dry Fruit', 'No Added Sugar', 'Hamper'],
    rating: 5.0,
    reviewCount: 89,
  },
  {
    name: 'Assorted Festive Mithai Thali Box',
    slug: 'assorted-festive-mithai-box',
    description:
      'A curated 16-piece celebration box bringing together Sangita Mithai’s finest creations: Kaju Katli, Peda, Kesar Peda, Besan Ladoo, and Dry Fruit Barfi in one sumptuous satin-lined packaging.',
    shortDescription: 'Festive collection of 16 signature sweets in satin packaging.',
    price: 650,
    compareAtPrice: 720,
    category: 'gift-boxes',
    images: ['/images/assorted-box.jpg', '/images/hero-sweets.jpg'],
    ingredients: ['Assorted Milk Solids', 'Cashews', 'Pistachios', 'Desi Ghee', 'Saffron', 'Sugar'],
    weightOptions: [
      { label: '500g (16 pcs)', price: 650 },
      { label: '1kg (32 pcs)', price: 1250 },
    ],
    isFeatured: true,
    isBestSeller: true,
    isAvailable: true,
    stock: 60,
    tags: ['Assorted', 'Festival', 'Wedding Gifting', 'Signature'],
    rating: 4.9,
    reviewCount: 130,
  },
];
