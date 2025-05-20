<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import { ArrowDownAZ, ArrowUpZA } from 'lucide-vue-next'

const modelValue = defineModel<'asc' | 'desc'>()

function toggleOrder() {
  modelValue.value = modelValue.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <BaseButton
    variant="primary"
    size="md"
    class="whitespace-nowrap flex items-center gap-2"
    @click="toggleOrder"
  >
    <span>
      <ArrowDownAZ v-if="modelValue === 'asc'" class="w-4 h-5" />
      <ArrowUpZA v-else class="w-4 h-5" />
    </span>
    <span class="hidden md:inline"> Ordenar </span>
  </BaseButton>
</template>
