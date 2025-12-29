import React, { useState } from "react";
import { Check, Edit2, Trash2, X, Clock, CheckCircle2 } from "lucide-react";
import getStatusButtons from "../utils/getStatusButtons";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title || "");
  const [editDescription, setEditDescription] = useState(task.description || "");

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, { 
        title: editTitle,
        description: editDescription || null
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title || "");
    setEditDescription(task.description || "");
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus) => {
    onUpdate(task.id, { status: newStatus });
  };

  if (isEditing) {
    return (
      <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
        <div className="flex gap-2 items-start">
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSaveEdit()}
              className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Task title"
              autoFocus
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && e.ctrlKey && handleSaveEdit()}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Description (optional)"
              rows="3"
            />
          </div>
          <div className="flex flex-col gap-1 flex-shrink-0">
            <button
              onClick={handleSaveEdit}
              className="p-2 text-green-600 hover:bg-green-100 rounded"
              title="Save"
            >
              <Check size={18} />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded"
              title="Cancel"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <span
            className={`block ${
              task.status === "done" ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {task.title}
          </span>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Status Change Buttons */}
        {getStatusButtons(task.status).map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleStatusChange(btn.status)}
            className={`p-2 ${btn.color} rounded`}
            title={btn.label}
          >
            <btn.icon size={16} />
          </button>
        ))}

        {/* Edit Button */}
        <button
          onClick={() => {
            setEditTitle(task.title || "");
            setEditDescription(task.description || "");
            setIsEditing(true);
          }}
          className="p-2 text-gray-600 hover:bg-gray-200 rounded"
          title="Edit"
        >
          <Edit2 size={16} />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-red-600 hover:bg-red-100 rounded"
        >
          <Trash2 size={16} />
        </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;