import { mount } from '@vue/test-utils'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { Loader } from 'lucide-vue-next'

describe('LoadingSpinner.vue', () => {
  it('renderiza o loader e o texto', () => {
    const wrapper = mount(LoadingSpinner)
    expect(wrapper.findComponent(Loader).exists()).toBe(true)
    expect(wrapper.text()).toContain('Carregando...')
  })

  it('possui classes utilitárias do Tailwind', () => {
    const wrapper = mount(LoadingSpinner)
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('justify-center')
    expect(wrapper.classes()).toContain('items-center')
  })

  it('Loader tem as classes de tamanho e animação', () => {
    const wrapper = mount(LoadingSpinner)
    const loader = wrapper.findComponent(Loader)
    expect(loader.exists()).toBe(true)
    expect(loader.classes()).toContain('w-4')
    expect(loader.classes()).toContain('h-4')
    expect(loader.classes()).toContain('animate-spin')
  })
})
