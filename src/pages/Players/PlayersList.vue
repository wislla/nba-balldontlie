<script setup lang="ts">
import Table from '../../components/Table.vue'
import { computed, ref } from 'vue'
import { usePlayers } from '../../composables/usePlayers'
import { useSort } from '../../composables/useSort'
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.vue'
import EditPlayerModal from '@/components/EditPlayerModal.vue'
import { PLAYER_TABLE_HEADERS } from '@/constants/playerTable'
import type { Player } from '@/interfaces/Player'
import ErrorAlert from '@/components/ErrorAlert.vue'
import OrderToggleButton from '@/components/OrderToggleButton.vue'
import type { TableHeader } from '@/interfaces/Table'

const {
  players,
  loading,
  error,
  search,
  setSearch,
  editPlayer,
  deletePlayer,
  isProcessing,
} = usePlayers({ initialSearch: '', initialPerPage: 100 })

const orderBy = ref<'first_name' | 'last_name'>('first_name')
const orderDirection = ref<'asc' | 'desc'>('asc')

const isDeleteModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedItem = ref<Player | null>(null)

const headers: TableHeader[] = PLAYER_TABLE_HEADERS
const items = computed<Player[]>(() => players.value)

const searchTerm = computed({
  get: () => search.value,
  set: (val) => setSearch(val.trim()),
})

const sortedItems = useSort(items, orderBy, orderDirection)

function handleEdit(player: Player) {
  selectedItem.value = player
  isEditModalOpen.value = true
}
function handleDelete(player: Player) {
  selectedItem.value = player
  isDeleteModalOpen.value = true
}

function closeModals() {
  isDeleteModalOpen.value = false
  isEditModalOpen.value = false
  selectedItem.value = null
}

async function confirmDelete() {
  if (!selectedItem.value) return
  await deletePlayer(selectedItem.value)
  closeModals()
}

async function saveEdit(updatedPlayer: Player) {
  await editPlayer(updatedPlayer)
  isEditModalOpen.value = false
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-row items-center gap-2">
      <input
        v-model="searchTerm"
        placeholder="Buscar jogador…"
        class="flex-grow px-3 py-2 text-sm border border-sky-950 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
      />

      <OrderToggleButton v-model="orderDirection" />
    </div>

    <div class="overflow-x-auto rounded shadow-sm bg-white">
      <Table
        :headers="headers"
        :items="sortedItems"
        :loading="loading"
        @on-edit="handleEdit"
        @on-delete="handleDelete"
      />
    </div>

    <ErrorAlert
      v-if="error"
      :message="`Erro ao carregar jogadores: ${error}`"
    />

    <ConfirmDeleteModal
      :is-open="isDeleteModalOpen"
      :item="selectedItem"
      @close="closeModals"
      @confirm="confirmDelete"
      :isSaving="isProcessing"
    />

    <EditPlayerModal
      :is-open="isEditModalOpen"
      :player="selectedItem"
      @close="closeModals"
      @save="saveEdit"
      :isSaving="isProcessing"
    />
  </div>
</template>
