import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'PENDING'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks();
      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (err) {
      console.error('Fetch tasks error:', err);
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingTask) {
        const response = await updateTask(editingTask.id, formData);
        if (response.data.success) {
          alert('Task updated successfully!');
        }
      } else {
        const response = await createTask(formData);
        if (response.data.success) {
          alert('Task created successfully!');
        }
      }
      
      // Reset form
      setFormData({ title: '', description: '', status: 'PENDING' });
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('⚠️ Are you sure you want to delete this task?')) {
      try {
        const response = await deleteTask(id);
        if (response.data.success) {
          alert('Task deleted successfully!');
          fetchTasks();
        }
      } catch (err) {
        console.error('Delete error:', err);
        setError(err.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
    setFormData({ title: '', description: '', status: 'PENDING' });
    setError('');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Task Dashboard</h1>
          <p className="subtitle">Manage your tasks efficiently</p>
        </div>
        <div className="user-info">
          <div className="user-details">
            <span className="user-name">👤 {user.name}</span>
            <span className="user-role">
              {user.role === 'ADMIN' ? '🔑 Admin' : '👥 User'}
            </span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <button 
        onClick={() => setShowForm(!showForm)} 
        className="add-task-btn"
      >
        {showForm ? '❌ Cancel' : '➕ Add New Task'}
      </button>

      {error && <div className="error-msg">{error}</div>}

      {showForm && (
        <div className="task-form">
          <h3>{editingTask ? '✏️ Edit Task' : '➕ Create New Task'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Task Title *</label>
              <input
                type="text"
                name="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter task description (optional)"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingTask ? 'Update Task' : 'Create Task'}
              </button>
              <button type="button" onClick={cancelForm} className="cancel-btn">
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && <div className="loading">⏳ Loading tasks...</div>}

      <div className="tasks-grid">
        {!loading && tasks.length === 0 ? (
          <div className="no-tasks">
            <h3>No tasks found</h3>
            <p>Create your first task to get started!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`status-badge ${task.status.toLowerCase()}`}>
                  {task.status === 'PENDING' && ''}
                  {task.status === 'IN_PROGRESS' && ''}
                  {task.status === 'COMPLETED' && ''}
                  {' '}{task.status.replace('_', ' ')}
                </span>
              </div>
              
              <p className="task-description">
                {task.description || 'No description provided'}
              </p>
              
              <div className="task-actions">
                <button 
                  onClick={() => handleEdit(task)} 
                  className="edit-btn"
                >
                  Edit
                </button>
                
                {user.role === 'ADMIN' && (
                  <button 
                    onClick={() => handleDelete(task.id)} 
                    className="delete-btn"
                  >
                    🗑️ Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;