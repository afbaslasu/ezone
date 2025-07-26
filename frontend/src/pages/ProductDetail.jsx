import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../context/CartContext";
import { FiShoppingCart, FiHeart, FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:4000/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  const images = [product.image, ...(product.images || [])].filter(Boolean);
  const hasDiscount = product.originalPrice > product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="flex items-center text-blue-600 mb-6">
        <FiChevronLeft className="mr-1" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border rounded-lg overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className="w-full h-20 object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>

          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-500">(24 reviews)</span>
          </div>

          <div className="mb-6">
            {hasDiscount && (
              <p className="text-lg text-gray-500 line-through">
                ${product.originalPrice}
              </p>
            )}
            <p
              className={`text-3xl font-bold ${
                hasDiscount ? "text-red-600" : "text-gray-900"
              }`}
            >
              ${product.price}
            </p>
            {hasDiscount && (
              <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded ml-2">
                {Math.round((1 - product.price / product.originalPrice) * 100)}%
                OFF
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-8">{product.description}</p>

          <div className="flex items-center mb-8">
            <div className="flex items-center border rounded-md mr-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                dispatch({
                  type: "ADD_ITEM",
                  payload: { ...product, quantity },
                });
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center"
            >
              <FiShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-3">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <strong>Brand:</strong> {product.brand || "Generic"}
              </li>
              <li>
                <strong>Category:</strong> {product.category || "N/A"}
              </li>
              <li>
                <strong>Availability:</strong> In Stock (25+ items)
              </li>
              <li>
                <strong>SKU:</strong> {product.id}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
