import { mount } from '@vue/test-utils'
import EditPlayerModal from '@/components/EditPlayerModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import { nextTick } from 'vue'

jest.mock('@/components/BaseModal.vue', () => ({
  __esModule: true,
  default: (_props: any, { slots }: any) => [
    slots.header?.(),
    slots.body?.(),
    slots.footer?.(),
  ],
}))

const playerMock = {
  id: 1,
  first_name: 'Alex',
  last_name: 'Johnson',
  country: 'USA',
  team: {
    id: 10,
    full_name: 'Lakers',
    city: 'LA',
  },
}

function mountModal(overrides = {}) {
  return mount(EditPlayerModal, {
    props: {
      isOpen: true,
      isSaving: false,
      player: playerMock,
      ...overrides,
    },
    global: {
      stubs: {
        teleport: true,
      },
    },
  })
}

describe('EditPlayerModal.vue', () => {
  it('renderiza os campos com os valores do jogador', async () => {
    const wrapper = mountModal()
    await nextTick()
    const baseInputs = wrapper.findAllComponents(BaseInput)
    expect(baseInputs[0].find('input').element.value).toBe('Alex')
    expect(baseInputs[1].find('input').element.value).toBe('Johnson')
    expect(baseInputs[2].find('input').element.value).toBe('USA')
    expect(baseInputs[3].find('input').element.value).toBe('Lakers')
    expect(baseInputs[4].find('input').element.value).toBe('LA')
  })

  it('emite evento "save" com os dados atualizados ao clicar em Salvar', async () => {
    const wrapper = mountModal()
    await nextTick()
    const baseInputs = wrapper.findAllComponents(BaseInput)
    await baseInputs[0].find('input').setValue('Alexandre')
    await baseInputs[2].find('input').setValue('Brasil')
    await wrapper.findAllComponents(BaseButton).at(1)!.trigger('click')
    expect(wrapper.emitted('save')).toBeTruthy()
    expect(wrapper.emitted('save')![0][0]).toMatchObject({
      id: 1,
      first_name: 'Alexandre',
      last_name: 'Johnson',
      country: 'Brasil',
      team: {
        id: 10,
        full_name: 'Lakers',
        city: 'LA',
      },
    })
  })

  it('emite evento "close" ao clicar em Cancelar', async () => {
    const wrapper = mountModal()
    await nextTick()
    await wrapper.findAllComponents(BaseButton).at(0)!.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('desativa os botões quando isSaving=true', async () => {
    const wrapper = mountModal({ isSaving: true })
    await nextTick()
    const buttons = wrapper.findAllComponents(BaseButton)
    expect(buttons[0].attributes('disabled')).toBeDefined()
    expect(buttons[1].attributes('disabled')).toBeDefined()
    expect(buttons[1].props('loading')).toBe(true)
  })

  it('não altera o form quando player é null', async () => {
    const wrapper = mountModal({ player: null })
    await nextTick()
    const baseInputs = wrapper.findAllComponents(BaseInput)
    baseInputs.forEach((input) => {
      expect(input.find('input').element.value).toBe('')
    })
  })

  it('atualiza o form se o player for alterado após montado', async () => {
    const wrapper = mountModal({ player: null })
    await nextTick()
    await wrapper.setProps({ player: playerMock })
    await nextTick()
    const baseInputs = wrapper.findAllComponents(BaseInput)
    expect(baseInputs[0].find('input').element.value).toBe('Alex')
    expect(baseInputs[3].find('input').element.value).toBe('Lakers')
  })

  it('emite evento "save" corretamente mesmo com form vazio (edge case)', async () => {
    const wrapper = mountModal({ player: null })
    await nextTick()
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted('save')).toBeTruthy()
    expect(wrapper.emitted('save')![0][0]).toMatchObject({
      id: 0,
      first_name: '',
      last_name: '',
      country: '',
      team: {
        id: 0,
        full_name: '',
        city: '',
      },
    })
  })

  it('emite evento "save" ao clicar em Salvar', async () => {
    const wrapper = mountModal()
    await nextTick()
    await wrapper.findAllComponents(BaseButton).at(1)!.trigger('click')
    expect(wrapper.emitted('save')).toBeTruthy()
  })
})
