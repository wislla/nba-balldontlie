<script setup lang="ts">
import { computed } from 'vue'
import 'flowbite'
import { Pencil, Trash2 } from 'lucide-vue-next'

import { usePagination } from '@/composables/usePagination'
import BaseButton from './BaseButton.vue'
import type { TableHeader } from '@/interfaces/Table'
import type { Player } from '@/interfaces/Player'
import LoadingSpinner from './LoadingSpinner.vue'
import Pagination from './Pagination.vue'

const { headers, items, loading } = defineProps<{
  headers: TableHeader[]
  items: Player[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'onEdit', player: Player): void
  (e: 'onDelete', player: Player): void
}>()

const itemsRef = computed<Player[]>(() => items)

const { currentPage, totalPages, paginatedItems } = usePagination(itemsRef, 5)

function handleEdit(player: Player) {
  emit('onEdit', player)
}

function handleDelete(player: Player) {
  emit('onDelete', player)
}

const tdBaseClass = [
  'px-4',
  'py-2',
  'text-center',
  'whitespace-nowrap',
  'break-words',
]
</script>

<template>
  <div
    class="w-full overflow-x-auto rounded shadow-sm scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
  >
    <table
      id="players-table"
      class="w-max min-w-full text-sm text-left text-gray-400"
      data-table-init
    >
      <thead class="text-xs uppercase bg-gray-700 text-gray-400">
        <tr>
          <th
            v-for="(header, i) in headers"
            :key="i"
            scope="col"
            class="px-4 py-3 text-center whitespace-nowrap"
          >
            {{ header.text }}
          </th>
          <th scope="col" class="px-6 py-3 text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in paginatedItems"
          :key="index"
          class="border-b bg-gray-800 border-gray-700"
          v-if="!loading"
        >
          <td :class="tdBaseClass">
            {{ item.id }}
          </td>
          <td :class="tdBaseClass">
            {{ item.first_name }} {{ item.last_name }}
          </td>
          <td :class="tdBaseClass">
            {{ item.country }}
          </td>
          <td :class="tdBaseClass">
            {{ item.team.full_name }}
          </td>
          <td :class="tdBaseClass">
            {{ item.team.city }}
          </td>
          <td class="px-6 py-4 text-center">
            <div class="inline-flex items-center gap-2">
              <BaseButton variant="ghost" size="sm" @click="handleEdit(item)">
                <Pencil class="w-4 h-4" />
              </BaseButton>
              <BaseButton variant="ghost" size="sm" @click="handleDelete(item)">
                <Trash2 class="w-4 h-4 text-red-500" />
              </BaseButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <LoadingSpinner v-if="loading" />
    <div
      v-if="!loading && paginatedItems.length === 0"
      class="text-center text-gray-500 py-4"
    >
      Nenhum jogador encontrado.
    </div>
  </div>
  <Pagination
    :current-page="currentPage"
    :total-pages="totalPages"
    @update:page="(page) => (currentPage = page)"
  />
</template>
