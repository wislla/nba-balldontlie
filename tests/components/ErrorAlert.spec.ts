import { mount } from '@vue/test-utils'
import ErrorAlert from '@/components/ErrorAlert.vue'

describe('ErrorAlert.vue', () => {
  it('exibe a mensagem de erro quando message é fornecida', () => {
    const wrapper = mount(ErrorAlert, {
      props: { message: 'Algo deu errado' },
    })

    expect(wrapper.text()).toContain('Erro: Algo deu errado')
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('não renderiza o alerta quando message está vazia', () => {
    const wrapper = mount(ErrorAlert, {
      props: { message: '' },
    })

    expect(wrapper.find('div').exists()).toBe(false)
  })
})
