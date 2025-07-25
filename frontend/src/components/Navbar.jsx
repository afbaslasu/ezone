import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const totalQty = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link to="/" className="text-xl font-bold">
        AliClone
      </Link>
      <Link to="/cart" className="relative">
        <FaShoppingCart size={24} />
        {totalQty > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-sm w-5 h-5 flex items-center justify-center">
            {totalQty}
          </span>
        )}
      </Link>
    </nav>
  );
}
