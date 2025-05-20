import { mount } from '@vue/test-utils'
import PlayersList from '@/pages/Players/PlayersList.vue'
import { usePlayers } from '@/composables/usePlayers'
import type { Player } from '@/interfaces/Player'

jest.mock('@/composables/usePlayers', () => ({
  usePlayers: jest.fn(),
}))

const playerMock: Player = {
  id: 1,
  first_name: 'LeBron',
  last_name: 'James',
  country: 'USA',
  team: {
    id: 1,
    full_name: 'Lakers',
    city: 'Los Angeles',
  },
}

describe('PlayersList.vue', () => {
  beforeEach(() => {
    ;(usePlayers as jest.Mock).mockReturnValue({
      players: { value: [playerMock] },
      loading: { value: false },
      error: { value: null },
      search: { value: '' },
      setSearch: jest.fn(),
      editPlayer: jest.fn(),
      deletePlayer: jest.fn(),
      isProcessing: { value: false },
    })
  })

  it('abre modal de edição ao clicar em editar', async () => {
    const wrapper = mount(PlayersList)

    await wrapper
      .findComponent({ name: 'Table' })
      .vm.$emit('on-edit', playerMock)

    expect(
      wrapper.findComponent({ name: 'EditPlayerModal' }).props('isOpen')
    ).toBe(true)
    expect(
      wrapper.findComponent({ name: 'EditPlayerModal' }).props('player')
    ).toEqual(playerMock)
  })

  it('abre modal de exclusão ao clicar em excluir', async () => {
    const wrapper = mount(PlayersList)

    await wrapper
      .findComponent({ name: 'Table' })
      .vm.$emit('on-delete', playerMock)

    expect(
      wrapper.findComponent({ name: 'ConfirmDeleteModal' }).props('isOpen')
    ).toBe(true)
    expect(
      wrapper.findComponent({ name: 'ConfirmDeleteModal' }).props('item')
    ).toEqual(playerMock)
  })

  it('fecha modais ao emitir close', async () => {
    const wrapper = mount(PlayersList)

    await wrapper
      .findComponent({ name: 'Table' })
      .vm.$emit('on-delete', playerMock)
    await wrapper
      .findComponent({ name: 'Table' })
      .vm.$emit('on-edit', playerMock)

    await wrapper.findComponent({ name: 'EditPlayerModal' }).vm.$emit('close')
    await wrapper
      .findComponent({ name: 'ConfirmDeleteModal' })
      .vm.$emit('close')

    expect(
      wrapper.findComponent({ name: 'EditPlayerModal' }).props('isOpen')
    ).toBe(false)
    expect(
      wrapper.findComponent({ name: 'ConfirmDeleteModal' }).props('isOpen')
    ).toBe(false)
  })

  it('executa deletePlayer ao confirmar exclusão', async () => {
    const deletePlayerMock = jest.fn().mockResolvedValue(undefined)
    ;(usePlayers as jest.Mock).mockReturnValue({
      players: { value: [playerMock] },
      loading: { value: false },
      error: { value: null },
      search: { value: '' },
      setSearch: jest.fn(),
      editPlayer: jest.fn(),
      deletePlayer: deletePlayerMock,
      isProcessing: { value: false },
    })

    const wrapper = mount(PlayersList)

    await wrapper
      .findComponent({ name: 'Table' })
      .vm.$emit('on-delete', playerMock)

    await wrapper
      .findComponent({ name: 'ConfirmDeleteModal' })
      .vm.$emit('confirm')

    expect(deletePlayerMock).toHaveBeenCalledWith(playerMock)
  })

  it('executa editPlayer ao salvar edição', async () => {
    const editPlayerMock = jest.fn().mockResolvedValue(undefined)
    ;(usePlayers as jest.Mock).mockReturnValue({
      players: { value: [playerMock] },
      loading: { value: false },
      error: { value: null },
      search: { value: '' },
      setSearch: jest.fn(),
      editPlayer: editPlayerMock,
      deletePlayer: jest.fn(),
      isProcessing: { value: false },
    })

    const wrapper = mount(PlayersList)

    await wrapper
      .findComponent({ name: 'Table' })
      .vm.$emit('on-edit', playerMock)

    const updatedPlayer = { ...playerMock, first_name: 'UpdatedName' }
    await wrapper
      .findComponent({ name: 'EditPlayerModal' })
      .vm.$emit('save', updatedPlayer)

    expect(editPlayerMock).toHaveBeenCalledWith(updatedPlayer)
  })
})
