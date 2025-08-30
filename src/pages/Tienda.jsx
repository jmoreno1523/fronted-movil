// src/pages/Tienda.jsx
import React, { useEffect, useState } from "react";
import { useCarrito } from "../context/CarritoContext";

function Tienda() {
  const [productos, setProductos] = useState([]);
  const { carrito, agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("https://backend-venta.vercel.app/api/productos");
        const data = await res.json();

        if (Array.isArray(data)) setProductos(data);
        else if (Array.isArray(data.productos)) setProductos(data.productos);
        else setProductos([]);
      } catch (error) {
        console.error("Error cargando productos:", error);
        setProductos([]);
      }
    };
    fetchProductos();
  }, []);

  // Función para agregar al carrito sin reemplazar lo existente
  const handleAgregar = (producto) => {
    // Revisamos si ya existe en el carrito
    const existe = carrito.find((p) => p._id === producto._id);
    if (!existe) {
      agregarAlCarrito(producto);
    } else {
      alert("Este producto ya está en el carrito");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🕹️ Tienda</h2>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {productos.length === 0 && <p>No hay productos disponibles.</p>}
        {productos.map((prod) => (
          <div
            key={prod._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              width: 220,
              boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={prod.imagen}
              alt={prod.nombre}
              style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 4 }}
            />
            <h3>{prod.nombre}</h3>
            <p style={{ fontSize: 14, minHeight: 40 }}>{prod.descripcion}</p>
            <p>
              <b>💲 {prod.precio}</b>
            </p>
            <button
              onClick={() => handleAgregar(prod)}
              style={{
                padding: "6px 10px",
                background: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              🛒 Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tienda;



