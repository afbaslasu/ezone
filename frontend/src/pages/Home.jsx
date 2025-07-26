import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const perPage = 20;
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const searchParams = new URLSearchParams(location.search);
        const search = searchParams.get("search") || "";

        const query = new URLSearchParams({
          page: page.toString(),
          perPage: perPage.toString(),
          search: search,
        }).toString();

        const res = await fetch(`http://localhost:4000/api/products?${query}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setProducts((prev) =>
          page === 1 ? data.products : [...prev, ...data.products]
        );
        setTotal(data.total);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [location.search, page]);

  const canLoadMore = page * perPage < total;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section (only on first page with no search) */}
      {page === 1 && !location.search && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 mb-10 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Ezone</h1>
          <p className="text-xl mb-6">
            Discover smileLink latest products at unbeatable prices
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
              Shop Now
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition">
              Learn More
            </button>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {isLoading && page === 1 ? (
        <div className="flex justify-center items-center h-64">
          <FiLoader className="animate-spin text-4xl text-gray-400" />
        </div>
      ) : (
        <>
          {/* Search Results Header */}
          {location.search && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Search Results for "
                {new URLSearchParams(location.search).get("search")}"
              </h2>
              <p className="text-gray-500">{total} products found</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}

      {/* Load More Button */}
      {canLoadMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={isLoading}
            className={`px-8 py-3 rounded-full font-medium ${
              isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } transition-colors`}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
