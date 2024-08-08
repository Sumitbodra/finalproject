const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://bodarasumit007:admin123@cluster0.dmdjebc.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
    seedData();
  })
  .catch((err) => console.error(err));

const seedData = async () => {
  const products = [
    {
      name: "Running Shoes",
      description: "Comfortable running shoes for everyday use.",
      price: 59.99,
      category: "Running",
      imageUrl: "https://example.com/running-shoes.jpg",
    },
    {
      name: "Basketball Shoes",
      description: "High-performance shoes for basketball players.",
      price: 89.99,
      category: "Basketball",
      imageUrl: "https://example.com/basketball-shoes.jpg",
    },
    {
      name: "Casual Sneakers",
      description: "Stylish and comfortable casual sneakers.",
      price: 49.99,
      category: "Casual",
      imageUrl: "https://example.com/casual-sneakers.jpg",
    },
    {
      name: "Hiking Boots",
      description: "Durable boots for hiking and outdoor adventures.",
      price: 109.99,
      category: "Hiking",
      imageUrl: "https://example.com/hiking-boots.jpg",
    },
    {
      name: "Formal Shoes",
      description: "Elegant shoes perfect for formal occasions.",
      price: 79.99,
      category: "Formal",
      imageUrl: "https://example.com/formal-shoes.jpg",
    },
  ];

  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Data seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};
