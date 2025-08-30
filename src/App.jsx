// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import Login from "./pages/Login.jsx";
import CrearProducto from "./pages/CrearProducto.jsx";
import ListaVentas from "./pages/ListaVentas.jsx";
import Tienda from "./pages/Tienda.jsx";
import Carrito from "./pages/Carrito.jsx";

import { CarritoProvider } from "./context/CarritoContext";

// 👇 Importa los estilos móviles
import "./mobile.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <CarritoProvider>
      <BrowserRouter>
        {user && (
          <nav>
            <Link to="/ventas">📃 Ventas</Link>
            <Link to="/crear-producto">➕ Producto</Link>
            <Link to="/tienda">🕹️ Tienda</Link>
            <Link to="/carrito">🛒 Carrito</Link>
          </nav>
        )}

        <div className="main">
          <Routes>
            {/* Login */}
            <Route path="/login" element={<Login setUser={setUser} />} />

            {/* Productos y Ventas */}
            <Route
              path="/crear-producto"
              element={user ? <CrearProducto user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/ventas"
              element={user ? <ListaVentas /> : <Navigate to="/login" />}
            />

            {/* Tienda y Carrito */}
            <Route
              path="/tienda"
              element={user ? <Tienda /> : <Navigate to="/login" />}
            />
            <Route
              path="/carrito"
              element={user ? <Carrito /> : <Navigate to="/login" />}
            />

            {/* Redirecciones */}
            <Route path="/" element={<Navigate to={user ? "/ventas" : "/login"} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;





