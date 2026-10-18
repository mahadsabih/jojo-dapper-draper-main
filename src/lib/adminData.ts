// CMS data layer - shared between admin dashboard and frontend
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import suitingImage from "@/assets/collection-suiting.jpg";
import shirtingImage from "@/assets/collection-shirting.jpg";
import casualImage from "@/assets/collection-casual.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  collection: string;
  status: "active" | "draft" | "archived";
  inventory: number;
  image: string; // @deprecated Use images[0] instead
  images: string[];
  description: string;
  details: string[];
  composition: string;
  width: string;
  weight: string;
  origin: string;
  isNew?: boolean;
  isSale?: boolean;
  createdAt: string;
  sortOrder: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  productCount: number;
  image: string;
  status: "active" | "draft";
  sortOrder: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: number;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  createdAt: string;
}

export interface ContentPage {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft";
  lastModified: string;
  content: string;
  sortOrder: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

// Initial mock data with full product details for frontend
const initialProducts: Product[] = [
  {
    id: "italian-herringbone",
    name: "Italian Herringbone Wool",
    price: 189,
    collection: "Suiting",
    status: "active",
    inventory: 45,
    image: product1,
    images: [product1, product2], // Mocking multiple images
    description: "A timeless herringbone pattern in luxurious Italian wool. Perfect for creating sophisticated suits that command attention in any boardroom.",
    details: [
      "Premium Italian wool from Biella region",
      "Classic herringbone weave pattern",
      "Medium weight suitable for year-round wear",
      "Natural stretch for comfort",
    ],
    composition: "100% Wool",
    width: "150 cm",
    weight: "280 g/m²",
    origin: "Italy",
    isNew: true,
    createdAt: "2024-01-15",
    sortOrder: 1,
  },
  {
    id: "navy-twill",
    name: "Navy Super 120s Twill",
    price: 225,
    collection: "Suiting",
    status: "active",
    inventory: 38,
    image: product2,
    images: [product2, product3],
    description: "Ultra-fine Super 120s wool in a classic navy twill. The epitome of refined elegance for the modern gentleman.",
    details: [
      "Super 120s merino wool",
      "Diagonal twill weave",
      "Lightweight yet durable",
      "Excellent drape",
    ],
    composition: "100% Merino Wool",
    width: "150 cm",
    weight: "250 g/m²",
    origin: "England",
    createdAt: "2024-01-10",
    sortOrder: 2,
  },
  {
    id: "egyptian-cotton",
    name: "Egyptian Cotton Poplin",
    price: 85,
    collection: "Shirting",
    status: "active",
    inventory: 120,
    image: product3,
    images: [product3, product4],
    description: "Crisp Egyptian cotton poplin with a subtle sheen. The foundation of every great dress shirt.",
    details: [
      "Long-staple Egyptian cotton",
      "Tight poplin weave",
      "Crisp hand feel",
      "Easy care properties",
    ],
    composition: "100% Egyptian Cotton",
    width: "145 cm",
    weight: "120 g/m²",
    origin: "Switzerland",
    createdAt: "2024-01-11",
    sortOrder: 3,
  },
  {
    id: "summer-linen",
    name: "Irish Summer Linen",
    price: 145,
    salePrice: 115,
    collection: "Casual",
    status: "active",
    inventory: 78,
    image: product4,
    images: [product4, product1],
    description: "Pure Irish linen with beautiful natural texture. The perfect choice for summer suits and relaxed tailoring.",
    details: [
      "100% Irish linen",
      "Natural slub texture",
      "Breathable and cool",
      "Softens beautifully with wear",
    ],
    composition: "100% Linen",
    width: "145 cm",
    weight: "200 g/m²",
    origin: "Ireland",
    isSale: true,
    createdAt: "2024-01-05",
    sortOrder: 4,
  },
  {
    id: "charcoal-flannel",
    name: "Charcoal Flannel",
    price: 195,
    collection: "Suiting",
    status: "active",
    inventory: 55,
    image: product1,
    images: [product1],
    description: "Rich charcoal flannel with exceptional softness. A winter essential for distinguished suits.",
    details: [
      "Premium wool flannel",
      "Soft brushed finish",
      "Medium-heavy weight",
      "Excellent heat retention",
    ],
    composition: "100% Wool",
    width: "150 cm",
    weight: "340 g/m²",
    origin: "Italy",
    createdAt: "2024-01-04",
    sortOrder: 5,
  },
  {
    id: "oxford-cotton",
    name: "Oxford Cotton",
    price: 75,
    collection: "Shirting",
    status: "active",
    inventory: 95,
    image: product3,
    images: [product3],
    description: "Classic oxford cotton with a distinctive basket weave. Perfect for both casual and business shirts.",
    details: [
      "Premium American cotton",
      "Traditional basket weave",
      "Durable and breathable",
      "Softens with washing",
    ],
    composition: "100% Cotton",
    width: "145 cm",
    weight: "140 g/m²",
    origin: "USA",
    isNew: true,
    createdAt: "2024-01-12",
    sortOrder: 6,
  },
  {
    id: "midnight-wool",
    name: "Midnight Wool Blend",
    price: 210,
    collection: "Suiting",
    status: "active",
    inventory: 42,
    image: product2,
    images: [product2],
    description: "Deep midnight blue wool blend with subtle texture. Perfect for evening wear and formal occasions.",
    details: [
      "Wool and mohair blend",
      "Subtle self-pattern",
      "Lightweight construction",
      "Superior drape",
    ],
    composition: "80% Wool, 20% Mohair",
    width: "150 cm",
    weight: "240 g/m²",
    origin: "England",
    createdAt: "2024-01-03",
    sortOrder: 7,
  },
  {
    id: "natural-linen",
    name: "Natural Belgian Linen",
    price: 135,
    collection: "Casual",
    status: "active",
    inventory: 65,
    image: product4,
    images: [product4],
    description: "Unbleached Belgian linen in its natural state. The ultimate choice for relaxed summer tailoring.",
    details: [
      "100% Belgian flax",
      "Natural unbleached color",
      "Exceptional breathability",
      "Develops character with age",
    ],
    composition: "100% Linen",
    width: "145 cm",
    weight: "190 g/m²",
    origin: "Belgium",
    createdAt: "2024-01-02",
    sortOrder: 8,
  },
  {
    id: "sea-island-cotton",
    name: "Sea Island Cotton",
    price: 120,
    collection: "Shirting",
    status: "active",
    inventory: 35,
    image: product3,
    images: [product3],
    description: "The rarest and finest cotton in the world. Incredibly soft with a luminous sheen.",
    details: [
      "Genuine Sea Island cotton",
      "Extra-long staple fibers",
      "Silky smooth hand feel",
      "Exceptional durability",
    ],
    composition: "100% Sea Island Cotton",
    width: "145 cm",
    weight: "110 g/m²",
    origin: "Caribbean",
    createdAt: "2024-01-01",
    sortOrder: 9,
  },
  {
    id: "royal-twill",
    name: "Royal Twill Cotton",
    price: 95,
    collection: "Shirting",
    status: "active",
    inventory: 82,
    image: product3,
    images: [product3],
    description: "Fine twill cotton with a subtle diagonal texture. Elegant and refined for dress shirts.",
    details: [
      "Two-fold cotton yarn",
      "Diagonal twill weave",
      "Smooth lustrous finish",
      "Wrinkle resistant",
    ],
    composition: "100% Cotton",
    width: "145 cm",
    weight: "130 g/m²",
    origin: "Switzerland",
    createdAt: "2023-12-28",
    sortOrder: 10,
  },
  {
    id: "cotton-linen",
    name: "Cotton Linen Blend",
    price: 110,
    collection: "Casual",
    status: "active",
    inventory: 58,
    image: product4,
    images: [product4],
    description: "The best of both worlds - cotton softness with linen texture. Ideal for summer sport coats.",
    details: [
      "Cotton and linen blend",
      "Balanced weight and texture",
      "Cool and comfortable",
      "Easy to care for",
    ],
    composition: "55% Linen, 45% Cotton",
    width: "145 cm",
    weight: "210 g/m²",
    origin: "Italy",
    createdAt: "2023-12-25",
    sortOrder: 11,
  },
  {
    id: "charcoal-pinstripe",
    name: "Charcoal Pinstripe",
    price: 215,
    collection: "Suiting",
    status: "active",
    inventory: 40,
    image: product2,
    images: [product2],
    description: "Classic charcoal with subtle white pinstripe. The timeless choice for business suiting.",
    details: [
      "Super 110s wool",
      "Classic pinstripe pattern",
      "Medium weight",
      "Professional finish",
    ],
    composition: "100% Wool",
    width: "150 cm",
    weight: "270 g/m²",
    origin: "England",
    isNew: true,
    createdAt: "2024-01-14",
    sortOrder: 12,
  },
  {
    id: "ivory-linen",
    name: "Ivory Belgian Linen",
    price: 155,
    collection: "Casual",
    status: "active",
    inventory: 48,
    image: product4,
    images: [product4],
    description: "Elegant ivory linen for summer occasions. Light, airy, and effortlessly stylish.",
    details: [
      "Premium Belgian linen",
      "Soft ivory color",
      "Luxuriously light",
      "Perfect for summer events",
    ],
    composition: "100% Linen",
    width: "145 cm",
    weight: "180 g/m²",
    origin: "Belgium",
    isNew: true,
    createdAt: "2024-01-13",
    sortOrder: 13,
  },
];

const initialCollections: Collection[] = [
  {
    id: "1",
    slug: "suiting",
    name: "Suiting",
    description: "Fine wool & luxury blends for the perfect suit. Our suiting collection features premium fabrics from Italian and British mills.",
    productCount: 0, // Will be calculated dynamically
    image: suitingImage,
    status: "active",
    sortOrder: 1,
  },
  {
    id: "2",
    slug: "shirting",
    name: "Shirting",
    description: "Premium cotton for distinguished dress shirts. From crisp poplin to soft twill, find the perfect fabric for any occasion.",
    productCount: 0,
    image: shirtingImage,
    status: "active",
    sortOrder: 2,
  },
  {
    id: "3",
    slug: "casual",
    name: "Casual",
    description: "Linen & cotton for relaxed elegance. Perfect for summer suits, sport coats, and laid-back sophistication.",
    productCount: 0,
    image: casualImage,
    status: "active",
    sortOrder: 3,
  },
];

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Smith",
    email: "john@example.com",
    total: 245.97,
    status: "delivered",
    items: 3,
    createdAt: "2024-01-20",
  },
  {
    id: "ORD-002",
    customer: "Michael Brown",
    email: "michael@example.com",
    total: 89.99,
    status: "shipped",
    items: 1,
    createdAt: "2024-01-11",
  },
  {
    id: "ORD-003",
    customer: "David Wilson",
    email: "david@example.com",
    total: 175.98,
    status: "processing",
    items: 2,
    createdAt: "2024-01-18",
  },
  {
    id: "ORD-004",
    customer: "James Taylor",
    email: "james@example.com",
    total: 55.99,
    status: "pending",
    items: 1,
    createdAt: "2024-01-17",
  },
];

