require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const apiLimiter = require("./middleware/rateLimiter");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(apiLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Add sample products
const Product = require("./models/Product");
const sampleProducts = [
  {
    name: "Laptop",
    description: "High-performance laptop",
    price: 999.99,
    stock: 50,
    image: "https://loremflickr.com/320/240/commerce,product/all",
  },
  {
    name: "Smartphone",
    description: "Latest model smartphone",
    price: 699.99,
    stock: 100,
    image: "https://loremflickr.com/320/240/commerce,product/all",
  },
  {
    name: "Headphones",
    description: "Noise-cancelling headphones",
    price: 199.99,
    stock: 200,
    image: "https://loremflickr.com/320/240/commerce,product/all",
  },
  {
    name: "Smartwatch",
    description: "Fitness tracking smartwatch",
    price: 249.99,
    stock: 75,
    image: "https://loremflickr.com/320/240/commerce,product/all",
  },
  {
    name: "Tablet",
    description: "10-inch tablet with retina display",
    price: 399.99,
    stock: 60,
    image: "https://loremflickr.com/320/240/commerce,product/all",
  },
];

const addSampleProducts = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("Sample products added successfully");
  } catch (error) {
    console.error("Error adding sample products:", error);
  }
};

addSampleProducts();
