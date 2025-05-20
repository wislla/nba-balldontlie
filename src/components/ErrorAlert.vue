<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div
    v-if="message"
    class="mb-2 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded text-sm font-medium"
  >
    Erro: {{ message }}
  </div>
</template>