const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    orders: 5,
    totalSpent: 567.95,
    createdAt: "2023-06-15",
  },
  {
    id: "2",
    name: "Michael Brown",
    email: "michael@example.com",
    orders: 3,
    totalSpent: 289.97,
    createdAt: "2023-08-20",
  },
  {
    id: "3",
    name: "David Wilson",
    email: "david@example.com",
    orders: 8,
    totalSpent: 892.92,
    createdAt: "2023-04-10",
  },
  {
    id: "4",
    name: "James Taylor",
    email: "james@example.com",
    orders: 2,
    totalSpent: 145.98,
    createdAt: "2023-11-05",
  },
];

const initialContentPages: ContentPage[] = [
  {
    id: "1",
    title: "About Us",
    slug: "about",
    status: "published",
    lastModified: "2024-01-15",
    content: "Our story begins with a passion for quality fabrics...",
    sortOrder: 1,
  },
  {
    id: "2",
    title: "Contact",
    slug: "contact",
    status: "published",
    lastModified: "2024-01-10",
    content: "Get in touch with our team...",
    sortOrder: 2,
  },
  {
    id: "3",
    title: "Shipping Policy",
    slug: "shipping",
    status: "published",
    lastModified: "2024-01-05",
    content: "## Worldwide Shipping\n\nWe offer worldwide shipping on all orders. All shipments are fully insured and trackable.\n\n### Delivery Times\n* **UK & Europe**: 2-3 business days\n* **USA & Canada**: 3-5 business days\n* **Rest of World**: 5-7 business days\n\nShipping is calculated at checkout based on weight and destination.",
    sortOrder: 3,
  },
  {
    id: "4",
    title: "Returns & Exchanges",
    slug: "returns",
    status: "published",
    lastModified: "2024-01-02",
    content: "## 30-Day Returns\n\nWe want you to be completely satisfied with your purchase. If for any reason you are not, we accept returns within 30 days of delivery.\n\n* Fabric must be uncut and in original condition.\n* Refunds are processed to the original payment method.\n* Return shipping is free for exchanges.",
    sortOrder: 4,
  },

  {
    id: "6",
    title: "Privacy Policy",
    slug: "privacy",
    status: "published",
    lastModified: "2024-01-20",
    content: "## Your Privacy Matters\n\nMGS Fabrics is committed to protecting your personal information. We do not sell or rent your data to third parties.\n\nWe collect only the information necessary to process your order and improve your shopping experience.",
    sortOrder: 5,
  },
  {
    id: "7",
    title: "Terms of Service",
    slug: "terms",
    status: "published",
    lastModified: "2024-01-20",
    content: "## Terms & Conditions\n\nBy using this website, you agree to the following terms and conditions. Please read them carefully before making a purchase.\n\nAll content on this site is the property of MGS Fabrics.",
    sortOrder: 6,
  },

  {
    id: "9",
    title: "Our Story",
    slug: "story",
    status: "published",
    lastModified: "2024-01-20",
    content: "## A Legacy of Excellence\n\nFounded in 1952, MGS Fabrics has been the trusted source for discerning tailors and menswear enthusiasts seeking only the finest textiles.\n\nWhat began as a small import business in London's Savile Row has grown into an internationally recognized purveyor of luxury fabrics.\n\nOur founder, Thomas MGS, believed that great tailoring starts with great fabric. That philosophy continues to guide us today as we source materials from the world's most prestigious mills—from the wool masters of Biella to the cotton specialists of Switzerland.",
    sortOrder: 7,
  },

];

