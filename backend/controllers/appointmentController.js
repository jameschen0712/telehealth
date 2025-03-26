import pool from '../db.js';

export async function bookAppointment(req, res) {
  const { doctor_name, appointment_time } = req.body;
  const user_id = req.user.id;

  await pool.query(
    'INSERT INTO appointments (user_id, doctor_name, appointment_time) VALUES ($1, $2, $3)',
    [user_id, doctor_name, appointment_time]
  );
  res.sendStatus(201);
}

export async function getMyAppointments(req, res) {
  const user_id = req.user.id;
  const result = await pool.query(
    'SELECT * FROM appointments WHERE user_id = $1 ORDER BY appointment_time ASC',
    [user_id]
  );
  res.json(result.rows);
}

export async function cancelAppointment(req, res) {
  const { id } = req.body;
  await pool.query('DELETE FROM appointments WHERE id = $1', [id]);
  res.sendStatus(200);
}

export async function endAppointment(req, res) {
  const { doctor, patient } = req.body;

  const user = await pool.query('SELECT id FROM users WHERE username = $1', [patient]);
  const user_id = user.rows[0]?.id;

  if (!user_id) return res.sendStatus(404);

  await pool.query(
    `UPDATE appointments
     SET ended_at = NOW()
     WHERE doctor_name = $1 AND user_id = $2 AND ended_at IS NULL`,
    [doctor, user_id]
  );
  res.sendStatus(200);
}

export async function getTodayAppointments(req, res) {
  const doctor = req.user.username;
  const today = new Date().toISOString().slice(0, 10);
  const result = await pool.query(
    `SELECT a.id, u.username, a.appointment_time, a.ended_at
     FROM appointments a
     JOIN users u ON a.user_id = u.id
     WHERE a.doctor_name = $1 AND DATE(a.appointment_time) = $2
     ORDER BY a.appointment_time ASC`,
    [doctor, today]
  );
  res.json(result.rows);
}

export async function getDoctors(req, res) {
  const result = await pool.query(
    "SELECT username, display_name FROM users WHERE role = 'doctor'"
  );
  res.json(result.rows);
}
