// backend/seed.js
const mongoose = require("mongoose");
const Category = require("./models/Category");
const Product = require("./models/Product");

mongoose.connect(
  "mongodb+srv://bodarasumit007:admin123@cluster0.dmdjebc.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const categories = [
  { name: "Sneakers", description: "Athletic and casual sneakers" },
  { name: "Running Shoes", description: "High-performance running shoes" },
  { name: "Basketball Shoes", description: "Shoes designed for basketball" },
];

const products = [
  {
    name: "Air Jordan 1",
    description: "Classic basketball sneaker",
    price: 170,
    category: "Sneakers",
    imageUrl: "https://example.com/air-jordan-1.jpg",
  },
  {
    name: "Nike Air Max 90",
    description: "Iconic casual sneaker",
    price: 120,
    category: "Sneakers",
    imageUrl: "https://example.com/air-max-90.jpg",
  },
  {
    name: "Brooks Ghost 13",
    description: "Comfortable neutral running shoe",
    price: 130,
    category: "Running Shoes",
    imageUrl: "https://example.com/brooks-ghost-13.jpg",
  },
  {
    name: "Asics Gel-Nimbus 23",
    description: "Premium cushioned running shoe",
    price: 150,
    category: "Running Shoes",
    imageUrl: "https://example.com/asics-gel-nimbus-23.jpg",
  },
  {
    name: "Nike Kyrie 7",
    description: "Signature basketball shoe",
    price: 130,
    category: "Basketball Shoes",
    imageUrl: "https://example.com/nike-kyrie-7.jpg",
  },
  {
    name: "Under Armour Curry 8",
    description: "High-performance basketball shoe",
    price: 160,
    category: "Basketball Shoes",
    imageUrl: "https://example.com/ua-curry-8.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await Category.deleteMany({});
    await Product.deleteMany({});

    const createdCategories = await Category.insertMany(categories);
    console.log("Categories seeded successfully");

    const productsWithCategoryIds = products.map((product) => {
      const category = createdCategories.find(
        (cat) => cat.name === product.category
      );
      return { ...product, category: category._id };
    });

    await Product.insertMany(productsWithCategoryIds);
    console.log("Products seeded successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
