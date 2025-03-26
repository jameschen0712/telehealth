<template>
  <div class="space-y-4 p-4">
    <h2 class="text-xl font-bold">註冊</h2>
    <input v-model="username" placeholder="帳號" class="border p-1" />
    <input v-model="password" type="password" placeholder="密碼" class="border p-1" />
    <input v-model="confirmPassword" type="password" placeholder="確認密碼" class="border p-1" />
    <select v-model="role" class="border p-1">
      <option value="patient">病患</option>
      <option value="doctor">醫師</option>
    </select>
    <button @click="doRegister" class="bg-green-600 text-white px-3 py-1 rounded">註冊</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('patient')
const router = useRouter()
const { login } = useAuth()

async function doRegister() {
  if (password.value !== confirmPassword.value) {
    alert('密碼不一致')
    return
  }

  try {
    await axios.post('http://localhost:3000/auth/register', {
      username: username.value,
      password: password.value,
      role: role.value
    })

    const res = await axios.post('http://localhost:3000/auth/login', {
      username: username.value,
      password: password.value
    })

    login(res.data)
    router.push(res.data.role === 'doctor' ? '/doctor-dashboard' : '/doctors')
  } catch (err) {
    alert('註冊失敗')
  }
}
</script>
