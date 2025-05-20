import { usePlayers } from '@/composables/usePlayers'
import * as playersService from '@/services/players'
import { flushPromises } from '@vue/test-utils'

jest.mock('@vueuse/core', () => ({
  debouncedWatch: (_src: any, cb: any, opts: any) => opts.immediate && cb(),
}))

describe('usePlayers', () => {
  let jogadorAntes: any
  let jogadorEditado: any
  let mockPlayers: any

  beforeEach(() => {
    jogadorAntes = {
      id: 1,
      first_name: 'LeBron',
      last_name: 'James',
      country: 'USA',
      team: { id: 23, city: 'LA', full_name: 'Los Angeles Lakers' },
    }
    jogadorEditado = { ...jogadorAntes, first_name: 'King' }
    mockPlayers = [jogadorAntes]
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('faz fetch inicial', async () => {
    jest.spyOn(playersService, 'getPlayers').mockResolvedValue({
      data: mockPlayers,
      meta: { next_cursor: 1, per_page: 100 },
    })
    const { players } = usePlayers()
    await flushPromises()
    expect(players.value).toEqual(mockPlayers)
  })

  it('altera página com setPage', async () => {
    jest.spyOn(playersService, 'getPlayers').mockResolvedValue({
      data: [],
      meta: { next_cursor: 1, per_page: 100 },
    })
    const { page, setPage } = usePlayers()
    setPage(5)
    expect(page.value).toBe(5)
  })

  it('altera perPage com setPerPage', async () => {
    jest.spyOn(playersService, 'getPlayers').mockResolvedValue({
      data: [],
      meta: { next_cursor: 1, per_page: 100 },
    })
    const { perPage, setPerPage } = usePlayers()
    setPerPage(50)
    expect(perPage.value).toBe(50)
  })

  it('altera search com setSearch e reseta page', async () => {
    jest.spyOn(playersService, 'getPlayers').mockResolvedValue({
      data: [],
      meta: { next_cursor: 1, per_page: 100 },
    })
    const { search, page, setSearch } = usePlayers()
    setSearch('curry')
    expect(search.value).toBe('curry')
    expect(page.value).toBe(1)
  })

  it('trata erro ao buscar jogadores', async () => {
    jest
      .spyOn(playersService, 'getPlayers')
      .mockRejectedValue(new Error('Falhou!'))
    const { error } = usePlayers()
    await flushPromises()
    expect(error.value).toBe('Falhou!')
  })

  it('edita um jogador', async () => {
    jest.spyOn(playersService, 'getPlayers').mockResolvedValue({
      data: [jogadorAntes],
      meta: { next_cursor: 1, per_page: 100 },
    })
    jest
      .spyOn(playersService, 'fakeEditPlayer')
      .mockResolvedValue(jogadorEditado)
    const { players, editPlayer, isProcessing } = usePlayers()
    await flushPromises()
    await editPlayer(jogadorEditado)
    expect(players.value[0].first_name).toBe('King')
    expect(isProcessing.value).toBe(false)
  })

  it('trata erro ao editar jogador', async () => {
    jest.spyOn(playersService, 'getPlayers').mockResolvedValue({
      data: [jogadorAntes],
      meta: { next_cursor: 1, per_page: 100 },
    })
    jest
      .spyOn(playersService, 'fakeEditPlayer')
      .mockRejectedValue(new Error('Erro edição'))
    const { editPlayer, error } = usePlayers()
    await flushPromises()
    await editPlayer(jogadorAntes)
    expect(error.value).toBe('Erro edição')
  })

  it('deleta um jogador', async () => {
    jest.spyOn(playersService, 'getPlayers').mockResolvedValue({
      data: [jogadorAntes],
      meta: { next_cursor: 1, per_page: 100 },
    })
    jest.spyOn(playersService, 'fakeDeletePlayer').mockResolvedValue(undefined)
    const { players, deletePlayer, isProcessing } = usePlayers()
    await flushPromises()
    await deletePlayer(jogadorAntes)
    expect(players.value).toEqual([])
    expect(isProcessing.value).toBe(false)
  })

  it('trata erro ao deletar jogador', async () => {
    jest.spyOn(playersService, 'getPlayers').mockResolvedValue({
      data: [jogadorAntes],
      meta: { next_cursor: 1, per_page: 100 },
    })
    jest
      .spyOn(playersService, 'fakeDeletePlayer')
      .mockRejectedValue(new Error('Erro exclusão'))
    const { deletePlayer, error } = usePlayers()
    await flushPromises()
    await deletePlayer(jogadorAntes)
    expect(error.value).toBe('Erro exclusão')
  })
})
