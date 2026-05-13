import bcrypt from "bcrypt";
import { Op } from "sequelize";
import db from "../models/index.js";

const demoUserIds = [
  "11111111-1111-4111-8111-111111111111",
  "22222222-2222-4222-8222-222222222222",
  "33333333-3333-4333-8333-333333333333",
];

const demoCartIds = [
  "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
];

const products = [
  {
    productId: "00000000-0000-4000-8000-000000000001",
    name: "Structured Cotton Overshirt",
    description: "Heavy cotton overshirt with a clean architectural silhouette.",
    price: 79.99,
    size: "M",
    color: "Black",
    stock: 24,
    imageUrl: "https://images.unsplash.com/photo-1523398002811-999ca8dec234",
    category: "Outerwear",
  },
  {
    productId: "00000000-0000-4000-8000-000000000002",
    name: "Relaxed Wool Blend Coat",
    description: "Minimal long coat with soft structure and hidden fastening.",
    price: 169.99,
    size: "L",
    color: "Charcoal",
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3",
    category: "Outerwear",
  },
  {
    productId: "00000000-0000-4000-8000-000000000003",
    name: "Urban Technical Parka",
    description: "Water-resistant parka with utility pockets and matte finish.",
    price: 139.99,
    size: "M",
    color: "Graphite",
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
    category: "Outerwear",
  },
  {
    productId: "00000000-0000-4000-8000-000000000004",
    name: "Boxy Denim Jacket",
    description: "Cropped denim jacket with a boxy premium streetwear cut.",
    price: 89.99,
    size: "S",
    color: "Washed Black",
    stock: 22,
    imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531",
    category: "Outerwear",
  },
  {
    productId: "00000000-0000-4000-8000-000000000005",
    name: "Minimal Bomber Jacket",
    description: "Clean bomber jacket with ribbed cuffs and smooth lining.",
    price: 99.99,
    size: "M",
    color: "Olive",
    stock: 16,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    category: "Outerwear",
  },
  {
    productId: "00000000-0000-4000-8000-000000000006",
    name: "Essential Heavyweight Tee",
    description: "Premium heavyweight cotton T-shirt with relaxed proportions.",
    price: 29.99,
    size: "M",
    color: "White",
    stock: 80,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Tops",
  },
  {
    productId: "00000000-0000-4000-8000-000000000007",
    name: "Ribbed Long Sleeve Top",
    description: "Fitted ribbed top for layered city styling.",
    price: 39.99,
    size: "S",
    color: "Black",
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
    category: "Tops",
  },
  {
    productId: "00000000-0000-4000-8000-000000000008",
    name: "Oversized Poplin Shirt",
    description: "Crisp poplin shirt with dropped shoulders and curved hem.",
    price: 59.99,
    size: "L",
    color: "White",
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    category: "Tops",
  },
  {
    productId: "00000000-0000-4000-8000-000000000009",
    name: "Soft Knit Polo",
    description: "Fine knit polo with tonal buttons and relaxed collar.",
    price: 49.99,
    size: "M",
    color: "Stone",
    stock: 28,
    imageUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990",
    category: "Tops",
  },
  {
    productId: "00000000-0000-4000-8000-000000000010",
    name: "Sleeveless Utility Vest",
    description: "Lightweight vest with functional pockets and clean edges.",
    price: 69.99,
    size: "M",
    color: "Black",
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    category: "Tops",
  },
  {
    productId: "00000000-0000-4000-8000-000000000011",
    name: "Straight Leg Tailored Trouser",
    description: "Sharp everyday trouser with a straight leg and soft drape.",
    price: 74.99,
    size: "M",
    color: "Black",
    stock: 32,
    imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    category: "Bottoms",
  },
  {
    productId: "00000000-0000-4000-8000-000000000012",
    name: "Wide Leg Pleated Pant",
    description: "Fluid wide-leg pant with front pleats and concealed closure.",
    price: 84.99,
    size: "L",
    color: "Grey",
    stock: 26,
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
    category: "Bottoms",
  },
  {
    productId: "00000000-0000-4000-8000-000000000013",
    name: "Cargo Twill Pant",
    description: "Modern cargo pant with tonal pockets and adjustable hem.",
    price: 79.99,
    size: "M",
    color: "Khaki",
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    category: "Bottoms",
  },
  {
    productId: "00000000-0000-4000-8000-000000000014",
    name: "Raw Hem Black Denim",
    description: "Straight black denim with raw hem detail and firm handfeel.",
    price: 64.99,
    size: "M",
    color: "Black",
    stock: 38,
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    category: "Bottoms",
  },
  {
    productId: "00000000-0000-4000-8000-000000000015",
    name: "Drawstring City Short",
    description: "Tailored drawstring short made for warm urban days.",
    price: 44.99,
    size: "M",
    color: "Sand",
    stock: 42,
    imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b",
    category: "Bottoms",
  },
  {
    productId: "00000000-0000-4000-8000-000000000016",
    name: "Architectural Knit Dress",
    description: "Minimal knit dress with clean lines and subtle texture.",
    price: 89.99,
    size: "S",
    color: "Black",
    stock: 14,
    imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956",
    category: "Dresses",
  },
  {
    productId: "00000000-0000-4000-8000-000000000017",
    name: "Column Midi Dress",
    description: "Sleeveless midi dress with a long column silhouette.",
    price: 94.99,
    size: "M",
    color: "Ivory",
    stock: 17,
    imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    category: "Dresses",
  },
  {
    productId: "00000000-0000-4000-8000-000000000018",
    name: "Fluid Wrap Dress",
    description: "Soft wrap dress with clean waist tie and fluid movement.",
    price: 79.99,
    size: "M",
    color: "Slate",
    stock: 19,
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    category: "Dresses",
  },
  {
    productId: "00000000-0000-4000-8000-000000000019",
    name: "Minimal Slip Dress",
    description: "Bias-cut slip dress with adjustable straps and matte finish.",
    price: 69.99,
    size: "S",
    color: "Black",
    stock: 23,
    imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae",
    category: "Dresses",
  },
  {
    productId: "00000000-0000-4000-8000-000000000020",
    name: "Tailored Shirt Dress",
    description: "Buttoned shirt dress with structured collar and relaxed fit.",
    price: 84.99,
    size: "L",
    color: "White",
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1550639525-c97d455acf70",
    category: "Dresses",
  },
  {
    productId: "00000000-0000-4000-8000-000000000021",
    name: "Leather Minimal Sneaker",
    description: "Low-profile leather sneaker with tonal sole and clean panels.",
    price: 119.99,
    size: "42",
    color: "White",
    stock: 21,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    category: "Shoes",
  },
  {
    productId: "00000000-0000-4000-8000-000000000022",
    name: "Chunky Urban Runner",
    description: "Textured runner with sculpted sole and breathable upper.",
    price: 129.99,
    size: "43",
    color: "Grey",
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Shoes",
  },
  {
    productId: "00000000-0000-4000-8000-000000000023",
    name: "Matte Chelsea Boot",
    description: "Streamlined Chelsea boot with elastic side panels.",
    price: 149.99,
    size: "42",
    color: "Black",
    stock: 13,
    imageUrl: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f",
    category: "Shoes",
  },
  {
    productId: "00000000-0000-4000-8000-000000000024",
    name: "Square Toe Loafer",
    description: "Modern loafer with square toe and polished leather upper.",
    price: 109.99,
    size: "41",
    color: "Black",
    stock: 16,
    imageUrl: "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
    category: "Shoes",
  },
  {
    productId: "00000000-0000-4000-8000-000000000025",
    name: "Canvas City Mule",
    description: "Easy canvas mule for minimal everyday styling.",
    price: 59.99,
    size: "40",
    color: "Ecru",
    stock: 27,
    imageUrl: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1",
    category: "Shoes",
  },
  {
    productId: "00000000-0000-4000-8000-000000000026",
    name: "Structured Crossbody Bag",
    description: "Compact crossbody bag with adjustable strap and matte hardware.",
    price: 69.99,
    size: "One Size",
    color: "Black",
    stock: 34,
    imageUrl: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c",
    category: "Accessories",
  },
  {
    productId: "00000000-0000-4000-8000-000000000027",
    name: "Slim Leather Belt",
    description: "Minimal leather belt with brushed metal buckle.",
    price: 34.99,
    size: "M",
    color: "Black",
    stock: 55,
    imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc",
    category: "Accessories",
  },
  {
    productId: "00000000-0000-4000-8000-000000000028",
    name: "Fine Rib Beanie",
    description: "Soft ribbed beanie with a close fit and tonal finish.",
    price: 24.99,
    size: "One Size",
    color: "Charcoal",
    stock: 48,
    imageUrl: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9",
    category: "Accessories",
  },
  {
    productId: "00000000-0000-4000-8000-000000000029",
    name: "Brushed Metal Sunglasses",
    description: "Angular sunglasses with dark lenses and slim metal frame.",
    price: 54.99,
    size: "One Size",
    color: "Silver",
    stock: 29,
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    category: "Accessories",
  },
  {
    productId: "00000000-0000-4000-8000-000000000030",
    name: "Textured Wool Scarf",
    description: "Long wool scarf with subtle texture and clean edge finish.",
    price: 49.99,
    size: "One Size",
    color: "Grey",
    stock: 31,
    imageUrl: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9",
    category: "Accessories",
  },
];

