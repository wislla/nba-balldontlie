<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'
import type { Player } from '@/interfaces/Player'

const { isOpen, item, isSaving } = defineProps<{
  isOpen: boolean
  item: Player | null
  isSaving: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>
<template>
  <BaseModal :is-open="isOpen">
    <template #header>
      <h2 class="text-lg font-semibold text-gray-800">Confirmar Exclusão</h2>
    </template>

    <template #body>
      <p class="text-gray-700">
        Tem certeza que deseja excluir
        <span class="font-semibold">{{ item?.first_name }}</span
        >?
      </p>
    </template>

    <template #footer>
      <BaseButton
        variant="secondary"
        size="sm"
        :disabled="isSaving"
        @click="emit('close')"
      >
        Cancelar
      </BaseButton>

      <BaseButton
        variant="danger"
        size="sm"
        :disabled="isSaving"
        @click="emit('confirm')"
        :loading="isSaving"
      >
        Excluir
      </BaseButton>
    </template>
  </BaseModal>
</template>
