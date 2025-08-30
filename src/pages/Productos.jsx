// src/pages/Productos.jsx
import React, { useEffect, useState } from "react";

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("https://backend-venta.vercel.app/api/productos");
        const data = await res.json();

        // ✅ Aseguramos que sea siempre un array
        if (Array.isArray(data)) {
          setProductos(data);
        } else if (Array.isArray(data.productos)) {
          setProductos(data.productos);
        } else {
          setProductos([]); // fallback
        }
      } catch (error) {
        console.error("Error cargando productos:", error);
        setProductos([]); // fallback si hay error
      }
    };
    fetchProductos();
  }, []);

  return (
    <div className="page productos-page">
      <h2 className="page-title">🛒 Tienda de Videojuegos</h2>

      <div className="productos-grid">
        {productos.length === 0 ? (
          <p className="text-gray-500">No hay productos disponibles.</p>
        ) : (
          productos.map((p) => (
            <article key={p._id} className="card producto-card">
              <div className="thumb">
                <img
                  src={p.imagen || "/placeholder.png"}
                  alt={p.nombre}
                  className="thumb-img"
                />
              </div>

              <div className="card-body">
                <h3 className="producto-nombre">🎮 {p.nombre}</h3>
                <p className="producto-precio">💵 ${p.precio}</p>
                <div className="producto-actions">
                  <button className="btn">Ver</button>
                  <button className="btn btn-primary">Comprar</button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default Productos;

