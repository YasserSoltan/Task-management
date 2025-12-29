import TaskItem from "./TaskItem";

const TaskList = ({ title, tasks, statusColor, onUpdate, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className={`w-3 h-3 ${statusColor} rounded-full`}></span>
        {title} ({tasks.length})
      </h2>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No {title.toLowerCase()} tasks
          </p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;