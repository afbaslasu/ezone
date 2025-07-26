import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

export default function ProductCard({ product }) {
  const imageUrl =
    product.image || "https://via.placeholder.com/300x300?text=No+Image";
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Button */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
        <FiHeart className="text-gray-400 group-hover:text-red-500" />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.title}
            className={`w-full h-64 object-contain transition-transform duration-500 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x300?text=No+Image";
            }}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-lg font-bold text-gray-900">${product.price}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </p>
            )}
          </div>
          <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition">
            <FiShoppingCart />
          </button>
        </div>
      </div>

      
    </div>
  );
}
