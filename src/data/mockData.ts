import { Category, Brand, Product, SubCategory } from './types';

export const categories: Category[] = [
  {
    id: "1",
    name: "Skin Care",
    slug: "skin-care",
    imageUrl: "/Images/Category Images/Skin Care Image.jpg"
  },
  {
    id: "2",
    name: "Beauty",
    slug: "beauty",
    imageUrl: "/Images/Category Images/Beauty Image.jpg"
  },
  {
    id: "3",
    name: "Home Decor",
    slug: "home-decor",
    imageUrl: "/Images/Category Images/Home Decor Image.jpg"
  },
  {
    id: "4",
    name: "Bags",
    slug: "bags",
    imageUrl: "/Images/Category Images/Bags Images.jpg"
  },
  {
    id: "5",
    name: "Accessories",
    slug: "accessories",
    imageUrl: "/Images/Category Images/Accessories Image.jpg"
  }
];

export const brands: Brand[] = [
  {
    id: "1",
    name: "Geory",
    slug: "geory",
    imageUrl: "/Images/Skin Care/Geory/Logo.jpg",
    description: "Premium skin care products using only natural ingredients.",
    categories: ["skin-care"]
  },
  {
    id: "2",
    name: "GlowUp",
    slug: "glowup",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    description: "Makeup and beauty products for the modern woman.",
    categories: ["beauty"]
  },
  {
    id: "3",
    name: "Lilac",
    slug: "lilac",
    imageUrl: "/Images/Accessories/Lilac/Logo.jpg",
    description: "Elegant bags and accessories for every occasion.",
    categories: ["accessories"]
  },
  {
    id: "4",
    name: "Piece of Art",
    slug: "piece-of-art-bags",
    imageUrl: "/Images/Home Decor/Piece Of Art/Piece Of Art Logo.jpg",
    description: "Handcrafted home decor and bags that tell a story.",
    categories: ["bags"]
  },
  {
    id: "5",
    name: "Moonlight",
    slug: "moonlight",
    imageUrl: "/Images/Home Decor/MoonLight/MoonLight BackGround.jpg",
    description: "Artisanal home decor products made with love.",
    categories: ["home-decor"]
  },
  {
    id: "6",
    name: "Mira",
    slug: "mira",
    imageUrl: "/Images/Beauty/Wanmora/Wanmora P2.jpg",
    description: "Premium beauty products for the modern woman.",
    categories: ["beauty"]
  },
  {
    id: "7",
    name: "Butterfly",
    slug: "butterfly-bags",
    imageUrl: "/Images/Bags/Butterfly/Logo.jpg",
    description: "Classic and trendy bags for all occasions.",
    categories: ["bags"]
  },
  {
    id: "8",
    name: "Piece of Art",
    slug: "piece-of-art-decor",
    imageUrl: "/Images/Home Decor/Piece Of Art/Piece Of Art Logo.jpg",
    description: "Handcrafted home decor and bags that tell a story.",
    categories: ["home-decor"]
  },
  {
    id: "9",
    name: "Butterfly",
    slug: "butterfly-accessories",
    imageUrl: "/Images/Bags/Butterfly/Logo.jpg",
    description: "Classic and trendy Accessories for all occasions.",
    categories: ["accessories"]
  }
];

