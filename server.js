const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware to handle JSON requests
app.use(express.json());

// ✅ Serve static files (HTML, JS, CSS) from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ Optional: Serve index.html manually for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Example API route (optional)
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is linked with index.html!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
