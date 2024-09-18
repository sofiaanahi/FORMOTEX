
// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor de contexto que envuelve la aplicación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para iniciar sesión (simulación)
  const login = (userData) => {
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
