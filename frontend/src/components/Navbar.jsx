import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import CartContext from "../context/CartContext";
import {
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaChevronDown,
} from "react-icons/fa";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const totalQty = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  // Sync search query with URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlSearch = searchParams.get("search") || "";
    setSearchQuery(urlSearch);
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = searchQuery.trim();
    if (location.pathname === "/") {
      // If we're already on home page, just update the search
      navigate(`/?search=${encodeURIComponent(searchTerm)}`, { replace: true });
    } else {
      // If we're on another page, navigate to home with search
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
    setIsMenuOpen(false);
  };

  // Categories data
  const categories = [
    { name: "Electronics", path: "/category/electronics" },
    { name: "Clothing", path: "/category/clothing" },
    { name: "Home & Garden", path: "/category/home" },
    { name: "Beauty", path: "/category/beauty" },
    { name: "Sports", path: "/category/sports" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Ezone
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 mx-8"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent border-none focus:outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="text-gray-500 hover:text-gray-700"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            <Link
              to="/account"
              className="hidden md:block text-gray-700 hover:text-blue-600"
            >
              <div className="flex items-center">
                <FaUser className="mr-1" />
                <span className="text-sm">Account</span>
              </div>
            </Link>

            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600"
            >
              <FaShoppingCart size={20} />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search - Only shown when menu is open */}
        {isMenuOpen && (
          <form
            onSubmit={handleSearch}
            className="md:hidden flex items-center bg-gray-100 rounded-full px-4 py-2 mb-3 mx-4"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none focus:outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="text-gray-500" aria-label="Search">
              <FaSearch />
            </button>
          </form>
        )}

        {/* Categories Bar */}
        <div className="hidden md:flex items-center justify-center space-x-6 py-3 border-t border-gray-100">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="text-gray-700 hover:text-blue-600 text-sm font-medium flex items-center"
            >
              {category.name}
              <FaChevronDown size={12} className="ml-1" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
