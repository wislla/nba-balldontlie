<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="props.isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
          <header class="p-4 border-b border-gray-200">
            <slot name="header" />
          </header>
          <section class="p-4">
            <slot name="body" />
          </section>
          <footer class="p-4 border-t border-gray-200 flex justify-end gap-2">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped></style>
