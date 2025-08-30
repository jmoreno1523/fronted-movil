// src/pages/Carrito.jsx
import React from "react";
import { useCarrito } from "../context/CarritoContext";

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();

  // Intentamos leer el usuario guardado en localStorage (si lo tienes)
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      return null;
    }
  })();
  const userId = storedUser?._id || storedUser?.id || null;

  const total = carrito.reduce((acc, item) => acc + Number(item.precio || 0), 0);

  const confirmarCompra = async () => {
    // Construimos el payload exactamente como lo mandaremos
    const productosPayload = carrito.map((p) => ({
      productoId: p._id || p.id || null,
      nombre: p.nombre,
      precio: Number(p.precio || 0),
      cantidad: p.cantidad || 1,
    }));

    const ventaData = {
      productos: productosPayload,
      total,
      // si tenemos usuario lo enviamos (personaliza según tu backend)
      ...(userId ? { usuario: userId } : { cliente: storedUser?.name || "Invitado" }),
    };

    // 1) Log para depurar en el frontend
    console.log(">>> Enviando ventaData:", ventaData);
    console.log(">>> carrito length:", carrito.length);

    try {
      const res = await fetch("https://backend-venta.vercel.app/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ventaData),
      });

      // Leemos respuesta (intenta parsear JSON, si no, texto)
      const text = await res.text();
      let payload;
      try {
        payload = JSON.parse(text);
      } catch {
        payload = { message: text };
      }

      if (!res.ok) {
        // Mostramos en consola y al usuario el mensaje concreto que envía el servidor
        console.error("Error del servidor:", res.status, payload);
        alert("Error registrando venta: " + (payload.message || payload.error || JSON.stringify(payload)));
        return;
      }

      // OK
      console.log("Venta creada:", payload);
      alert("✅ Venta confirmada: " + (payload.message || "OK"));
      vaciarCarrito();
    } catch (err) {
      console.error("Error confirmando compra:", err);
      alert("❌ No se pudo registrar la venta (ver consola)");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "480px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>🛒 Carrito</h2>

      {carrito.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Tu carrito está vacío 😢</p>
      ) : (
        <>
          {carrito.map((prod) => (
            <div key={prod._id || prod.id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0 }}>{prod.nombre}</h3>
                <p style={{ margin: "6px 0", color: "#666" }}>💲 {prod.precio}</p>
              </div>
              <button onClick={() => eliminarDelCarrito(prod._id || prod.id)} style={{ background: "red", color: "white", border: "none", padding: "8px 12px", borderRadius: "8px", cursor: "pointer" }}>❌</button>
            </div>
          ))}

          <h3 style={{ marginTop: 20, textAlign: "center" }}>Total: 💲{total}</h3>

          <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
            <button onClick={confirmarCompra} style={{ flex: 1, background: "green", color: "white", border: "none", padding: 10, borderRadius: 10, cursor: "pointer" }}>✅ Confirmar Compra</button>
            <button onClick={vaciarCarrito} style={{ flex: 1, background: "#333", color: "white", border: "none", padding: 10, borderRadius: 10, cursor: "pointer" }}>🗑️ Vaciar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;





