import React, { useState, useEffect } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');

  const API_URL = 'http://localhost:8000/api/tareas/';

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTareas(data))
      .catch(err => console.error('Error al cargar tareas:', err));
  }, []);

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
      headers: { 'Content-Type': 'application/json' },
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

  const toggleCompletada = (id, completada) => {
    fetch(`${API_URL}${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completada: !completada }),
    })
      .then(res => res.json())
      .then(tareaActualizada => {
        setTareas(tareas.map(t => (t.id === id ? tareaActualizada : t)));
      })
      .catch(err => console.error('Error al actualizar tarea:', err));
  };

  const eliminarTarea = id => {
    fetch(`${API_URL}${id}/`, {
      method: 'DELETE',
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
        {tareas.map(tarea => (
          <li
            key={tarea.id}
            style={estilos.tarea(tarea.completada)}
            onClick={() => toggleCompletada(tarea.id, tarea.completada)}
          >
            <strong>{tarea.titulo}</strong>
            {tarea.descripcion && <p>{tarea.descripcion}</p>}
            {tarea.fecha_limite && (
              <p>📅 Vence: {tarea.fecha_limite}</p>
            )}
            <button
              onClick={e => {
                e.stopPropagation();
                eliminarTarea(tarea.id);
              }}
              style={estilos.eliminar}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

