import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import TaskList from "../components/TaskList";
import TaskInput from "../components/TaskInput";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);


  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/tasks");
      setTasks(Array.isArray(data) ? data : data.tasks || []);
      console.log(data)
    } catch (err) {
      console.error("Failed to fetch tasks:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        handleLogout();
      } else {
        toast.error("Failed to fetch tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const title = typeof taskData === 'string' ? taskData : taskData.title;
      const description = typeof taskData === 'object' ? taskData.description : null;
      
      const { data } = await api.post("/tasks", {
        title,
        description: description || null,
      });

      setTasks((prev) => [...prev, data.task || data]);
      toast.success("Task added successfully!");
    } catch (err) {
      console.error("Failed to add task:", err.response?.data || err.message);
      toast.error("Failed to add task");
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const { data } = await api.put(`/tasks/${taskId}`, updates);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? (data.task || data) : t)));
      toast.success("Task updated successfully!");
    } catch (err) {
      console.error("Failed to update task:", err.response?.data || err.message);
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (err) {
      console.error("Failed to delete task:", err.response?.data || err.message);
      toast.error("Failed to delete task");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-6">
          <TaskInput onAdd={handleAddTask} />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <TaskList
            title="Pending"
            tasks={tasks.filter((t) => t.status === "pending")}
            statusColor="bg-yellow-500"
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
          <TaskList
            title="In Progress"
            tasks={tasks.filter((t) => t.status === "in_progress")}
            statusColor="bg-blue-500"
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
          <TaskList
            title="Done"
            tasks={tasks.filter((t) => t.status === "done")}
            statusColor="bg-green-500"
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
