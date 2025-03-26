<template>
  <div class="space-y-4 p-4">
    <h2 class="text-xl font-bold">我的預約</h2>
    <ul>
      <li v-for="appt in appointments" :key="appt.id">
        🩺 {{ appt.doctor_name }} - {{ formatTime(appt.appointment_time) }}

        <template v-if="appt.ended_at">
          <span class="ml-2 text-gray-500">已完成</span>
        </template>

        <template v-else>
          <button @click="cancel(appt.id)" class="text-red-600 border px-2">取消</button>
          <button
            v-if="isToday(appt.appointment_time)"
            @click="openVideoCall(appt.doctor_name)"
            class="ml-2 text-blue-600 border px-2"
          >進入視訊看診</button>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { useAuth } from '../composables/useAuth'

const { token, username } = useAuth()
const appointments = ref([])

function formatTime(t) {
  return dayjs(t).format('YYYY-MM-DD HH:mm')
}

function isToday(time) {
  return dayjs(time).isSame(dayjs(), 'day')
}

async function getAppointments() {
  const res = await axios.get('http://localhost:3000/appointments/my', {
    headers: { Authorization: `Bearer ${token.value}` }
  })
  appointments.value = res.data
}

async function cancel(id) {
  await axios.post('http://localhost:3000/appointments/cancel', { id }, {
    headers: { Authorization: `Bearer ${token.value}` }
  })
  getAppointments()
}

function openVideoCall(doctor) {
  const room = `telemed_${doctor}_${username.value}`
  const popup = window.open(`https://meet.jit.si/${room}`, '_blank')

  const timer = setInterval(() => {
    if (popup.closed) {
      clearInterval(timer)
      axios.post('http://localhost:3000/appointments/end', {
        doctor,
        patient: username.value
      }, {
        headers: { Authorization: `Bearer ${token.value}` }
      })
    }
  }, 1000)
}

onMounted(getAppointments)
</script>
