import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    fetch(`http://localhost:4000/api/products/${id}`)
      .then((r) => r.json())
      .then(setP);
  }, [id]);

  if (!p) return <div>Loading…</div>;

  return (
    <div className="p-4 flex flex-col items-center">
      <img
        src={p.thumbnail || p.image}
        alt={p.title}
        className="w-full max-w-md object-cover"
      />
      <h1 className="text-2xl font-bold mt-4">{p.title}</h1>
      <p className="mt-2">${p.price}</p>
      <p className="mt-2">{p.description}</p>
      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
        onClick={() => dispatch({ type: "ADD_ITEM", payload: p })}
      >
        Add to Cart
      </button>
    </div>
  );
}
