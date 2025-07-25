// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Helper to fetch full product list
async function fetchAllProducts() {
  const resp = await fetch("https://fakestoreapi.com/products");
  if (!resp.ok) throw new Error(` upstream status ${resp.status}`);
  return resp.json();
}

// GET /api/products?search=&category=&page=1&perPage=20
app.get("/api/products", async (req, res) => {
  try {
    let { search = "", category = "", page = 1, perPage = 20 } = req.query;
    page = parseInt(page);
    perPage = parseInt(perPage);

    let products = await fetchAllProducts();

    // 1) filter by category
    if (category) {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // 2) filter by search term in title or description
    if (search) {
      const term = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    const total = products.length;
    const start = (page - 1) * perPage;
    const paginated = products.slice(start, start + perPage);

    res.json({
      products: paginated,
      total,
      page,
      perPage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", detail: err.message });
  }
});

// GET /api/products/:id
app.get("/api/products/:id", async (req, res) => {
  try {
    const resp = await fetch(
      `https://fakestoreapi.com/products/${req.params.id}`
    );
    if (!resp.ok) return res.status(resp.status).json({ message: "Not found" });
    const product = await resp.json();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", detail: err.message });
  }
});

// (leave your carts endpoint as‑is if it works)
app.get("/api/carts", async (_, res) => {
  try {
    const resp = await fetch(
      "https://fakestoreapiserver.reactbd.org/api/carts"
    );
    const carts = await resp.json();
    res.json(carts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Carts error", detail: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`API server running on http://localhost:${PORT}`)
);
