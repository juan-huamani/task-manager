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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Nueva Tarea</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          style={styles.input}
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          style={styles.textarea}
          rows={4}
        />

        <button type="submit" style={styles.button}>
          Crear
        </button>
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
    backgroundColor: '#10b981',
    color: '#ffffff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
