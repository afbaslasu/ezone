import React, { createContext, useReducer } from "react";

const CartContext = createContext();
const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
export default CartContext;
