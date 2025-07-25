const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const quoteRoutes = require("./routes/quotes")
const publicQuotes = require("./routes/publicQuotes")
const userRoutes = require("./routes/user")

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // your React frontend
  credentials: true
}))
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Quotes API running!");
});

app.use("/api/auth", authRoutes);

app.use("/api/quotes", quoteRoutes);

app.use("/api/public-quotes", publicQuotes);

app.use("/api/user", userRoutes);

// DB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));;