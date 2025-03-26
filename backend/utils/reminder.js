import cron from 'node-cron';
import { pool } from '../db.js';
import dayjs from 'dayjs';

cron.schedule('0 8 * * *', async () => {
  const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');

  try {
    const res = await pool.query(
      `SELECT u.username, a.doctor_name, a.appointment_time 
       FROM appointments a 
       JOIN users u ON a.user_id = u.id 
       WHERE appointment_time::date = $1`,
      [tomorrow]
    );

    res.rows.forEach(row => {
      console.log(`🔔 提醒：${row.username} 明天與 ${row.doctor_name} 有預約！`);
    });
  } catch (err) {
    console.error('每日提醒錯誤', err);
  }
});
