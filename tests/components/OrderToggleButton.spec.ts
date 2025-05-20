import { mount } from '@vue/test-utils'
import OrderToggleButton from '@/components/OrderToggleButton.vue'
import { ArrowDownAZ, ArrowUpZA } from 'lucide-vue-next'

describe('OrderToggleButton.vue', () => {
  it('renderiza o botão e o texto', () => {
    const wrapper = mount(OrderToggleButton, {
      props: { modelValue: 'asc' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toContain('Ordenar')
  })

  it('mostra ícone de ordem ascendente quando modelValue="asc"', () => {
    const wrapper = mount(OrderToggleButton, {
      props: { modelValue: 'asc' },
    })
    expect(wrapper.findComponent(ArrowDownAZ).exists()).toBe(true)
    expect(wrapper.findComponent(ArrowUpZA).exists()).toBe(false)
  })

  it('mostra ícone de ordem descendente quando modelValue="desc"', () => {
    const wrapper = mount(OrderToggleButton, {
      props: { modelValue: 'desc' },
    })
    expect(wrapper.findComponent(ArrowUpZA).exists()).toBe(true)
    expect(wrapper.findComponent(ArrowDownAZ).exists()).toBe(false)
  })

  it('emite update:modelValue para "desc" ao clicar (quando está "asc")', async () => {
    const wrapper = mount(OrderToggleButton, {
      props: { modelValue: 'asc' },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('desc')
  })

  it('emite update:modelValue para "asc" ao clicar (quando está "desc")', async () => {
    const wrapper = mount(OrderToggleButton, {
      props: { modelValue: 'desc' },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('asc')
  })
})
