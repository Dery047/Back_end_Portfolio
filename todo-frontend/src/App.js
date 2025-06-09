import React, { useState, useEffect } from 'react';

function App() {
  // Autenticación
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Estados de tareas
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');

  const API_URL = 'http://localhost:8000/api/tareas/';
  const LOGIN_URL = 'http://localhost:8000/api/token/';

  // Función de login
  const login = () => {
    fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.access) {
          setToken(data.access);
        } else {
          alert('Login fallido');
        }
      })
      .catch(err => console.error('Error en login:', err));
  };

  // Cargar tareas al cambiar token
  useEffect(() => {
    if (!token) return;
    fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setTareas(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error al cargar tareas:', err));
  }, [token]);

  // Agregar tarea
  const agregarTarea = () => {
    if (!titulo.trim()) return;

    const nueva = {
      titulo,
      descripcion,
      fecha_limite: fechaLimite || null,
      completada: false,
    };

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nueva),
    })
      .then(res => res.json())
      .then(tarea => {
        setTareas([...tareas, tarea]);
        setTitulo('');
        setDescripcion('');
        setFechaLimite('');
      })
      .catch(err => console.error('Error al agregar tarea:', err));
  };

  // Toggle completada
  const toggleCompletada = (id, completada) => {
    fetch(`${API_URL}${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completada: !completada }),
    })
      .then(res => res.json())
      .then(tareaActualizada => {
        setTareas(tareas.map(t => (t.id === id ? tareaActualizada : t)));
      })
      .catch(err => console.error('Error al actualizar tarea:', err));
  };

  // Eliminar tarea
  const eliminarTarea = id => {
    fetch(`${API_URL}${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setTareas(tareas.filter(t => t.id !== id));
      })
      .catch(err => console.error('Error al eliminar tarea:', err));
  };

  const estilos = {
    contenedor: {
      maxWidth: 600,
      margin: '40px auto',
      padding: 20,
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f4f4f4',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    input: {
      padding: '10px',
      marginBottom: 10,
      width: '100%',
      borderRadius: 4,
      border: '1px solid #ccc',
      fontSize: 16,
    },
    boton: {
      padding: '10px 20px',
      borderRadius: 4,
      border: 'none',
      backgroundColor: '#4CAF50',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: 16,
      marginBottom: 10,
    },
    lista: {
      listStyle: 'none',
      padding: 0,
    },
    tarea: completada => ({
      backgroundColor: completada ? '#d4edda' : '#fff',
      textDecoration: completada ? 'line-through' : 'none',
      border: '1px solid #ccc',
      padding: 12,
      marginBottom: 10,
      borderRadius: 4,
    }),
    eliminar: {
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      marginLeft: 10,
      borderRadius: 4,
      cursor: 'pointer',
    },
  };

  // Renderizado condicionado por autenticación
  if (!token) {
    return (
      <div style={estilos.contenedor}>
        <h1>🔒 Login</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={estilos.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={estilos.input}
        />
        <button onClick={login} style={estilos.boton}>
          Iniciar Sesión
        </button>
      </div>
    );
  }

  // UI de tareas tras login
  return (
    <div style={estilos.contenedor}>
      <h1>📝 Mi ToDo List</h1>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        style={estilos.input}
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        style={estilos.input}
      />
      <input
        type="date"
        value={fechaLimite}
        onChange={e => setFechaLimite(e.target.value)}
        style={estilos.input}
      />
      <button onClick={agregarTarea} style={estilos.boton}>
        Agregar Tarea
      </button>

      <ul style={estilos.lista}>
        {tareas.length > 0 ? (
          tareas.map(t => (
            <li
              key={t.id}
              style={estilos.tarea(t.completada)}
              onClick={() => toggleCompletada(t.id, t.completada)}
            >
              <strong>{t.titulo}</strong>
              {t.descripcion && <p>{t.descripcion}</p>}
              {t.fecha_limite && <p>📅 Vence: {t.fecha_limite}</p>}
              <button
                onClick={e => {
                  e.stopPropagation();
                  eliminarTarea(t.id);
                }}
                style={estilos.eliminar}
              >
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <p>No hay tareas para mostrar.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
