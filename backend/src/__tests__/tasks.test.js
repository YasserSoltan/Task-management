const request = require('supertest');
const app = require('../app');
const db = require('../db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

describe('Tasks API', () => {
  let authToken;
  let userId;

  beforeEach(async () => {
    // Clear tables
    db.prepare('DELETE FROM tasks').run();
    db.prepare('DELETE FROM users').run();

    // Create a test user
    const hashedPassword = require('bcryptjs').hashSync('password123', 10);
    const result = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
      .run('Test User', 'test@example.com', hashedPassword);
    userId = result.lastInsertRowid;

    // Generate token
    authToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });
  });

  afterAll(() => {
    db.close();
  });

  describe('GET /api/tasks', () => {
    it('should get all tasks for authenticated user', async () => {
      // Create a task
      db.prepare('INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)')
        .run('Test Task', 'Test Description', userId);

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe('Test Task');
    });

    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/tasks');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'New Task',
          description: 'Task description'
        });

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('New Task');
      expect(response.body.description).toBe('Task description');
      expect(response.body.status).toBe('pending');
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          description: 'Task description'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Title is required');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update a task', async () => {
      // Create a task
      const taskResult = db.prepare('INSERT INTO tasks (title, user_id) VALUES (?, ?)')
        .run('Original Task', userId);
      const taskId = taskResult.lastInsertRowid;

      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Updated Task',
          status: 'done'
        });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Task');
      expect(response.body.status).toBe('done');
    });

    it('should return 404 if task not found', async () => {
      const response = await request(app)
        .put('/api/tasks/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Updated Task'
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Task not found');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      // Create a task
      const taskResult = db.prepare('INSERT INTO tasks (title, user_id) VALUES (?, ?)')
        .run('Task to Delete', userId);
      const taskId = taskResult.lastInsertRowid;

      const response = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Task deleted successfully');
    });

    it('should return 404 if task not found', async () => {
      const response = await request(app)
        .delete('/api/tasks/99999')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Task not found');
    });
  });
});

