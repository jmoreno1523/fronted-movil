import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Bienvenido ${data.nombre} ✅`);
        setUser(data);
        navigate("/ventas");
      } else {
        alert("Credenciales inválidas ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold text-center mb-4">🔑 Iniciar Sesión</h2>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            className="border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded-lg font-semibold shadow hover:bg-green-600 active:scale-95 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;



