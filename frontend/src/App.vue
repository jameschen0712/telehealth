<template>
  <div>
    <div v-if="isLoggedIn" class="p-4 bg-gray-100 mb-4 flex justify-between">
      <div>
        <router-link to="/doctors" v-if="role === 'patient'" class="mr-4">預約醫師</router-link>
        <router-link to="/my-appointments" v-if="role === 'patient'" class="mr-4">我的預約</router-link>
        <router-link to="/doctor-dashboard" v-if="role === 'doctor'" class="mr-4">今日病患</router-link>
      </div>
      <a href="#" @click.prevent="logout">登出</a>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from './composables/useAuth'

const router = useRouter()
const { isLoggedIn, role, logout } = useAuth()

// 🔁 監聽 isLoggedIn 變化，自動跳轉
watch(isLoggedIn, (val) => {
  if (!val) {
    router.push('/login')
  }
})
</script>
