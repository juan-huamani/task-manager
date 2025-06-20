# 🧩 Task Manager – Fullstack App (Django + Next.js)

Este proyecto consiste en un sistema de gestión de tareas que incluye:
- Backend en **Django + Django REST Framework + Simple JWT**
- Frontend en **Next.js (React)** con consumo vía `fetch`

## 👤 Usuario de prueba
- **Usuario:** admin  
- **Contraseña:** admin123  

---


## ⚙️ Cómo correr el Backend (Django)

### 📌 Requisitos
- Python 3.10+
- pip
- virtualenv

### 🚀 Pasos

```bash
# Clona el repositorio y entra a la carpeta del backend
cd task-manager/backend

# Crea entorno virtual y actívalo
python -m venv venv
source venv/Scripts/activate  # o source venv/bin/activate en Linux/Mac

# Instala las dependencias
pip install -r requirements.txt

# Aplica migraciones
python manage.py migrate

# Crea el usuario admin (si aún no existe)
python manage.py createsuperuser

# Inicia el servidor
python manage.py runserver

```

## 💻 Cómo correr el Frontend (Next.js)

### 📌 Requisitos
- Node.js 16+
- npm

### 🚀 Pasos

```bash
# Ve a la carpeta del frontend
cd task-manager/frontend

# Instala las dependencias
npm install

# Inicia el frontend en modo desarrollo
npm run dev

```


