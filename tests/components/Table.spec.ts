import { mount } from '@vue/test-utils'
import Table from '@/components/Table.vue'
import BaseButton from '@/components/BaseButton.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import Pagination from '@/components/Pagination.vue'

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Nome', value: 'first_name' },
  { text: 'País', value: 'country' },
  { text: 'Time', value: 'team.full_name' },
  { text: 'Cidade', value: 'team.city' },
]

const players = [
  {
    id: 1,
    first_name: 'LeBron',
    last_name: 'James',
    country: 'USA',
    team: {
      id: 23,
      full_name: 'Los Angeles Lakers',
      city: 'LA',
    },
  },
  {
    id: 2,
    first_name: 'Stephen',
    last_name: 'Curry',
    country: 'USA',
    team: {
      id: 30,
      full_name: 'Golden State Warriors',
      city: 'San Francisco',
    },
  },
]

function mountTable(overrides = {}) {
  return mount(Table, {
    props: {
      headers,
      items: players,
      loading: false,
      ...overrides,
    },
    global: {
      stubs: {
        teleport: true,
        LoadingSpinner: true,
        Pagination: true,
      },
    },
  })
}

describe('Table.vue', () => {
  it('renderiza os cabeçalhos corretamente', () => {
    const wrapper = mountTable()
    headers.forEach((h) => {
      expect(wrapper.html()).toContain(h.text)
    })
  })

  it('renderiza os jogadores', () => {
    const wrapper = mountTable()
    expect(wrapper.text()).toContain('LeBron James')
    expect(wrapper.text()).toContain('Stephen Curry')
    expect(wrapper.text()).toContain('USA')
    expect(wrapper.text()).toContain('Los Angeles Lakers')
    expect(wrapper.text()).toContain('Golden State Warriors')
  })

  it('renderiza os botões de ação', () => {
    const wrapper = mountTable()
    const buttons = wrapper.findAllComponents(BaseButton)
    expect(buttons.length).toBe(4)
  })

  it('emite onEdit ao clicar no botão de editar', async () => {
    const wrapper = mountTable()
    const editButton = wrapper.findAllComponents(BaseButton)[0]
    await editButton.trigger('click')
    expect(wrapper.emitted('onEdit')).toBeTruthy()
    expect(wrapper.emitted('onEdit')![0][0]).toMatchObject(players[0])
  })

  it('emite onDelete ao clicar no botão de deletar', async () => {
    const wrapper = mountTable()
    const deleteButton = wrapper.findAllComponents(BaseButton)[1]
    await deleteButton.trigger('click')
    expect(wrapper.emitted('onDelete')).toBeTruthy()
    expect(wrapper.emitted('onDelete')![0][0]).toMatchObject(players[0])
  })

  it('mostra LoadingSpinner se loading=true', () => {
    const wrapper = mountTable({ loading: true })
    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true)
  })

  it('mostra mensagem se não houver jogadores', () => {
    const wrapper = mountTable({ items: [], loading: false })
    expect(wrapper.text()).toContain('Nenhum jogador encontrado')
  })

  it('mostra tabela se loading for false', () => {
    const wrapper = mountTable({ loading: false })
    expect(wrapper.find('table').exists()).toBe(true)
  })

  it('não mostra linhas da tabela se loading for true', () => {
    const wrapper = mountTable({ loading: true })
    expect(wrapper.find('tbody').text()).toBe('')
  })

  it('renderiza componente Pagination', () => {
    const wrapper = mountTable()
    expect(wrapper.findComponent(Pagination).exists()).toBe(true)
  })
})
