<script setup lang="ts">
import { Loader } from 'lucide-vue-next'

const { disabled, loading, size, type, variant } = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const variants: Record<string, string> = {
  primary: 'bg-blue-950 text-white hover:bg-blue-900',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-white/10 text-white border border-white hover:bg-white/20',
}

const sizes: Record<string, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
}
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled || loading"
    @click="emit('click', $event)"
    class="rounded transition duration-150 ease-in-out font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    :class="[variants[variant || 'primary'], sizes[size || 'md']]"
    v-bind="$attrs"
  >
    <Loader v-if="loading" class="w-4 h-4 animate-spin" />
    <slot v-else />
  </button>
</template>
