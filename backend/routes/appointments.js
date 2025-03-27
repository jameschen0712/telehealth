import express from 'express';
import {
  bookAppointment, getMyAppointments, cancelAppointment,
  endAppointment, getTodayAppointments, getDoctors
} from '../controllers/appointmentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/book', authenticate, bookAppointment);
router.get('/my', authenticate, getMyAppointments);
router.post('/cancel', authenticate, cancelAppointment);
router.post('/end', authenticate, endAppointment);
router.get('/today', authenticate, getTodayAppointments);
router.get('/doctors', getDoctors);

export default router;
