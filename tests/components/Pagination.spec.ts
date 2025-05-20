import { mount } from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'

describe('Pagination.vue', () => {
  const mountPagination = (props = {}) => {
    return mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 3,
        ...props,
      },
      global: {
        stubs: {
          BaseButton: true,
          ChevronLeft: true,
          ChevronRight: true,
        },
      },
    })
  }

  it('renderiza paginação quando totalPages > 1', () => {
    const wrapper = mountPagination()
    expect(wrapper.text()).toContain('Página 1 de 3')
  })

  it('não renderiza se totalPages <= 1', () => {
    const wrapper = mountPagination({ totalPages: 1 })
    expect(wrapper.find('div.flex').exists()).toBe(false)
  })

  it('botão anterior está desabilitado na primeira página', () => {
    const wrapper = mountPagination({ currentPage: 1 })
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' })
    expect(buttons[0].props('disabled')).toBe(true)
  })

  it('botão próximo está desabilitado na última página', () => {
    const wrapper = mountPagination({ currentPage: 3 })
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' })
    expect(buttons[1].props('disabled')).toBe(true)
  })

  it('emite "update:page" ao clicar em anterior/próximo', async () => {
    const wrapper = mountPagination({ currentPage: 2 })
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' })
    await buttons[0].trigger('click')
    expect(wrapper.emitted('update:page')).toBeTruthy()
    expect(wrapper.emitted('update:page')![0]).toEqual([1])
    await buttons[1].trigger('click')
    expect(wrapper.emitted('update:page')![1]).toEqual([3])
  })

  it('não emite se clicar no anterior quando já está na primeira página', async () => {
    const wrapper = mountPagination({ currentPage: 1 })
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' })
    await buttons[0].trigger('click')
    expect(wrapper.emitted('update:page')).toBeFalsy()
  })

  it('não emite se clicar no próximo quando já está na última página', async () => {
    const wrapper = mountPagination({ currentPage: 3, totalPages: 3 })
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' })
    await buttons[1].trigger('click')
    expect(wrapper.emitted('update:page')).toBeFalsy()
  })
})