// Helper functions for localStorage persistence
const STORAGE_KEYS = {
  products: "admin_products",
  collections: "admin_collections",
  orders: "admin_orders",
  customers: "admin_customers",
  content: "admin_content",
  cart: "shopping_cart",
};

function getStoredData<T>(key: string, initial: T[]): T[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  } catch {
    return initial;
  }
}

function setStoredData<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// CRUD operations for Products
export function getProducts(): Product[] {
  return getStoredData(STORAGE_KEYS.products, initialProducts).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getActiveProducts(): Product[] {
  return getProducts().filter((p) => p.status === "active");
}

export function getProduct(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function getProductsByCollection(collectionName: string): Product[] {
  return getActiveProducts().filter(
    (p) => p.collection.toLowerCase() === collectionName.toLowerCase()
  );
}

export function getNewArrivals(): Product[] {
  return getActiveProducts().filter((p) => p.isNew);
}

export function getFeaturedProducts(limit: number = 4): Product[] {
  return getActiveProducts().slice(0, limit);
}

export function saveProduct(product: Omit<Product, "createdAt"> & { id?: string; createdAt?: string }): Product {
  const products = getProducts();
  if (product.id) {
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      products[index] = { ...products[index], ...product } as Product;
      setStoredData(STORAGE_KEYS.products, products);
      return products[index];
    }
  }
  const newProduct: Product = {
    ...product,
    id: product.id || Date.now().toString(),
    createdAt: product.createdAt || new Date().toISOString().split("T")[0],
    sortOrder: product.sortOrder || (products.length > 0 ? Math.max(...products.map(p => p.sortOrder)) + 1 : 1),
  } as Product;
  products.push(newProduct);
  setStoredData(STORAGE_KEYS.products, products);
  return newProduct;
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter((p) => p.id !== id);
  setStoredData(STORAGE_KEYS.products, products);
}

// CRUD operations for Collections
export function getCollections(): Collection[] {
  const collections = getStoredData(STORAGE_KEYS.collections, initialCollections).sort((a, b) => a.sortOrder - b.sortOrder);
  const products = getActiveProducts();

  // Update product counts dynamically
  return collections.map((collection) => ({
    ...collection,
    productCount: products.filter(
      (p) => p.collection.toLowerCase() === collection.name.toLowerCase()
    ).length,
  }));
}

export function getActiveCollections(): Collection[] {
  return getCollections().filter((c) => c.status === "active");
}

export function getCollection(id: string): Collection | undefined {
  return getCollections().find((c) => c.id === id);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return getCollections().find((c) => c.slug === slug || c.name.toLowerCase() === slug.toLowerCase());
}

export function saveCollection(collection: Omit<Collection, "id"> & { id?: string }): Collection {
  const collections = getCollections();
  if (collection.id) {
    const index = collections.findIndex((c) => c.id === collection.id);
    if (index !== -1) {
      collections[index] = { ...collections[index], ...collection } as Collection;
      setStoredData(STORAGE_KEYS.collections, collections);
      return collections[index];
    }
  }
  const newCollection: Collection = {
    ...collection,
    id: Date.now().toString(),
    slug: collection.slug || collection.name.toLowerCase().replace(/\s+/g, "-"),
    sortOrder: collection.sortOrder || (collections.length > 0 ? Math.max(...collections.map(c => c.sortOrder)) + 1 : 1),
  } as Collection;
  collections.push(newCollection);
  setStoredData(STORAGE_KEYS.collections, collections);
  return newCollection;
}

export function deleteCollection(id: string): void {
  const collections = getCollections().filter((c) => c.id !== id);
  setStoredData(STORAGE_KEYS.collections, collections);
}

// CRUD operations for Orders
export function getOrders(): Order[] {
  return getStoredData(STORAGE_KEYS.orders, initialOrders);
}

export function getOrder(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

export function updateOrderStatus(id: string, status: Order["status"]): void {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index !== -1) {
    orders[index].status = status;
    setStoredData(STORAGE_KEYS.orders, orders);
  }
}

export function createOrder(order: Omit<Order, "id" | "createdAt">): Order {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
  orders.unshift(newOrder);
  setStoredData(STORAGE_KEYS.orders, orders);
  return newOrder;
}

// CRUD operations for Customers
export function getCustomers(): Customer[] {
  return getStoredData(STORAGE_KEYS.customers, initialCustomers);
}

export function getCustomer(id: string): Customer | undefined {
  return getCustomers().find((c) => c.id === id);
}

// CRUD operations for Content Pages
export function getContentPages(): ContentPage[] {
  return getStoredData(STORAGE_KEYS.content, initialContentPages).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getContentPage(id: string): ContentPage | undefined {
  return getContentPages().find((p) => p.id === id);
}

export function getContentPageBySlug(slug: string): ContentPage | undefined {
  return getContentPages().find((p) => p.slug === slug && p.status === "published");
}

export function saveContentPage(page: Omit<ContentPage, "id" | "lastModified"> & { id?: string }): ContentPage {
  const pages = getContentPages();
  if (page.id) {
    const index = pages.findIndex((p) => p.id === page.id);
    if (index !== -1) {
      pages[index] = {
        ...pages[index],
        ...page,
        lastModified: new Date().toISOString().split("T")[0],
      } as ContentPage;
      setStoredData(STORAGE_KEYS.content, pages);
      return pages[index];
    }
  }
  const newPage: ContentPage = {
    ...page,
    id: Date.now().toString(),
    lastModified: new Date().toISOString().split("T")[0],
    sortOrder: page.sortOrder || (pages.length > 0 ? Math.max(...pages.map(p => p.sortOrder)) + 1 : 1),
  } as ContentPage;
  pages.push(newPage);
  setStoredData(STORAGE_KEYS.content, pages);
  return newPage;
}

export function deleteContentPage(id: string): void {
  const pages = getContentPages().filter((p) => p.id !== id);
  setStoredData(STORAGE_KEYS.content, pages);
}

export function reorderItem(
  type: "products" | "collections" | "content",
  id: string,
  direction: "up" | "down"
): void {
  const storageKey = STORAGE_KEYS[type];
  let items: any[] = [];

  if (type === "products") items = getProducts();
  else if (type === "collections") items = getCollections();
  else if (type === "content") items = getContentPages();

  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return;

  if (direction === "up" && index > 0) {
    const prevIndex = index - 1;
    const tempOrder = items[index].sortOrder;
    items[index].sortOrder = items[prevIndex].sortOrder;
    items[prevIndex].sortOrder = tempOrder;
  } else if (direction === "down" && index < items.length - 1) {
    const nextIndex = index + 1;
    const tempOrder = items[index].sortOrder;
    items[index].sortOrder = items[nextIndex].sortOrder;
    items[nextIndex].sortOrder = tempOrder;
  }

  setStoredData(storageKey, items);
}

export function setItemOrder(
  type: "products" | "collections" | "content",
  id: string,
  newPosition: number // 1-indexed
): void {
  const storageKey = STORAGE_KEYS[type];
  let items: any[] = [];

  if (type === "products") items = getProducts();
  else if (type === "collections") items = getCollections();
  else if (type === "content") items = getContentPages();

  const currentIndex = items.findIndex((item) => item.id === id);
  if (currentIndex === -1) return;

  // Normalize newPosition to be within bounds
  const targetIndex = Math.max(0, Math.min(items.length - 1, newPosition - 1));

  if (currentIndex === targetIndex) return;

  const [movedItem] = items.splice(currentIndex, 1);
  items.splice(targetIndex, 0, movedItem);

  // Recalculate all sort orders to ensure they remain sequential
  items.forEach((item, index) => {
    item.sortOrder = index + 1;
  });

  setStoredData(storageKey, items);
}

export function saveAllItemsOrder(
  type: "products" | "collections" | "content",
  orderedItems: any[]
): void {
  const storageKey = STORAGE_KEYS[type];
  // Re-calculate sortOrder based on the new array order
  const updatedItems = orderedItems.map((item, index) => ({
    ...item,
    sortOrder: index + 1
  }));
  setStoredData(storageKey, updatedItems);
}

// Cart operations
export function getCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.cart);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addToCart(productId: string, quantity: number = 1): CartItem[] {
  const cart = getCart();
  const existingIndex = cart.findIndex((item) => item.productId === productId);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  return cart;
}

export function updateCartItem(productId: string, quantity: number): CartItem[] {
  const cart = getCart();
  const index = cart.findIndex((item) => item.productId === productId);

  if (index !== -1) {
    if (quantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }
  }

  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  return cart;
}

export function removeFromCart(productId: string): CartItem[] {
  const cart = getCart().filter((item) => item.productId !== productId);
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  return cart;
}

export function clearCart(): void {
  localStorage.removeItem(STORAGE_KEYS.cart);
}

export function getCartWithProducts(): Array<CartItem & { product: Product }> {
  const cart = getCart();
  return cart
    .map((item) => {
      const product = getProduct(item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is CartItem & { product: Product } => item !== null);
}

export function getCartTotal(): number {
  const cartWithProducts = getCartWithProducts();
  return cartWithProducts.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);
}

export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// Dashboard stats
export function getDashboardStats() {
  const products = getProducts();
  const orders = getOrders();
  const customers = getCustomers();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing").length;

  return {
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.status === "active").length,
    totalOrders: orders.length,
    pendingOrders,
    totalCustomers: customers.length,
    totalRevenue,
  };
}

// Persistent server sync (temp fix for data survival across browser clears/restarts)
const SERVER_URL = "http://localhost:3001";

export async function syncWithServer() {
  try {
    const res = await fetch(`${SERVER_URL}/api/data`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      const keys: Record<string, string> = {
        products: "admin_products",
        collections: "admin_collections",
        orders: "admin_orders",
        customers: "admin_customers",
        content: "admin_content",
        cart: "shopping_cart",
      };
      for (const [serverKey, storageKey] of Object.entries(keys)) {
        const arr = data[serverKey];
        if (Array.isArray(arr) && arr.length > 0) {
          localStorage.setItem(storageKey, JSON.stringify(arr));
        }
      }
      return true;
    }
  } catch {
    // Server not available, fall back to localStorage
  }
  return false;
}

export async function saveToServer() {
  try {
    const data = {
      products: getProducts(),
      collections: getCollections(),
      orders: getOrders(),
      customers: getCustomers(),
      content: getContentPages(),
      cart: getCart(),
    };
    const res = await fetch(`${SERVER_URL}/api/data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(2000),
    });
    return res.ok;
  } catch {
    // Server not available
  }
  return false;
}
