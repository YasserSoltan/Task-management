const db = require('../db');

exports.getTasks = (req, res) => {
  const userId = req.userId;
  const tasks = db.prepare('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC')
                  .all(userId);
  res.json(tasks);
};

exports.createTask = (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  if (!title) return res.status(400).json({ message: 'Title is required' });

  const stmt = db.prepare('INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)');
  const info = stmt.run(title, description || null, userId);
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(info.lastInsertRowid);

  res.status(201).json(task);
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const userId = req.userId;

  const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?').get(id, userId);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  db.prepare('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?')
    .run(title || task.title, description || task.description, status || task.status, id);

  const updatedTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  res.json(updatedTask);
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?').get(id, userId);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  res.json({ message: 'Task deleted successfully' });
};
