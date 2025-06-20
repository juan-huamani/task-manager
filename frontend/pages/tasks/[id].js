import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';

export default function TaskDetail() {
  const { id } = useRouter().query;
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8000/api/tasks/${id}/`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then(setTask);
  }, [id]);

  return task ? (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{task.title}</h2>
        <p style={styles.description}>{task.description}</p>
      </div>
    </div>
  ) : (
    <p style={styles.loading}>Cargando...</p>
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
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '400px',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#111827',
  },
  description: {
    fontSize: '1rem',
    color: '#374151',
  },
  loading: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '1.2rem',
  },
};
