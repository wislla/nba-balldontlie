<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import type { Player } from '@/interfaces/Player'
import { normalizeEditablePlayer } from '@/utils/playerNormalizer'

const { isOpen, isSaving, player } = defineProps<{
  isOpen: boolean
  player: Player | null
  isSaving: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: Player): void
}>()

const editForm = ref<Player>(normalizeEditablePlayer())

watchEffect(() => {
  if (player) {
    editForm.value = normalizeEditablePlayer(player)
  }
})

function submit() {
  emit('save', normalizeEditablePlayer(editForm.value))
}
</script>

<template>
  <BaseModal :is-open="isOpen">
    <template #header>
      <h2 class="text-lg font-semibold text-gray-800">Editar Jogador</h2>
    </template>

    <template #body>
      <form class="space-y-4" @submit.prevent="submit" autocomplete="off">
        <BaseInput
          id="edit-player-first-name"
          label="Nome"
          :modelValue="editForm.first_name"
          @update:modelValue="editForm.first_name = $event as string"
          autocomplete="given-name"
          required
        />
        <BaseInput
          id="edit-player-last-name"
          label="Sobrenome"
          :modelValue="editForm.last_name"
          @update:modelValue="editForm.last_name = $event as string"
          autocomplete="family-name"
          required
        />
        <BaseInput
          id="edit-player-country"
          label="País"
          :modelValue="editForm.country"
          @update:modelValue="editForm.country = $event as string"
          autocomplete="country-name"
          required
        />
        <BaseInput
          id="edit-player-team-name"
          label="Nome do Time"
          :modelValue="editForm.team.full_name"
          @update:modelValue="editForm.team.full_name = $event as string"
          autocomplete="organization"
          required
        />
        <BaseInput
          id="edit-player-team-city"
          label="Cidade do Time"
          :modelValue="editForm.team.city"
          @update:modelValue="editForm.team.city = $event as string"
          autocomplete="address-level2"
          required
        />
      </form>
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
        variant="primary"
        size="sm"
        :disabled="isSaving"
        @click="submit"
        :loading="isSaving"
      >
        Salvar
      </BaseButton>
    </template>
  </BaseModal>
</template>
