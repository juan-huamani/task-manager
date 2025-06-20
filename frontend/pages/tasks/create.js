import { useState } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '../../utils/auth';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/api/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ title, description }),
    });
    router.push('/tasks');
  };

  return (
    <div>
      <h2>Nueva Tarea</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
