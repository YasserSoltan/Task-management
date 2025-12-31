import React, { useState } from "react";
import TaskItemView from "./TaskItemView";
import TaskItemEdit from "./TaskItemEdit";
import toast from "react-hot-toast";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title || "");
  const [editDescription, setEditDescription] = useState(task.description || "");

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, { 
        title: editTitle,
        description: editDescription.trim() || null
      });
      setIsEditing(false);
    } else {
      toast.error("Task title is required");
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

  const handleEdit = () => {
    setEditTitle(task.title || "");
    setEditDescription(task.description || "");
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <TaskItemEdit
        title={editTitle}
        description={editDescription}
        onTitleChange={setEditTitle}
        onDescriptionChange={setEditDescription}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <TaskItemView
      task={task}
      onEdit={handleEdit}
      onDelete={onDelete}
      onStatusChange={handleStatusChange}
    />
  );
};

export default TaskItem;