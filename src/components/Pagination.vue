<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()

const canGoPrev = computed(() => props.currentPage > 1)
const canGoNext = computed(() => props.currentPage < props.totalPages)

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:page', page)
  }
}
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="flex justify-between items-center py-4 px-4 text-sm text-white bg-gray-700 rounded-b"
  >
    <span> Página {{ currentPage }} de {{ totalPages }} </span>
    <div class="space-x-2">
      <BaseButton
        @click="goToPage(currentPage - 1)"
        :disabled="!canGoPrev"
        variant="ghost"
        size="sm"
      >
        <ChevronLeft class="w-4 h-4" />
      </BaseButton>

      <BaseButton
        @click="goToPage(currentPage + 1)"
        :disabled="!canGoNext"
        variant="ghost"
        size="sm"
      >
        <ChevronRight class="w-4 h-4" />
      </BaseButton>
    </div>
  </div>
</template>
