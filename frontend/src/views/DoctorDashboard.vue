<template>
  <div class="space-y-4 p-4">
    <h2 class="text-xl font-bold">今日病患</h2>
    <ul>
      <li v-for="appt in appointments" :key="appt.id">
        👤 {{ appt.username }} - {{ formatTime(appt.appointment_time) }}

        <template v-if="appt.ended_at">
          <span class="ml-2 text-gray-500">已完成</span>
        </template>

        <template v-else>
          <button
            @click="openVideoCall(appt.username)"
            class="ml-2 bg-blue-500 text-white px-2 rounded"
          >視訊看診</button>
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

function openVideoCall(patient) {
  const room = `telemed_${username.value}_${patient}`
  const popup = window.open(`https://meet.jit.si/${room}`, '_blank')

  const timer = setInterval(() => {
    if (popup.closed) {
      clearInterval(timer)
      axios.post('http://localhost:3000/appointments/end', {
        doctor: username.value,
        patient
      }, {
        headers: { Authorization: `Bearer ${token.value}` }
      })
    }
  }, 1000)
}

async function getTodayAppointments() {
  const res = await axios.get('http://localhost:3000/appointments/today', {
    headers: { Authorization: `Bearer ${token.value}` }
  })
  appointments.value = res.data
}

onMounted(getTodayAppointments)
</script>
