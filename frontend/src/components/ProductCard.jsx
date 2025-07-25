import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  // Fallback image if none provided
  const imageUrl =
    product.image || "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <Link to={`/product/${product.id}`} className="border p-2 hover:shadow-lg">
      <img
        src={imageUrl}
        alt={product.title}
        className="w-full h-48 object-contain"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
        }}
      />
      <h3 className="mt-2 font-semibold">{product.title}</h3>
      <p className="font-bold">${product.price}</p>
    </Link>
  );
}
