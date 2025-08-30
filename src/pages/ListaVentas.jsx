// src/pages/ListaVentas.jsx
import React, { useEffect, useState } from "react";

export default function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const res = await fetch("https://backend-venta.vercel.app/api/ventas");
        const data = await res.json();
        setVentas(data);
      } catch (err) {
        console.error("Error cargando ventas", err);
      }
    };
    fetchVentas();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Ventas</h2>
      <div className="grid gap-4">
        {ventas.map((venta) => (
          <div
            key={venta._id}
            className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2"
          >
            <p className="font-semibold">
              Cliente:{" "}
              <span className="text-purple-700">
                {venta.usuario?.name || "Desconocido"}
              </span>
            </p>
            <p>
              💰 Total: <span className="font-medium">${venta.total || 0}</span>
            </p>

            <button
              onClick={() =>
                setVentaSeleccionada(
                  ventaSeleccionada?._id === venta._id ? null : venta
                )
              }
              className="bg-purple-600 text-white px-3 py-1 rounded-xl hover:bg-purple-800"
            >
              {ventaSeleccionada?._id === venta._id ? "Ocultar" : "Ver"}
            </button>

            {ventaSeleccionada?._id === venta._id && (
              <div className="mt-2 p-2 border rounded-xl bg-gray-50">
                <h4 className="font-semibold mb-1">Productos comprados:</h4>
                <ul className="list-disc ml-4">
                  {venta.productos?.map((p, idx) => (
                    <li key={idx}>
                      {p.nombre} - ${p.precio}
                    </li>
                  )) || <p>No hay productos</p>}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}




