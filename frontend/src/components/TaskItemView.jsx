import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import getStatusButtons from "../utils/getStatusButtons";

const TaskItemView = ({ task, onEdit, onDelete, onStatusChange }) => {
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
              onClick={() => onStatusChange(btn.status)}
              className={`p-2 ${btn.color} rounded`}
              title={btn.label}
            >
              <btn.icon size={16} />
            </button>
          ))}

          {/* Edit Button */}
          <button
            onClick={onEdit}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItemView;

