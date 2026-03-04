'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ConsultPage() {
  const [creditos,  setCreditos]  = useState([])
  const [nombre,    setNombre]    = useState('')
  const [cedula,    setCedula]    = useState('')
  const [comercial, setComercial] = useState('')
  const [orden,     setOrden]     = useState('fecha_registro')
  const [direccion, setDireccion] = useState('DESC')

  const fetchCreditos = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/creditos', {
        params: { nombre_cliente: nombre, cedula, comercial, orden, direccion }
      })
      setCreditos(res.data)
    } catch (err) {
      console.error('Error al consultar créditos:', err)
    }
  }

  // Carga automática al entrar y cuando cambia el ordenamiento
  useEffect(() => { fetchCreditos() }, [orden, direccion])

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-[#1a4731] mb-6">Consultar Créditos</h2>

      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <p className="text-sm font-semibold text-gray-500 mb-3">Filtros de búsqueda</p>
        <div className="flex flex-wrap gap-3">
          <input
            placeholder="Buscar por nombre..."
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a4731]"
          />
          <input
            placeholder="Buscar por cédula..."
            value={cedula}
            onChange={e => setCedula(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a4731]"
          />
          <input
            placeholder="Buscar por comercial..."
            value={comercial}
            onChange={e => setComercial(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a4731]"
          />
          <button
            onClick={fetchCreditos}
            className="bg-[#1a4731] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#145c3a] transition-colors"
          >
            🔍 Buscar
          </button>
        </div>

        {/* Ordenamiento */}
        <div className="flex gap-3 items-center mt-4">
          <span className="text-sm text-gray-500 font-semibold">Ordenar por:</span>
          <select
            value={orden}
            onChange={e => setOrden(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a4731]"
          >
            <option value="fecha_registro">Fecha</option>
            <option value="valor">Valor</option>
          </select>
          <select
            value={direccion}
            onChange={e => setDireccion(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a4731]"
          >
            <option value="DESC">Mayor a menor</option>
            <option value="ASC">Menor a mayor</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#1a4731] text-white">
            <tr>
              {['#', 'Nombre', 'Cédula', 'Valor', 'Tasa', 'Plazo', 'Comercial', 'Fecha'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {creditos.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-400">
                  No se encontraron créditos
                </td>
              </tr>
            ) : (
              creditos.map((c, i) => (
                <tr key={c.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-gray-500">{c.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{c.nombre_cliente}</td>
                  <td className="px-4 py-3 text-gray-700">{c.cedula}</td>
                  <td className="px-4 py-3 text-gray-700">${Number(c.valor).toLocaleString('es-CO')}</td>
                  <td className="px-4 py-3 text-gray-700">{c.tasa_interes}%</td>
                  <td className="px-4 py-3 text-gray-700">{c.plazo_meses} meses</td>
                  <td className="px-4 py-3 text-gray-700">{c.comercial}</td>
                  <td className="px-4 py-3 text-gray-500">{c.fecha_registro}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}