import React, { useContext } from "react";
import CartContext from "../context/CartContext";

export default function CartPage() {
  const { cart, dispatch } = useContext(CartContext);
  const total = cart.items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  const handleCheckout = () => {
    alert("Checkout simulated! Total: $" + total.toFixed(2));
    dispatch({ type: "CLEAR_CART" });
  };

  if (cart.items.length === 0)
    return <div className="p-4">Your cart is empty.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.items.map((item) => (
        <div key={item.id} className="flex items-center border-b py-2">
          <img
            src={item.thumbnail || item.image}
            alt={item.title}
            className="w-16 h-16 object-cover"
          />
          <div className="ml-4 flex-grow">
            <h3>{item.title}</h3>
            <p>Qty: {item.quantity}</p>
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded"
            onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-4 text-xl font-bold">Total: ${total.toFixed(2)}</div>
      <button
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded"
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
}
