<template>
  <div class="space-y-4 p-4">
    <h2 class="text-xl font-bold">登入</h2>
    <input v-model="username" placeholder="帳號" class="border p-1" />
    <input v-model="password" type="password" placeholder="密碼" class="border p-1" />
    <button @click="doLogin" class="bg-blue-600 text-white px-3 py-1 rounded">登入</button>
    <p>沒有帳號？<a @click="goRegister" href="#" class="text-blue-700">點我註冊</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const username = ref('')
const password = ref('')
const router = useRouter()
const { login } = useAuth()

async function doLogin() {
  try {
    const res = await axios.post('http://localhost:3000/auth/login', {
      username: username.value,
      password: password.value
    })
    login(res.data)
    router.push(res.data.role === 'doctor' ? '/doctor-dashboard' : '/doctors')
  } catch (err) {
    alert('登入失敗')
  }
}

function goRegister() {
  router.push('/register')
}
</script>
