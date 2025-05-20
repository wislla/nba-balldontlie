import { ref } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import type {
  Player,
  PlayersResponse,
  UsePlayersParams,
} from '../interfaces/Player'
import {
  fakeDeletePlayer,
  fakeEditPlayer,
  getPlayers,
} from '../services/players'

export function usePlayers(params?: UsePlayersParams) {
  const players = ref<Player[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const page = ref(1)
  const perPage = ref(params?.initialPerPage ?? 100)
  const search = ref(params?.initialSearch ?? '')

  const isProcessing = ref(false)

  async function fetchPlayers() {
    loading.value = true
    error.value = null
    try {
      const res: PlayersResponse = await getPlayers({
        page: page.value,
        per_page: perPage.value,
        search: search.value || undefined,
      })
      players.value = res.data
    } catch (err: any) {
      error.value = err?.message || 'Erro desconhecido'
    } finally {
      loading.value = false
    }
  }

  debouncedWatch([search, page, perPage], fetchPlayers, {
    debounce: 400,
    immediate: true,
  })

  async function editPlayer(player: Player) {
    isProcessing.value = true
    try {
      const updated = await fakeEditPlayer(player)
      players.value = players.value.map((p) =>
        p.id === updated.id ? updated : p
      )
    } catch (err: any) {
      error.value = err.message || 'Falha ao editar jogador'
    } finally {
      isProcessing.value = false
    }
  }

  async function deletePlayer(player: Player) {
    isProcessing.value = true
    try {
      await fakeDeletePlayer(player.id)
      players.value = players.value.filter((p) => p.id !== player.id)
    } catch (err: any) {
      error.value = err.message || 'Falha ao excluir jogador'
    } finally {
      isProcessing.value = false
    }
  }

  return {
    players,
    loading,
    error,
    page,
    perPage,
    search,
    isProcessing,
    setPage: (p: number) => {
      page.value = p
    },
    setPerPage: (n: number) => {
      perPage.value = n
    },
    setSearch: (term: string) => {
      page.value = 1
      search.value = term
    },
    editPlayer,
    deletePlayer,
  }
}
