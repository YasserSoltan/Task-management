import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Input from "./Input";
import toast from "react-hot-toast";

const TaskInput = ({ onAdd }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAdd({
        title: taskTitle,
        description: description || null,
      });
      setTaskTitle("");
      setDescription("");
      setShowDetails(false);
    }else{
      toast.error("Task title is required");
    }
  };

  const handleCancel = () => {
    setShowDetails(false);
    setDescription("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="space-y-4">
        {/* Title Input */}
        <div className="flex gap-2">
          <Input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 focus:ring-green-500"
          />
          {!showDetails && (
            <button
              onClick={() => setShowDetails(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Details
            </button>
          )}
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-green-600! text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add
          </button>
        </div>

        {showDetails && (
          <div className="space-y-3 pt-2 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">Task Details</h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (optional)
              </label>
              <Input
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details about the task..."
                rows="3"
                className="w-full px-4 py-2 focus:ring-green-500 resize-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskInput;