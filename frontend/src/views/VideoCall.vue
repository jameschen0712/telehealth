<template>
  <iframe
    :src="`https://meet.jit.si/${room}`"
    allow="camera; microphone; fullscreen; display-capture"
    style="width: 100%; height: 90vh; border: none"
  />
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const room = route.query.room || 'telemed'
</script>
