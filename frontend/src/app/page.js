"use client";

import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nombre_cliente: "",
    cedula: "",
    valor: "",
    tasa_interes: "",
    plazo_meses: "",
    comercial: "",
  });
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    const errorValidacion = validar();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    setCargando(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/creditos", form);
      setMensaje(res.data.mensaje);
      setForm({
        nombre_cliente: "",
        cedula: "",
        valor: "",
        tasa_interes: "",
        plazo_meses: "",
        comercial: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar el crédito");
    } finally {
      setCargando(false);
    }
  };

  const campos = [
    { label: "Nombre del cliente", name: "nombre_cliente", type: "text" },
    { label: "Cédula o ID", name: "cedula", type: "text" },
    { label: "Valor del crédito", name: "valor", type: "number" },
    { label: "Tasa de interés (%)", name: "tasa_interes", type: "number" },
    { label: "Plazo en meses", name: "plazo_meses", type: "number" },
    { label: "Comercial", name: "comercial", type: "text" },
  ];

  const validar = () => {
    if (!form.nombre_cliente.trim())
      return "El nombre del cliente es obligatorio";
    if (!form.cedula.trim() || form.cedula.trim().length < 5)
      return "La cédula debe tener al menos 5 caracteres";
    if (!form.valor || Number(form.valor) <= 0)
      return "El valor del crédito debe ser mayor a 0";
    if (
      !form.tasa_interes ||
      Number(form.tasa_interes) <= 0 ||
      Number(form.tasa_interes) > 100
    )
      return "La tasa de interés debe estar entre 0 y 100";
    if (!form.plazo_meses || Number(form.plazo_meses) <= 0)
      return "El plazo en meses debe ser mayor a 0";
    if (!form.comercial.trim()) return "El nombre del comercial es obligatorio";
    return null;
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-8 mt-8">
      <h2 className="text-2xl font-bold text-[#1a4731] mb-6">
        Registrar Crédito
      </h2>

      {mensaje && (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg mb-4">
          ✅ {mensaje}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg mb-4">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {campos.map((campo) => (
          <div key={campo.name} className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              {campo.label}
            </label>
            <input
              type={campo.type}
              name={campo.name}
              value={form[campo.name]}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a4731]"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={cargando}
          className="mt-2 bg-[#1a4731] text-white py-3 rounded-lg font-semibold hover:bg-[#145c3a] transition-colors disabled:opacity-50"
        >
          {cargando ? "Registrando..." : "Registrar Crédito"}
        </button>
      </form>
    </div>
  );
}
