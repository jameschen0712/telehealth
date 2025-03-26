import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Doctors from '../views/Doctors.vue'
import MyAppointments from '../views/MyAppointments.vue'
import DoctorDashboard from '../views/DoctorDashboard.vue'
import VideoCall from '../views/VideoCall.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/doctors', component: Doctors },
  { path: '/my-appointments', component: MyAppointments },
  { path: '/doctor-dashboard', component: DoctorDashboard },
  { path: '/video-call', component: VideoCall }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
