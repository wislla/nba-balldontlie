import { mount } from '@vue/test-utils'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
import BaseButton from '@/components/BaseButton.vue'

jest.mock('@/components/BaseModal.vue', () => ({
  __esModule: true,
  default: (_props: any, { slots }: any) => [
    slots.header?.(),
    slots.body?.(),
    slots.footer?.(),
  ],
}))

describe('ConfirmDeleteModal', () => {
  const player = {
    id: 1,
    first_name: 'LeBron',
    last_name: 'James',
    country: 'USA',
    team: { id: 23, city: 'LA', full_name: 'Los Angeles Lakers' },
  }

  it('renderiza modal e nome do jogador', () => {
    const wrapper = mount(ConfirmDeleteModal, {
      props: {
        isOpen: true,
        item: player,
        isSaving: false,
      },
    })
    expect(wrapper.text()).toContain('Confirmar Exclusão')
    expect(wrapper.text()).toContain('LeBron')
  })

  it('desabilita botões se isSaving for true', () => {
    const wrapper = mount(ConfirmDeleteModal, {
      props: {
        isOpen: true,
        item: player,
        isSaving: true,
      },
    })
    const buttons = wrapper.findAllComponents(BaseButton)
    expect(buttons.at(0)?.attributes('disabled')).toBeDefined()
    expect(buttons.at(1)?.attributes('disabled')).toBeDefined()
  })

  it('emite "close" ao clicar em Cancelar', async () => {
    const wrapper = mount(ConfirmDeleteModal, {
      props: {
        isOpen: true,
        item: player,
        isSaving: false,
      },
    })
    const cancelarButton = wrapper.findAllComponents(BaseButton).at(0)
    await cancelarButton?.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emite "confirm" ao clicar em Excluir', async () => {
    const wrapper = mount(ConfirmDeleteModal, {
      props: {
        isOpen: true,
        item: player,
        isSaving: false,
      },
    })
    const excluirButton = wrapper.findAllComponents(BaseButton).at(1)
    await excluirButton?.trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  it('passa loading para botão Excluir', () => {
    const wrapper = mount(ConfirmDeleteModal, {
      props: {
        isOpen: true,
        item: player,
        isSaving: true,
      },
    })
    const excluirButton = wrapper.findAllComponents(BaseButton).at(1)
    expect(excluirButton?.props('loading')).toBe(true)
  })

  it('não mostra nome se item for null', () => {
    const wrapper = mount(ConfirmDeleteModal, {
      props: {
        isOpen: true,
        item: null,
        isSaving: false,
      },
    })
    expect(wrapper.text()).toContain('Confirmar Exclusão')
  })
})
