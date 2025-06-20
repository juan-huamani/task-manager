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
    <div>
      <h2>Tareas</h2>
      <button onClick={() => router.push('/tasks/create')}>+ Nueva Tarea</button>
      <button onClick={logout}>Logout</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description}
            <button onClick={() => router.push(`/tasks/${task.id}`)}>Ver</button>
            <button onClick={() => router.push(`/tasks/edit/${task.id}`)}>Editar</button>
            <button onClick={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
        <span>Página {page}</span>
        <button onClick={() => setPage(page + 1)}>Siguiente</button>
      </div>
    </div>
  );
}
