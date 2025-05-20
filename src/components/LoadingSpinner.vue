<script setup lang="ts">
import { Loader } from 'lucide-vue-next'
</script>

<template>
  <div class="flex justify-center items-center gap-2 py-4 text-gray-500">
    <Loader class="w-4 h-4 animate-spin" />
    <span>Carregando...</span>
  </div>
</template>
