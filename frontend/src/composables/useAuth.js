import { ref, computed } from 'vue'

const token = ref(localStorage.getItem('token'))
const username = ref(localStorage.getItem('username'))
const role = ref(localStorage.getItem('role'))

export function useAuth() {
  const isLoggedIn = computed(() => !!token.value)

  function login(data) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    localStorage.setItem('role', data.role)
    token.value = data.token
    username.value = data.username
    role.value = data.role
  }

  function logout() {
    localStorage.clear()
    token.value = null
    username.value = null
    role.value = null
  }

  return {
    token,
    username,
    role,
    isLoggedIn,
    login,
    logout
  }
}
