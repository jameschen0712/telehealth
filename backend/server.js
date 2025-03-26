import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointments.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/appointments', appointmentRoutes);

app.get('/', (req, res) => res.send('Telehealth backend running'));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
