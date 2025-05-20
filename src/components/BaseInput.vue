<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: string
  label: string
  modelValue: string | number
  type?: string
  autocomplete?: string
  required?: boolean
  disabled?: boolean
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const ariaInvalid = computed(() => !!props.error)
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type || 'text'"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
      :value="modelValue"
      :autocomplete="autocomplete"
      :required="required"
      :disabled="disabled"
      :aria-required="required ? 'true' : undefined"
      :aria-invalid="ariaInvalid ? 'true' : undefined"
      @input="
        (event) =>
          emit('update:modelValue', (event.target as HTMLInputElement).value)
      "
    />
    <p v-if="error" class="text-red-600 mt-1" aria-live="polite">{{ error }}</p>
  </div>
</template>
