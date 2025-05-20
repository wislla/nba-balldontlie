import { mount } from '@vue/test-utils'
import BaseButton from '@/components/BaseButton.vue'
import { Loader } from 'lucide-vue-next'

describe('BaseButton', () => {
  it('renderiza slot corretamente', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Clique aqui',
      },
    })
    expect(wrapper.text()).toContain('Clique aqui')
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('aplica variante correta (secondary)', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'secondary' },
      slots: { default: 'Secundário' },
    })
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-gray-200']))
  })

  it('aplica tamanho correto (lg)', () => {
    const wrapper = mount(BaseButton, {
      props: { size: 'lg' },
      slots: { default: 'Grande' },
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['px-5', 'py-3', 'text-lg'])
    )
  })

  it('aplica classes default se não passar props', () => {
    const wrapper = mount(BaseButton, { slots: { default: 'Default' } })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'bg-blue-950',
        'text-white',
        'px-4',
        'py-2',
        'text-base',
      ])
    )
  })

  it('mostra Loader se loading for true', () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
      slots: { default: 'Carregando' },
    })
    expect(wrapper.findComponent(Loader).exists()).toBe(true)
    expect(wrapper.text()).not.toContain('Carregando')
  })

  it('desabilita botão se loading ou disabled for true', () => {
    const wrapperLoading = mount(BaseButton, {
      props: { loading: true },
      slots: { default: 'Desabilitado' },
    })
    expect(wrapperLoading.find('button').attributes('disabled')).toBeDefined()

    const wrapperDisabled = mount(BaseButton, {
      props: { disabled: true },
      slots: { default: 'Desabilitado' },
    })
    expect(wrapperDisabled.find('button').attributes('disabled')).toBeDefined()
  })

  it('emite evento de click', async () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Clique' },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('não emite evento de click se disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
      slots: { default: 'Não clica' },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