export const subCategories: SubCategory[] = [
  {
    id: "1",
    name: "Cleanser",
    slug: "cleanser",
    brandId: "1",
    categoryId: "1",
    imageUrl: "/Images/Skin Care/Geory/Cleanser/Logo.jpg"
  },
  {
    id: "2",
    name: "Facial Scrubs",
    slug: "facial-scrubs",
    brandId: "1",
    categoryId: "1",
    imageUrl: "/Images/Skin Care/Geory/Facial Scrub/Logo.jpg"
  },
  {
    id: "3",
    name: "Lip Gloss",
    slug: "lip-gloss",
    brandId: "2",
    categoryId: "2",
    imageUrl: "/Images/Beauty/Lip Gloss/Lip Gloss BackGround.jpg"
  },
  {
    id: "4",
    name: "Blusher",
    slug: "blusher",
    brandId: "2",
    categoryId: "2",
    imageUrl: "/Images/Beauty/Blusher/Blusher BackGround.jpg"
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Gel Cleanser",
    slug: "gel-cleanser",
    price: 350,
    description: "A gentle cleanser made with natural ingredients to cleanse and hydrate your skin.",
    imageUrl: "/Images/Skin Care/Geory/Cleanser/Cleanser P1.jpg",
    brandId: "1",
    categoryId: "1",
    subCategoryId: "1"
  },
  {
    id: "21",
    name: "Foam Cleanser",
    slug: "foam-cleanser",
    price: 400,
    description: "Foaming cleanser for deep hydration and purity.",
    imageUrl: "/Images/Skin Care/Geory/Cleanser/Cleanser P2.jpg",
    brandId: "1",
    categoryId: "1",
    subCategoryId: "1"
  },
  {
    id: "2",
    name: "Geory Deep Renew",
    slug: "geory-deep-renew",
    price: 150,
    description: "Suggests a thorough, refreshing exfoliation while keeping a clean and natural vibe",
    imageUrl: "/Images/Skin Care/Geory/Facial Scrub/Scrub P1.jpg",
    brandId: "1",
    categoryId: "1",
    subCategoryId: "2"
  },
  {
    id: "23",
    name: "Geory Velvet Polish",
    slug: "geory-velvet-polish",
    price: 150,
    description: "Combines elegance with softness perfect for a scrub that feels both effective and gentle",
    imageUrl: "/Images/Skin Care/Geory/Facial Scrub/Scrub P2.jpg",
    brandId: "1",
    categoryId: "1",
    subCategoryId: "2"
  },
  {
    id: "3",
    name: "Dark Latee",
    slug: "dark-latee",
    price: 150,
    description: "A hydrating lip gloss that keeps your lips soft and moisturized all day long.",
    imageUrl: "/Images/Beauty/Lip Gloss/Lip Gloss P3.jpg",
    brandId: "2",
    categoryId: "2",
    subCategoryId: "3"
  },
  {
    id: "25",
    name: "Soft Shade",
    slug: "soft-shade",
    price: 150,
    description: "For soft, shiny lips.",
    imageUrl: "/Images/Beauty/Lip Gloss/Lip Gloss P2.jpg",
    brandId: "2",
    categoryId: "2",
    subCategoryId: "3"
  },
  {
    id: "26",
    name: "Cherry Red",
    slug: "cherry-red",
    price: 150,
    description: "Gives a healthy rose-colored tint and moisture.",
    imageUrl: "/Images/Beauty/Lip Gloss/Lip Gloss P1.jpg",
    brandId: "2",
    categoryId: "2",
    subCategoryId: "3"
  },
  {
    id: "4",
    name: "Nody",
    slug: "nody",
    price: 190,
    description: "A natural-looking blusher that adds a touch of color to your cheeks.",
    imageUrl: "/Images/Beauty/Blusher/Blusher P1.jpg",
    brandId: "2",
    categoryId: "2",
    subCategoryId: "4"
  },
  {
    id: "27",
    name: "Pinky Winki",
    slug: "pinky-winki",
    price: 190,
    description: "Vivid pinky shades for a bold finish.",
    imageUrl: "/Images/Beauty/Blusher/Blusher P3.jpg",
    brandId: "2",
    categoryId: "2",
    subCategoryId: "4"
  },
  {
    id: "28",
    name: "Strawberry Milk",
    slug: "strawberry-milk",
    price: 190,
    description: "Subtle pink milky tones for a healthy radiance.",
    imageUrl: "/Images/Beauty/Blusher/Blusher P2.jpg",
    brandId: "2",
    categoryId: "2",
    subCategoryId: "4"
  },
  {
    id: "29",
    name: "Silver Pearl Bag",
    slug: "silver-pearl-bag",
    price: 300,
    description: "A stylish silver bag handcrafted with pearls, perfect for elegant occasions and adding a touch of glamour to your outfit.",
    imageUrl: "/Images/Bags/Butterfly/Butterfly P1.jpg",
    brandId: "7",
    categoryId: "4"
  },
  {
    id: "30",
    name: "White Pearl Bag",
    slug: "white-pearl-bag",
    price: 250,
    description: "A chic and lightweight white pearl bag, ideal for casual outings with a modern and minimal look",
    imageUrl: "/Images/Bags/Butterfly/Butterfly P2.jpg",
    brandId: "7",
    categoryId: "4"
  },
  {
    id: "31",
    name: "Red Pearl Bag",
    slug: "red-pearl-bag",
    price: 300,
    description: "A bold red pearl bag with a unique design, perfect for special events and making a statement",
    imageUrl: "/Images/Bags/Butterfly/Butterfly P3.jpg",
    brandId: "7",
    categoryId: "4"
  },
  {
    id: "32",
    name: "Rainbow Flower Earrings",
    slug: "rainbow-flower-earrings",
    price: 75,
    description: "Add a pop of color to your outfit with these playful rainbow and flower-shaped earrings. Handcrafted with love",
    imageUrl: "/Images/Accessories/Lilac/Lilac P1.jpg",
    brandId: "3",
    categoryId: "5"
  },
  {
    id: "33",
    name: "Resin Leaf Earrings",
    slug: "resin-leaf-earrings",
    price: 75,
    description: "Elegant and earthy, these resin earrings feature a delicate leaf design perfect for any nature lover",
    imageUrl: "/Images/Accessories/Lilac/Lilac P2.jpg",
    brandId: "3",
    categoryId: "5"
  },
  {
    id: "34",
    name: "Agate Slice Necklace",
    slug: "agate-slice-necklace",
    price: 110,
    description: "A stunning statement piece featuring a polished agate slice, blending natural beauty with elegance",
    imageUrl: "/Images/Accessories/Lilac/Lilac P3.jpg",
    brandId: "3",
    categoryId: "5"
  },
  {
    id: "35",
    name: "Pink Twisted Bag",
    slug: "pink-twisted-bag",
    price: 200,
    description: "A soft and feminine bag in pink tones, handmade with a unique twisted pattern for everyday charm",
    imageUrl: "/Images/Bags/Piece Of Art/Piece Of Art P1.jpg",
    brandId: "4",
    categoryId: "4"
  },
  {
    id: "36",
    name: "Brown Twisted Bag",
    slug: "brown-twisted-bag",
    price: 250,
    description: "A warm brown handcrafted bag with a twisted design, blends comfort and style for any casual outing",
    imageUrl: "/Images/Bags/Piece Of Art/Piece Of Art P2.jpg",
    brandId: "4",
    categoryId: "4"
  },
  {
    id: "37",
    name: "Black Twisted Bag",
    slug: "black-twisted-bag",
    price: 150,
    description: "A bold black-and-white twisted bag, lightweight, practical, and perfect for a stylish, modern look",
    imageUrl: "/Images/Bags/Piece Of Art/Piece Of Art P3.jpg",
    brandId: "4",
    categoryId: "4"
  },
  {
    id: "38",
    name: "Macrame Wall Hanging",
    slug: "macrame-wall-hanging",
    price: 850,
    description: "A beautifully handcrafted macrame wall piece that adds a boho-chic touch to your home décor",
    imageUrl: "/Images/Home Decor/Piece Of Art/Piece Of Art P1.jpg",
    brandId: "8",
    categoryId: "3"
  },
  {
    id: "39",
    name: "Macrame Mirror",
    slug: "macrame-mirror",
    price: 450,
    description: "This unique macrame-framed mirror brings natural elegance and soft texture to any wall",
    imageUrl: "/Images/Home Decor/Piece Of Art/Piece Of Art P2.jpg",
    brandId: "8",
    categoryId: "3"
  },
  {
    id: "40",
    name: "Macrame Wall Shelf",
    slug: "macrame-wall-shelf",
    price: 500,
    description: "A stylish and functional macrame wall shelf, perfect for displaying small plants or decorative items",
    imageUrl: "/Images/Home Decor/Piece Of Art/Piece Of Art P3.jpg",
    brandId: "8",
    categoryId: "3"
  },
  {
    id: "41",
    name: "SHELL-Shaped decorative bowl",
    slug: "shell-shaped-decorative-bowl",
    price: 270,
    description: "Elegant white ceramic bowls inspired by seashells, perfect for adding a coastal touch to your décor.",
    imageUrl: "/Images/Home Decor/MoonLight/MoonLight P2.jpg",
    brandId: "5",
    categoryId: "3"
  },
  {
    id: "42",
    name: "FIGURATIVE VASE",
    slug: "figurative-vase",
    price: 380,
    description: "A modern, sculptural vase with a unique abstract design, ideal for showcasing dried or fresh flowers.",
    imageUrl: "/Images/Home Decor/MoonLight/MoonLight P1.jpg",
    brandId: "5",
    categoryId: "3"
  },
  {
    id: "43",
    name: "Decorative Wall Art",
    slug: "decorative-wall-art",
    price: 580,
    description: "A stylish wall decoration featuring soft tones and curved elements to enhance any contemporary space.",
    imageUrl: "/Images/Home Decor/MoonLight/MoonLight P3.jpg",
    brandId: "5",
    categoryId: "3"
  },
  {
    id: "44",
    name: "Eye Brow",
    slug: "eye-brow",
    price: 120,
    description: "A moisturizing eye brow.",
    imageUrl: "/Images/Beauty/Wanmora/Wanmora P1.jpg",
    brandId: "6",
    categoryId: "2"
  },
  {
    id: "45",
    name: "Liquid Eye Brow",
    slug: "liquid-eye-brow",
    price: 200,
    description: "Get perfectly defined brows with Mira's Liquid Eye Brow, a natural, rich formula designed to shape and enhance your brows with a smooth, long-lasting finish. Easy to apply and suitable for all skin types",
    imageUrl: "/Images/Beauty/Wanmora/Wanmora P3.jpg",
    brandId: "6",
    categoryId: "2"
  },
  {
    id: "46",
    name: "Dusty Rose",
    slug: "dusty-rose",
    price: 70,
    description: "A soft, elegant color for any look, Dusty Rose by Mira Natural Products is a pinkish nude lip gloss that adds a beautiful touch and long-lasting moisture to your lips",
    imageUrl: "/Images/Beauty/Wanmora/Wanmora P4.jpg",
    brandId: "6",
    categoryId: "2"
  },
  {
    id: "47",
    name: "Pearl Necklace",
    slug: "pearl-necklace",
    price: 65,
    description: "A timeless pearl necklace that adds elegance to any outfit. Perfect for daily wear or special occasion",
    imageUrl: "/Images/Accessories/Butterfly/Butterfly P1.jpg",
    brandId: "9",
    categoryId: "5"
  },
  {
    id: "48",
    name: "Heart Pearl Necklace",
    slug: "heart-pearl-necklace",
    price: 85,
    description: "Delicate and romantic, this pearl necklace features subtle heart-shaped details for a soft feminine touch",
    imageUrl: "/Images/Accessories/Butterfly/Butterfly P2.jpg",
    brandId: "9",
    categoryId: "5"
  },
  {
    id: "49",
    name: "Pearl Chocker Necklace",
    slug: "pearl-chocker-necklace",
    price: 175,
    description: "Make a bold statement with this layered pearl choker, combining classic charm with modern style",
    imageUrl: "/Images/Accessories/Butterfly/Butterfly P3.jpg",
    brandId: "9",
    categoryId: "5"
  }
];

export const getBrandsByCategory = (categorySlug: string): Brand[] => {
  return brands.filter(brand => brand.categories.includes(categorySlug));
};

export const getProductsByBrand = (brandId: string): Product[] => {
  return products.filter(product => product.brandId === brandId);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getProductsBySubCategory = (subCategoryId: string): Product[] => {
  return products.filter(product => product.subCategoryId === subCategoryId);
};

export const getBrandById = (id: string): Brand | undefined => {
  return brands.find(brand => brand.id === id);
};

export const getBrandBySlug = (slug: string): Brand | undefined => {
  return brands.find(brand => brand.slug === slug);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getSubCategoriesByBrand = (brandId: string): SubCategory[] => {
  return subCategories.filter(subCategory => subCategory.brandId === brandId);
};

export const getSubCategoryBySlug = (slug: string): SubCategory | undefined => {
  return subCategories.find(subCategory => subCategory.slug === slug);
};
