// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();
const PORT = 4000 || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(
    "mongodb+srv://bodarasumit007:admin123@cluster0.dmdjebc.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.listen(4000, () => {
  console.log(`Server running on port ${PORT}`);
});
