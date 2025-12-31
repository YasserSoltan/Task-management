import React from "react";
import { Check, X } from "lucide-react";
import Input from "./Input";

const TaskItemEdit = ({ title, description, onTitleChange, onDescriptionChange, onSave, onCancel }) => {
  return (
    <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
      <div className="flex gap-2 items-start">
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <Input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Task title"
            className="w-full"
            autoFocus
          />
          <Input
            type="textarea"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Description (optional)"
            rows="3"
            className="w-full resize-none"
          />
        </div>
        <div className="flex flex-col gap-1 flex-shrink-0">
          <button
            onClick={onSave}
            className="p-2 text-green-600 hover:bg-green-100 rounded"
            title="Save"
          >
            <Check size={18} />
          </button>
          <button
            onClick={onCancel}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded"
            title="Cancel"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItemEdit;

