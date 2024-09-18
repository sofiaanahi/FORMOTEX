import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir
import { Link } from 'react-router-dom'; // Asegúrate de importar Link correctamente

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.msg);
        setError(null);
        navigate('/equipos'); // Redirige a la página de "Equipos" después del inicio de sesión
      } else {
        setError(result.msg || 'Error al iniciar sesión');
        setSuccess(null);
      }
    } catch (err) {
      setError('Error al iniciar sesión');
      setSuccess(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pale-pink">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center text-pastel-blue">Iniciar Sesión 🔑</h2>
        {success && <div className="mb-4 p-3 bg-green-200 text-green-800 rounded">{success}</div>}
        {error && <div className="mb-4 p-3 bg-red-200 text-red-800 rounded">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-pastel-blue text-white rounded hover:bg-blue-300 transition"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>¿No tienes una cuenta? <Link to="/register" className="text-pastel-blue underline">Regístrate</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
