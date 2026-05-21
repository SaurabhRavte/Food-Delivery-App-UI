export const MOCK_USER = {
  id: "user1",
  name: "Saurabh Ravte",
  email: "saurabh.dev@gmail.com",
  password: "1234",
  phone: "+91 12345 67890",
  address: "Rajnandgaon, Chhattisgarh",
  avatar: "SR",
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVeg: boolean;
  rating: number;
  image: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  distance: string;
  offer?: string;
  image: string;
  bgColor: string;
  menu: MenuItem[];
};

const img = (id: string, w = 400) =>
  `https://images.unsplash.com/${id}?w=${w}&q=70&auto=format&fit=crop`;

export const RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    name: "Sukhsagar Rooftop",
    cuisine: "North Indian • Punjabi • Pure Veg",
    rating: 4.5,
    deliveryTime: "30-40 min",
    deliveryFee: 29,
    minOrder: 199,
    distance: "1.2 km",
    offer: "20% OFF upto ₹80",
    image: img("photo-1631452180519-c014fe946bc7", 800),
    bgColor: "#fff3e0",
    menu: [
      {
        id: "m1",
        name: "Paneer Butter Masala",
        description: "Rich creamy tomato gravy with soft paneer cubes",
        price: 280,
        category: "Main Course",
        isVeg: true,
        rating: 4.6,
        image: img("photo-1631452180519-c014fe946bc7"),
      },
      {
        id: "m2",
        name: "Dal Makhani",
        description: "Slow-cooked black lentils in buttery tomato gravy",
        price: 220,
        category: "Main Course",
        isVeg: true,
        rating: 4.4,
        image: img("photo-1546833999-b9f581a1996d"),
      },
      {
        id: "m3",
        name: "Veg Hyderabadi Biryani",
        description:
          "Fragrant basmati rice layered with mixed veggies & spices",
        price: 260,
        category: "Rice",
        isVeg: true,
        rating: 4.5,
        image: img("photo-1563379091339-03b21ab4a4f8"),
      },
      {
        id: "m4",
        name: "Butter Naan",
        description: "Soft leavened bread baked in tandoor with butter",
        price: 60,
        category: "Breads",
        isVeg: true,
        rating: 4.3,
        image: img("photo-1626074353765-517a681e40be"),
      },
      {
        id: "m5",
        name: "Gulab Jamun",
        description: "Soft milk dumplings soaked in rose-cardamom syrup",
        price: 99,
        category: "Desserts",
        isVeg: true,
        rating: 4.5,
        image: img("photo-1601725414916-c5fed4ddb6ad"),
      },
    ],
  },
  {
    id: "r2",
    name: "Hariraj Restaurant",
    cuisine: "South Indian • North Indian • Chinese",
    rating: 4.4,
    deliveryTime: "25-35 min",
    deliveryFee: 0,
    minOrder: 149,
    distance: "0.8 km",
    offer: "FREE delivery",
    image: img("photo-1668236543090-82eba5ee5976", 800),
    bgColor: "#fce4ec",
    menu: [
      {
        id: "m6",
        name: "Masala Dosa",
        description: "Crispy rice crepe stuffed with spiced potato masala",
        price: 130,
        category: "South Indian",
        isVeg: true,
        rating: 4.6,
        image: img("photo-1668236543090-82eba5ee5976"),
      },
      {
        id: "m7",
        name: "Veg Hakka Noodles",
        description: "Wok-tossed noodles with crunchy veggies & soy sauce",
        price: 160,
        category: "Chinese",
        isVeg: true,
        rating: 4.3,
        image: img("photo-1612929633738-8fe44f7ec841"),
      },
      {
        id: "m8",
        name: "Paneer Chilli Dry",
        description: "Crispy paneer tossed with bell peppers in spicy sauce",
        price: 220,
        category: "Starters",
        isVeg: true,
        rating: 4.5,
        image: img("photo-1565557623262-b51c2513a641"),
      },
      {
        id: "m9",
        name: "Filter Coffee",
        description: "Authentic South Indian filter coffee with frothy milk",
        price: 60,
        category: "Drinks",
        isVeg: true,
        rating: 4.7,
        image: img("photo-1509042239860-f550ce710b93"),
      },
    ],
  },
  {
    id: "r3",
    name: "Cafe Oriza",
    cuisine: "Continental • Italian • Multi-cuisine",
    rating: 4.6,
    deliveryTime: "35-45 min",
    deliveryFee: 49,
    minOrder: 299,
    distance: "2.1 km",
    offer: "Buy 1 Get 1",
    image: img("photo-1513104890138-7c749659a591", 800),
    bgColor: "#e8f5e9",
    menu: [
      {
        id: "m10",
        name: "Margherita Pizza",
        description: "Classic tomato base with fresh mozzarella and basil",
        price: 349,
        category: "Pizza",
        isVeg: true,
        rating: 4.5,
        image: img("photo-1574071318508-1cdbab80d002"),
      },
      {
        id: "m11",
        name: "Tandoori Chicken Pizza",
        description: "Spiced tandoori chicken, onions and capsicum on cheese",
        price: 449,
        category: "Pizza",
        isVeg: false,
        rating: 4.7,
        image: img("photo-1604382354936-07c5d9983bd3"),
      },
      {
        id: "m12",
        name: "Penne Alfredo",
        description: "Penne pasta in creamy parmesan and garlic sauce",
        price: 299,
        category: "Pasta",
        isVeg: true,
        rating: 4.4,
        image: img("photo-1551183053-bf91a1d81141"),
      },
      {
        id: "m13",
        name: "Garlic Bread",
        description: "Toasted baguette with garlic butter and herbs",
        price: 149,
        category: "Starters",
        isVeg: true,
        rating: 4.4,
        image: img("photo-1573140247632-f8fd74997d5c"),
      },
      {
        id: "m14",
        name: "Tiramisu",
        description: "Classic Italian coffee dessert with mascarpone cream",
        price: 199,
        category: "Desserts",
        isVeg: true,
        rating: 4.8,
        image: img("photo-1571877227200-a0d98ea607e9"),
      },
    ],
  },
  {
    id: "r4",
    name: "Marwadi Vaishnav Bhojanalaya",
    cuisine: "Rajasthani • Marwadi Thali • Pure Veg",
    rating: 4.7,
    deliveryTime: "30-40 min",
    deliveryFee: 39,
    minOrder: 199,
    distance: "3.4 km",
    offer: undefined,
    image: img("photo-1626500155053-8baca5618921", 800),
    bgColor: "#e3f2fd",
    menu: [
      {
        id: "m15",
        name: "Special Marwadi Thali",
        description: "Roti, dal, sabji, rice, churma, raita, papad & sweet",
        price: 249,
        category: "Thali",
        isVeg: true,
        rating: 4.8,
        image: img("photo-1626500155053-8baca5618921"),
      },
      {
        id: "m16",
        name: "Dal Baati Churma",
        description: "Traditional baked dough balls with dal & sweet churma",
        price: 220,
        category: "Specials",
        isVeg: true,
        rating: 4.7,
        image: img("photo-1546833999-b9f581a1996d"),
      },
      {
        id: "m17",
        name: "Gatte Ki Sabji",
        description: "Gram flour dumplings simmered in tangy yogurt curry",
        price: 180,
        category: "Main Course",
        isVeg: true,
        rating: 4.5,
        image: img("photo-1546069901-ba9599a7e63c"),
      },
      {
        id: "m18",
        name: "Masala Chaas",
        description: "Refreshing spiced buttermilk with mint and cumin",
        price: 50,
        category: "Drinks",
        isVeg: true,
        rating: 4.4,
        image: img("photo-1525385133512-2f3bdd039054"),
      },
    ],
  },
];

export const CATEGORIES = [
  "All",
  "Thali",
  "Biryani",
  "South Indian",
  "Pizza",
  "Chinese",
  "Desserts",
  "Drinks",
];

export const TRENDING_SEARCHES = [
  "Biryani",
  "Pizza",
  "Dosa",
  "Paneer",
  "Coffee",
  "Thali",
];
