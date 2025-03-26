<template>
  <div class="space-y-4 p-4">
    <h2 class="text-xl font-bold">可預約醫師</h2>
    <ul>
      <li v-for="doc in doctors" :key="doc.username">
        {{ doc.display_name }}
        <input type="datetime-local" v-model="times[doc.username]" class="ml-2 border p-1" />
        <button @click="book(doc.username)" class="ml-2 bg-blue-500 text-white px-2 rounded">預約</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuth } from '../composables/useAuth'

const doctors = ref([])
const times = ref({})
const { token } = useAuth()

async function getDoctors() {
  const res = await axios.get('http://localhost:3000/appointments/doctors')
  doctors.value = res.data
}

async function book(username) {
  const t = times.value[username]
  if (!t) return alert('請輸入時間')

  await axios.post('http://localhost:3000/appointments/book', {
    doctor_name: username,
    appointment_time: t
  }, {
    headers: { Authorization: `Bearer ${token.value}` }
  })
  alert('預約成功')
}

onMounted(getDoctors)
</script>
