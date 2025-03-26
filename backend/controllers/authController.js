import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

export async function register(req, res) {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const display_name = role === 'doctor' ? `Dr. ${username}` : username;

  try {
    await pool.query(
      'INSERT INTO users (username, password, role, display_name) VALUES ($1, $2, $3, $4)',
      [username, hashed, role, display_name]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: '註冊失敗' });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: '登入失敗' });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, username: user.username, role: user.role });
}
