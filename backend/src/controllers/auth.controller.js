const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'; // Use environment variable in production

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
      .run(name, email, hashedPassword);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Email already exists' });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};
