const path = require("node:path");
const express = require("express");
const app = express();
const cors = require("cors");
const gamesRouter = require("./routers/gamesRouter");
const categoriesRouter = require("./routers/categoriesRouter");

require("dotenv").config();

// Middleware
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "https://your-frontend-domain.com",
      credentials: true,
    })
  );
} else {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", gamesRouter);
app.use("/api", categoriesRouter);

// Only serve static files in production
if (process.env.NODE_ENV === "production") {
  const assetsPath = path.join(__dirname, "public");
  const clientDistPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(assetsPath));
  app.use(express.static(clientDistPath));
  // Catch-all route for SPA
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
