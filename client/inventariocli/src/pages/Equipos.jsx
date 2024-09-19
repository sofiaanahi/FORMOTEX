import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';

const EquiposPage = () => {
  const { user } = useContext(AuthContext);
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {

        const response = await fetch('http://localhost:5000/api/equipos', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEquipos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipos();
  }, [user]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar los equipos: {error}</p>;
  }

  return (
    <div>
      <h1>Equipos</h1>
      <ul>
        {equipos.map((equipo) => (
          <li key={equipo.id}>
            {equipo.nombre} - {equipo.estado}
            {user && user.role === 'admin' && (
              <>
                <button onClick={() => {/* Editar equipo */}}>Editar</button>
                <button onClick={() => {/* Eliminar equipo */}}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {user && user.role === 'admin' && (
        <button onClick={() => {/* Agregar nuevo equipo */}}>Agregar equipo</button>
      )}
    </div>
  );
};

export default EquiposPage;
