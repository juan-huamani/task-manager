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
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  ) : (
    <p>Cargando...</p>
  );
}
