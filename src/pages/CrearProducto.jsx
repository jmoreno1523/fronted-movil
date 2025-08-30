// src/pages/CrearProducto.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearProducto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://backend-venta.vercel.app/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio: Number(precio),
          imagen,
        }),
      });

      if (!res.ok) throw new Error("Error al crear producto");
      alert("✅ Producto creado");
      navigate("/tienda");
    } catch (err) {
      console.error(err);
      alert("❌ Error creando producto");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>➕ Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <br />
        <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <br />
        <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        <br />
        <input type="text" placeholder="URL de imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} />
        <br />
        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
}

export default CrearProducto;





