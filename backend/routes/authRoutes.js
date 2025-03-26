import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await pool.query(
      'INSERT INTO users (username, password, role, display_name) VALUES ($1, $2, $3, $4)',
      [username, hashed, role, role === 'doctor' ? `Dr. ${username}` : username]
    );
    res.json({ message: '註冊成功' });
  } catch (err) {
    res.status(500).json({ error: '註冊失敗' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: '無效帳號' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: '密碼錯誤' });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'secret');
  res.json({ token, username: user.username, role: user.role });
});

export default router;