async function seedDatabase() {
  const passwordHash = await bcrypt.hash("Password123!", 10);

  const users = [
    {
      userId: demoUserIds[0],
      email: "alex.rivera@example.com",
      passwordHash,
      firstName: "Alex",
      lastName: "Rivera",
      address: "Calle Serrano 21",
      city: "Madrid",
      postalCode: "28001",
      country: "Spain",
      phone: "+34 600 111 222",
    },
    {
      userId: demoUserIds[1],
      email: "nora.stone@example.com",
      passwordHash,
      firstName: "Nora",
      lastName: "Stone",
      address: "Gran Via 88",
      city: "Madrid",
      postalCode: "28013",
      country: "Spain",
      phone: "+34 600 333 444",
    },
    {
      userId: demoUserIds[2],
      email: "leo.martin@example.com",
      passwordHash,
      firstName: "Leo",
      lastName: "Martin",
      address: "Passeig de Gracia 14",
      city: "Barcelona",
      postalCode: "08007",
      country: "Spain",
      phone: "+34 600 555 666",
    },
  ];

  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    await db.CartItem.destroy({
      where: {
        cartId: {
          [Op.in]: demoCartIds,
        },
      },
    });
    await db.Cart.destroy({
      where: {
        cartId: {
          [Op.in]: demoCartIds,
        },
      },
    });
    await db.Product.destroy({
      where: {
        productId: {
          [Op.in]: products.map((product) => product.productId),
        },
      },
    });
    await db.User.destroy({
      where: {
        userId: {
          [Op.in]: demoUserIds,
        },
      },
    });

    await db.User.bulkCreate(users);
    await db.Product.bulkCreate(products);

    console.log("Database seeded successfully.");
    console.log(`Created ${users.length} users.`);
    console.log(`Created ${products.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error("Unable to seed database:", error);
    process.exit(1);
  }
}

seedDatabase();
