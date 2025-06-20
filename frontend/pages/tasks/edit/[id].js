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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Editar Tarea</h2>

        <input
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="Título"
          style={styles.input}
          required
        />

        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="Descripción"
          style={styles.textarea}
          rows={4}
        />

        <button type="submit" style={styles.button}>Actualizar</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f3f4f6',
  },
  form: {
    padding: '2rem',
    borderRadius: '10px',
    background: '#ffffff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#1f2937',
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '5px',
    fontSize: '1rem',
    resize: 'vertical',
  },
  button: {
    padding: '0.5rem',
    backgroundColor: '#f59e0b',
    color: '#ffffff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
