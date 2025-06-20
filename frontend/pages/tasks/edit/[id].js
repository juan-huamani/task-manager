import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getToken } from '../../../utils/auth';

export default function EditTask() {
  const { id } = useRouter().query;
  const [task, setTask] = useState({ title: '', description: '' });
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8000/api/tasks/${id}/`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/api/tasks/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(task),
    });
    router.push('/tasks');
  };

  return (
    <div>
      <h2>Editar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <input value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
        <textarea value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}
