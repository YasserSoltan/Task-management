import api from '../api/axios';

export const taskService = {
  // Get all tasks for the authenticated user
  getTasks: async () => {
    const { data } = await api.get('/tasks');
    return Array.isArray(data) ? data : data.tasks || [];
  },

  // Create a new task
  createTask: async (taskData) => {
    const { data } = await api.post('/tasks', {
      title: taskData.title,
      description: taskData.description || null,
    });
    return data;
  },

  // Update a task
  updateTask: async (taskId, updates) => {
    const { data } = await api.put(`/tasks/${taskId}`, updates);
    return data;
  },

  // Delete a task
  deleteTask: async (taskId) => {
    await api.delete(`/tasks/${taskId}`);
  },
};

