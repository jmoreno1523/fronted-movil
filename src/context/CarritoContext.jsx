// src/context/CarritoContext.jsx
import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  // ➕ Agregar producto
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  // ❌ Eliminar producto (usamos _id o id, según venga del backend o frontend)
  const eliminarDelCarrito = (id) => {
    setCarrito((prev) =>
      prev.filter((item) => item._id !== id && item.id !== id)
    );
  };

  // 🗑️ Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

// Hook personalizado
export function useCarrito() {
  return useContext(CarritoContext);
}
