import { useEffect, useState } from 'react';
import { getToken, removeToken } from '../../utils/auth';
import { useRouter } from 'next/router';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const fetchTasks = async () => {
    const token = getToken();
    const res = await fetch(`http://localhost:8000/api/tasks/?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTasks(data.results || []);
  };

  const deleteTask = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;
  
    const res = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  
    if (res.status === 204) {
      alert('Tarea eliminada');
      fetchTasks();
    } else {
      alert('Error al eliminar la tarea');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const logout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Lista de Tareas</h2>
        <div style={styles.actions}>
          <button onClick={() => router.push('/tasks/create')} style={styles.primaryButton}>
            + Nueva Tarea
          </button>
          <button onClick={logout} style={styles.logoutButton}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={styles.list}>
        {tasks.map((task) => (
          <div key={task.id} style={styles.card}>
            <h3 style={styles.taskTitle}>{task.title}</h3>
            <p style={styles.taskDescription}>{task.description}</p>
            <div style={styles.cardActions}>
              <button onClick={() => router.push(`/tasks/${task.id}`)} style={styles.viewButton}>
                Ver
              </button>
              <button onClick={() => router.push(`/tasks/edit/${task.id}`)} style={styles.editButton}>
                Editar
              </button>
              <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.pagination}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1} style={styles.pageButton}>
          ◀ Anterior
        </button>
        <span style={{ margin: '0 1rem' }}>Página {page}</span>
        <button onClick={() => setPage(page + 1)} style={styles.pageButton}>
          Siguiente ▶
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.8rem',
    color: '#fff',
  },
  taskTitle: {
    color: '#000',
    fontSize: '1.2rem',
    marginBottom: '0.3rem',
  },
  taskDescription: {
    color: '#000',
    fontSize: '1rem',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  logoutButton: {
    backgroundColor: '#6b7280',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  card: {
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f9fafb',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
  },
  cardActions: {
    marginTop: '1rem',
    display: 'flex',
    gap: '0.5rem',
  },
  viewButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '0.3rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editButton: {
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    padding: '0.3rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '0.3rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  pagination: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageButton: {
    backgroundColor: '#e5e7eb',
    color: '#4b5563',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};