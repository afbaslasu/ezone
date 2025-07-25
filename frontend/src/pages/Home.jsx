// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = new URLSearchParams({
          page: page.toString(),
          perPage: perPage.toString(),
          search: search,
        }).toString();

        const res = await fetch(`http://localhost:4000/api/products?${query}`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        setProducts((prev) =>
          page === 1 ? data.products : [...prev, ...data.products]
        );
        setTotal(data.total);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProducts();
  }, [search, page]);

  const handleSearch = (term) => {
    setPage(1);
    setSearch(term);
  };

  const canLoadMore = page * perPage < total;

  return (
    <div className="p-4">
      <FilterBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {canLoadMore && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
