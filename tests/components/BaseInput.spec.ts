import { mount } from '@vue/test-utils'
import BaseInput from '@/components/BaseInput.vue'

describe('BaseInput.vue', () => {
  it('renderiza o label corretamente', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'nome',
        label: 'Nome',
        modelValue: '',
      },
    })
    expect(wrapper.find('label').text()).toBe('Nome')
    expect(wrapper.find('input').attributes('id')).toBe('nome')
  })

  it('passa props para o input', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'sobrenome',
        label: 'Sobrenome',
        modelValue: 'Silva',
        type: 'text',
        autocomplete: 'family-name',
        required: true,
        disabled: true,
      },
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('Silva')
    expect(input.attributes('type')).toBe('text')
    expect(input.attributes('autocomplete')).toBe('family-name')
    expect(input.attributes('required')).toBeDefined()
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('emite update:modelValue ao digitar', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'country',
        label: 'País',
        modelValue: '',
      },
    })
    const input = wrapper.find('input')
    await input.setValue('Brasil')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('Brasil')
  })

  it('exibe mensagem de erro se informada', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'country',
        label: 'País',
        modelValue: '',
        error: 'Campo obrigatório',
      },
    })
    expect(wrapper.text()).toContain('Campo obrigatório')
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('aplica aria-required corretamente', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'first_name',
        label: 'Nome',
        modelValue: '',
        required: true,
      },
    })
    expect(wrapper.find('input').attributes('aria-required')).toBe('true')
  })
})
